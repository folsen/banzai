import java.io.*;
import java.net.*;
import java.net.URL;
import java.sql.*;
import org.json.*;

/*
 * This class functions as a server monitoring the location of each player in 
 * the game. Every X seconds, new coordinates are saved into the database.
 * 
 * TODO: store dates for each locations saved.
 * 
 * @author Emanuel Ferm emanuel@eferm.com
 */

public class Location {
	// Database stuff
	private final static String DB_URL = "jdbc:mysql://localhost:3306/banzai_production";
	private final static String DB_USER = "root";
	private final static String DB_PASS = "";
	
	// API stuff
	private final static String APPLICATION_ID = "Banzai3";
	private final static String API_KEY = "NmisMAlwJWM09jktLs9LkgriQxB6Gso1BoVSv6D6";
	private final static String URL_LOCATION = "http://mwl.labs.ericsson.net/mwlservice/resource/location/getLocationByMsisdn";
	
	// refresh interval
	private final static int INTERVAL = 30;
	
	public static void main(String args[]) {
		try {
			while (true) {
				Statement selectUsers;
			
				//Register the JDBC driver for MySQL.
				Class.forName("com.mysql.jdbc.Driver");
			
				// Get a connection to the database for a user named root with a
				// blank password. This user is the default administrator having
				// full privileges to do anything.
				Connection db_con = DriverManager.getConnection(DB_URL,DB_USER,DB_PASS);
			
				// Display URL and connection information 
				selectUsers = db_con.createStatement();
				
				try {
					ResultSet users = selectUsers.executeQuery("select * from users where consent_status = 1;");

					while (users.next()) {
						String phonenumber = users.getString("phonenumber");
						int user_id = users.getInt("id");

						// use URLEncoder.encode("","UTF-8")
						String params = "applicationID=" + URLEncoder.encode(APPLICATION_ID,"UTF-8") +
										"&devKey=" + URLEncoder.encode(API_KEY,"UTF-8") +
										"&msisdn=" + URLEncoder.encode(phonenumber,"UTF-8");

						// send...
						URL url = new URL(URL_LOCATION);
						URLConnection conn = url.openConnection();
						conn.setDoInput(true);
						conn.setDoOutput(true);
						conn.setUseCaches (false);
						conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
						OutputStreamWriter wr = new OutputStreamWriter(conn.getOutputStream());
						wr.write(params);
						wr.flush();

						// ...and response
						BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
						String line;
						while ((line = rd.readLine()) != null) {
							try {
								JSONObject json = new JSONObject(line);
								Statement insertLocation = db_con.createStatement();
								// store in database
								int locations = insertLocation.executeUpdate(
										"insert into locations (longitude, latitude, user_id) values (" + "\"" + json.getString("longitude") +  "\"" + 
										"," + "\"" + json.getString("latitude") + "\"" + "," + user_id + ");");
								System.out.println(phonenumber + ": " + json.getString("latitude") + " " + json.getString("longitude"));
							} catch (JSONException e) {
								System.out.println("User has not yet responded to sms.");
							}
						}
						wr.close();
						rd.close();
					} // while (users.next())
					db_con.close();
					Thread.currentThread().sleep(INTERVAL * 1000);
				} catch (SQLException e) {
					// do nothing, probably no users in db
				}
			} // while (true)
		} catch (Exception e) {
			e.printStackTrace();
		}//end catch
	}//end main
}//end class Banzai