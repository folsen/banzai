import java.io.*;
import java.net.*;
import java.net.URL;
import java.sql.*;

/*
 * This class functions as a server that monitors for games' start times. When 
 * a game starts, all registered users are sent a message for consent 
 * (if this hasn't been done previously).
 * 
 * The server implements the Ericsson Labs Web Location API for sending consent 
 * to track users, and the SMS Send & Receive API for sending SMS to the chosen 
 * one.
 * 
 * TODO: implement checking status of consent
 * 		 add logic for future dates for when consent ends
 * 
 * @author Emanuel Ferm emanuel@eferm.com
 */

public class Consent {
	// Database stuff
	private final static String DB_URL = "jdbc:mysql://localhost:3306/banzai_production";
	private final static String DB_USER = "root";
	private final static String DB_PASS = "";
	
	// API stuff
	private final static String APPLICATION_ID = "Banzai3";
	private final static String LOCATION_API_KEY = "NmisMAlwJWM09jktLs9LkgriQxB6Gso1BoVSv6D6";
	private final static String SEND_REC_API_KEY = "R2tn7vDNAg5l9KUnf0ImTp3bUj0rir3FFk9fOISR";
	private final static String URL_SEND_REC = "http://sms.labs.ericsson.net/send";
	private final static String URL_CONSENT = "http://mwl.labs.ericsson.net/mwlservice/resource/consent/create";
	
	// refresh interval
	private final static int INTERVAL = 10;
	private final static String FUTUREDATE = "2009-11-30T11:00"; // just for laziness...
	
	public static void main(String args[]) {
		try {
			while (true) {
				Statement selectGames;
			
				//Register the JDBC driver for MySQL.
				Class.forName("com.mysql.jdbc.Driver");
			
				// Get a connection to the database for a user named root with a
				// blank password. This user is the default administrator having
				// full privileges to do anything.
				Connection db_con = DriverManager.getConnection(DB_URL,DB_USER,DB_PASS);
			
				// Display URL and connection information 
				selectGames = db_con.createStatement();
				
				try {
					ResultSet games = selectGames.executeQuery("select * from games where starts_at < NOW() AND has_started = 0;");
					
					// if a game is found that is to be started
					while (games.next()) {
						System.out.println("Found new game.");
						int game_id = games.getInt("id");
						// set started = 1
						Statement setStarted = db_con.createStatement();
						int started = setStarted.executeUpdate("update games set has_started = 1 where id = " + game_id + ";");
						
						// count players to roll for the chosen one
						Statement countPlayers = db_con.createStatement();
						ResultSet amountPlayers = countPlayers.executeQuery(
								"select count(*) AS id from registrations join users on registrations.user_id = users.id where game_id = " + game_id + ";");
						
						amountPlayers.next();
						int the_chosen = (int) (amountPlayers.getInt("id") * Math.random());
						
						// get registered players
						Statement getPlayers = db_con.createStatement();
						// only includes players who have not sent their consent
						ResultSet players = getPlayers.executeQuery(
								"select users.id AS id, users.phonenumber as phonenumber, users.consent_status as consent_status from registrations join users on registrations.user_id = users.id where game_id = " + game_id + ";");
						
						// process players registered to game
						for (int i = 0; players.next(); i++) {
							String phonenumber = players.getString("phonenumber");
							int user_id = players.getInt("id");
							
							// send consent
							if (players.getInt("consent_status") == 0) {
								System.out.println("There are players.");
								String params = "applicationID=" + URLEncoder.encode(APPLICATION_ID,"UTF-8") +
												"&devKey=" + URLEncoder.encode(LOCATION_API_KEY,"UTF-8") +
												"&msisdn=" + URLEncoder.encode(phonenumber,"UTF-8") +
												"&endDate=" + URLEncoder.encode(FUTUREDATE,"UTF-8");
								
								// send...
								URL url = new URL(URL_CONSENT);
								URLConnection conn = url.openConnection();
								conn.setDoInput(true);
								conn.setDoOutput(true);
								conn.setUseCaches (false);
								conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
								OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
								wr.write(params);
								wr.flush();
								
								// update flag in database
								Statement setConsentSent = db_con.createStatement();
								int res = setConsentSent.executeUpdate("update users set consent_status = 1 where id = " + user_id + ";");
								
								// ...and response
								BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
								String line;
								while ((line = rd.readLine()) != null) {
									System.out.println("Consent sent to: " + phonenumber + ": " + line);
								}
								wr.close();
								rd.close();
							}
							
							// send sms to the chosen one
							if (i == the_chosen) {
								String param2 = "key=" + URLEncoder.encode(SEND_REC_API_KEY,"UTF-8") +
												"&to=" + URLEncoder.encode(phonenumber,"UTF-8") +
												"&message=" + URLEncoder.encode("You are the chosen one.","UTF-8");

								// send...
								URL url2 = new URL(URL_SEND_REC);
								URLConnection conn2 = url2.openConnection();
								conn2.setDoInput(true);
								conn2.setDoOutput(true);
								conn2.setUseCaches (false);
								conn2.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
								OutputStreamWriter wr2 = new OutputStreamWriter(conn2.getOutputStream());
								wr2.write(param2);
								wr2.flush();

								// ...and response
								BufferedReader rd2 = new BufferedReader(new InputStreamReader(conn2.getInputStream()));
								String line2;
								while ((line2 = rd2.readLine()) != null) {
									System.out.println("The chosen one is: " + phonenumber + ": " + line2);
								}
								wr2.close();
								rd2.close();

								Statement setChosen = db_con.createStatement();
								int res = setChosen.executeUpdate("update users set chosen = 1 where id = " + user_id + ";");
							}
						}
					}
					db_con.close();
					Thread.currentThread().sleep(INTERVAL * 1000);
				} catch (SQLException e) {
					// probably no games table in database
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}//end catch
	}//end main
}//end class Banzai