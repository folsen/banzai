ravegeo={internal:{},io:{}};
ravegeo.internal.Environment=(function(){
var _1={};
_1.isIE=(!window.opera&&navigator.userAgent.indexOf("MSIE")!=-1);
_1.isSafari=(navigator.vendor&&navigator.vendor.indexOf("Apple")!=-1);
_1.isFirefox=(navigator.userAgent.indexOf("Firefox")!=-1);
_1.isLinux=(navigator.userAgent.indexOf("Linux")!=-1);
_1.isWin=(navigator.userAgent.indexOf("Win")!=-1);
_1.isMac=(navigator.userAgent.indexOf("Mac")!=-1);
_1.isJavaEnabled=function(){
if(navigator.userAgent.toLowerCase().match("netscape")){
return true;
}else{
return navigator.javaEnabled();
}
};
_1.isJavaWellSupported=function(){
if(_1.isJavaEnabled()){
if(_1.isMac&&_1.isFirefox){
return false;
}
return true;
}
return false;
};
return _1;
})();
ravegeo.io.Ajax=(function(){
var _2={};
var _3=0;
var _4=[];
_2.syncJsonRequest=function(_5){
var _6;
if(window.XMLHttpRequest){
_6=new XMLHttpRequest();
}else{
if(window.ActiveXObject){
_6=new ActiveXObject("Microsoft.XMLHTTP");
}else{
throw new Error("Browser not AJAX enabled.");
}
}
_6.open("GET",_5,false);
_6.send(null);
if(_6.status==200){
return eval("("+_6.responseText+")");
}else{
throw new Error("AJAX request failed: "+_6.status);
}
};
_2.asyncJsonRequest=function(_7,_8,_9){
var _a=_3++;
var _b=document.createElement("script");
_b.src=_7+"&prepend=ravegeo.io.Ajax._jsonReply("+_a+","+"&append=);";
_4[_a]={callback:_8,elem:_b};
document.body.appendChild(_b);
if(typeof (_9)!="undefined"){
setTimeout(function(){
if(_4[_a]!=null){
ravegeo.io.Ajax._jsonReply(_a,{error:{code:"REQUEST_TIMED_OUT",message:"Request timed out: "+_7}});
}
},_9);
}
};
_2._jsonReply=function(_c,_d){
var _e=_4[_c].elem;
document.body.removeChild(_e);
_4[_c].callback(_d);
_4[_c]=null;
};
return _2;
})();
ravegeo.internal.Utilities=(function(){
var _f={};
_f.addEvent=function(obj,_11,fn,_13){
if(obj.addEventListener){
obj.addEventListener(_11,fn,_13);
}else{
if(obj.attachEvent){
obj.attachEvent("on"+_11,fn);
}else{
obj["on"+_11]=fn;
}
}
};
_f.stopEvent=function(e){
if(e&&e.stopPropagation&&e.preventDefault){
e.stopPropagation();
e.preventDefault();
}else{
if(window.event){
window.event.cancelBubble=true;
window.event.returnValue=false;
}
}
};
_f.getTarget=function(e){
var _16;
if(!e){
e=window.event;
}
if(e.target){
_16=e.target;
}else{
if(e.srcElement){
_16=e.srcElement;
}
}
return _16;
};
_f.leftButton=function(e){
if(!e){
e=window.event;
}
if(e.which){
return (e.which==1);
}else{
if(e.button){
return (e.button==0||e.button==1);
}
}
};
_f.setStyle=function(_18,_19){
if(typeof (_18.style.cssText)!="undefined"){
_18.style.cssText=_19;
}else{
_18.setAttribute("style",_19);
}
};
ravegeo.internal.Environment.isIE=(!window.opera&&navigator.userAgent.indexOf("MSIE")!=-1);
ravegeo.internal.Environment.isSafari=(navigator.vendor&&navigator.vendor.indexOf("Apple")!=-1);
_f.isImageLoaded=function(_1a){
if(typeof (_1a.complete)=="undefined"){
var _1b=new Image();
_1b.src=_1a.src;
return _1b.complete;
}
return _1a.complete;
};
if(_f.isSafari){
_f.onImageLoaded=function(_1c,_1d){
_1c.onload=function(){
_1d.apply(_1c);
};
};
}else{
_f.onImageLoaded=function(_1e,_1f){
_1e.onload=_1f;
};
}
_f.mouseX=function(e){
var _21=0;
if(e.pageX){
_21=e.pageX;
}else{
if(e.clientX){
_21=e.clientX;
if(ravegeo.internal.Environment.isIE){
if(document.documentElement&&document.documentElement.scrollLeft){
_21+=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_21+=document.body.scrollLeft;
}
}
}
}
}
return _21;
};
_f.mouseY=function(e){
var _23=0;
if(e.pageY){
_23=e.pageY;
}else{
if(e.clientY){
_23=e.clientY;
if(ravegeo.internal.Environment.isIE){
if(document.documentElement&&document.documentElement.scrollTop){
_23+=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_23+=document.body.scrollTop;
}
}
}
}
}
return _23;
};
_f.topLeftX=function(obj){
var _25=0;
if(obj.offsetParent){
do{
_25+=obj.offsetLeft;
obj=obj.offsetParent;
}while(obj);
}else{
if(obj.x){
_25+=obj.x;
}
}
return _25;
};
_f.topLeftY=function(obj){
var _27=0;
if(obj.offsetParent){
do{
_27+=obj.offsetTop;
obj=obj.offsetParent;
}while(obj);
}else{
if(obj.y){
_27+=obj.y;
}
}
return _27;
};
_f.getOpacity=function(_28){
if(_28.length==9){
return parseInt(_28.substring(1,3),16)/255;
}
return 1;
};
_f.getColor=function(_29){
if(_29.length==9){
return "#"+_29.substring(3);
}
return _29;
};
_f.fixStyle=function(_2a){
if(_2a.fillColor){
_2a.fillOpacity=_f.getOpacity(_2a.fillColor);
_2a.fillColor=_f.getColor(_2a.fillColor);
}
if(_2a.strokeColor){
_2a.strokeOpacity=_f.getOpacity(_2a.strokeColor);
_2a.strokeColor=_f.getColor(_2a.strokeColor);
}
return _2a;
};
_f.setOpacity=function(el,_2c){
if(_2c<1&&_2c>=0){
el.style.opacity=""+_2c;
el.style.filter="alpha(opacity="+Math.round(_2c*100)+")";
}
};
_f.removeChildren=function(_2d,_2e){
while(_2d.childNodes.length>1){
var _2f=_2d.childNodes[0];
if(_2f===_2e){
_2f=_2d.childNodes[1];
}
_2d.removeChild(_2f);
}
if(_2d.childNodes.length>0&&!_2e){
_2d.removeChild(_2d.childNodes[0]);
}
};
_f.stringIsEmpty=function(s){
if(s){
return s.length==0;
}
return true;
};
return _f;
})();
ravegeo.internal.MapCommons=(function(){
var _31={};
_31._fixParams=function(_32){
if(typeof (_32.mapContainer)=="string"){
_32.mapContainer=document.getElementById(_32.mapContainer);
}
if(!_32.url&&document&&document.getElementsByTagName){
var _33=document.getElementsByTagName("script");
var _34=/ravegeowebmap\.js([\?\.]|$)/i;
for(var i=0;i<_33.length;++i){
var src=_33[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_34);
if(m){
root=src.substring(0,m.index);
_32.url=root;
break;
}
}
}
};
_31._serializeDoubleArray=function(arr){
var s=""+arr.length+";";
for(var i=0;i<arr.length;++i){
s+=arr[i]+";";
}
return s;
};
_31._polyX_expandBounds=function(_3b,_3c,_3d,_3e){
for(var i=0;i<_3b.length;++i){
if(_3b[i]<_3d.x){
_3d.x=_3b[i];
}
if(_3b[i]>_3e.x){
_3e.x=_3b[i];
}
if(_3c[i]<_3d.y){
_3d.y=_3c[i];
}
if(_3c[i]>_3e.y){
_3e.y=_3c[i];
}
}
};
MapCommons_polyX_getBounds=function(_40,_41){
var _42={x:Number.POSITIVE_INFINITY,y:Number.POSITIVE_INFINITY};
var _43={x:Number.NEGATIVE_INFINITY,y:Number.NEGATIVE_INFINITY};
for(var i=0;i<_40.length;++i){
if(_40[i]<_42.x){
_42.x=_40[i];
}
if(_40[i]>_43.x){
_43.x=_40[i];
}
if(_41[i]<_42.y){
_42.y=_41[i];
}
if(_41[i]>_43.y){
_43.y=_41[i];
}
}
return {minPoint:_42,maxPoint:_43};
};
_31._polyX_isInside=function(_45,_46,_47,_48,_49,_4a){
var _4b=getBounds(_45,_46);
return _4b.minPoint.x<_49&&_4b.maxPoint.x>_47&&_4b.minPoint.y<_4a&&_4b.maxPoint.y>_48;
};
_31._polyX_getCenter=function(_4c,_4d){
var _4e=getBounds(_4c,_4d);
return {x:(_4e.minPoint.x+_4e.maxPoint.x)/2,y:(_4e.minPoint.y+_4e.maxPoint.y)/2};
};
MapCommons_polyX_geoToPixels=function(_4f,_50,_51,_52){
var ret=[];
for(var i=0;i<_4f.length;++i){
ret[ret.length]=Math.round((_4f[i]-_50)*_51)+_52;
}
return ret;
};
_31._polyX_position=function(_55,_56,_57,_58,_59){
if(_55._canvasElement){
_55._layer._layerDiv.removeChild(_55._canvasElement);
}
var _5a=MapCommons_polyX_getBounds(_55._xPoints,_55._yPoints);
var _5b=Math.round((_5a.minPoint.x-_56.x)*_57.x)-_58;
var _5c=Math.round((_5a.maxPoint.x-_56.x)*_57.x)+_58;
var _5d=Math.round((_56.y-_5a.maxPoint.y)*_57.y)-_58;
var _5e=Math.round((_56.y-_5a.minPoint.y)*_57.y)+_58;
var _5f=MapCommons_polyX_geoToPixels(_55._xPoints,_5a.minPoint.x,_57.x,_58);
var _60=MapCommons_polyX_geoToPixels(_55._yPoints,_5a.maxPoint.y,-_57.y,_58);
var _61=_5c-_5b;
var _62=_5e-_5d;
var _63=ravegeo.internal.Canvas.create(_61,_62);
var _64=_63.getElement();
_55._canvasElement=_64;
_64.style.position="absolute";
_64.style.zIndex="51";
_64.style.left=_5b+"px";
_64.style.top=_5d+"px";
_55._layer._layerDiv.appendChild(_64);
if(_59){
_63.drawPolygon(_5f,_60,ravegeo.internal.Utilities.fixStyle({fillColor:_55.color}));
}else{
_63.drawPolyline(_5f,_60,ravegeo.internal.Utilities.fixStyle({strokeColor:_55.color,strokeWidth:_55.width}));
}
var _65=ravegeo.internal.Environment.isIE?_64.firstChild:_64;
_65._tile={owner:_55._layer};
ravegeo.internal.Utilities.addEvent(_65,"mousedown",ravegeo.TiledMap._mouseDown,true);
ravegeo.internal.Utilities.addEvent(_65,"dragstart",ravegeo.internal.Utilities.stopEvent,false);
};
_31.defaultInteractionDelay=700;
_31.maxInteractionDelay=10000;
_31.getHandleTimeout=15000;
_31.getTilesInfoTimeout=15000;
_31.version="2.0.2";
return _31;
})();
ravegeo.Ellipse=(function(){
var _66=function(id,x1,y1,x2,y2,_6c,_6d){
this.id=id;
if(x1<x2){
this._xMin=x1;
this._xMax=x2;
}else{
this._xMin=x2;
this._xMax=x1;
}
if(y1<y2){
this._yMin=y1;
this._yMax=y2;
}else{
this._yMin=y2;
this._yMax=y1;
}
this.width=(typeof (_6c)!="undefined")?_6c:0;
this.color=(typeof (_6d)!="undefined")?_6d:"#000000";
};
_66.prototype.getBounds=function(){
var _6e={xMin:this._xMin,yMin:this._yMin,xMax:this._xMax,yMax:this._yMax};
if(ravegeo._projector){
var _6f=ravegeo._projector.reverse(_6e.xMin,_6e.yMin);
var _70=ravegeo._projector.reverse(_6e.xMax,_6e.yMax);
_6e.xMin=_6f[0];
_6e.yMin=_6f[1];
_6e.xMax=_70[0];
_6e.xMax=_70[1];
}
return _6e;
};
_66.prototype._project=function(){
if(ravegeo._projector){
var p=ravegeo._projector.forward(this._xMin,this._yMin);
this._xMin=p[0];
this._yMin=p[1];
p=ravegeo._projector.forward(this._xMax,this._yMax);
this._xMax=p[0];
this._yMax=p[1];
}
};
_66.prototype._serialize=function(){
var e="e";
e+=this.id.length+";"+this.id;
e+=this._xMin+";";
e+=this._yMin+";";
e+=this._xMax+";";
e+=this._yMax+";";
e+=this.width+";";
e+=this.color.length+";"+this.color;
return e;
};
_66.prototype._tiledMapInit=function(_73,_74){
this._layer=_73;
_73._positionGeoObject(this);
};
_66.prototype._destroy=function(){
this._layer._layerDiv.removeChild(this._canvasElement);
};
_66.prototype._position=function(_75,_76){
if(this._canvasElement){
this._layer._layerDiv.removeChild(this._canvasElement);
}
var _77=Math.round((this._xMin-_75.x)*_76.x)-5;
var _78=Math.round((this._xMax-_75.x)*_76.x)+5;
var _79=Math.round((_75.y-this._yMax)*_76.y)-5;
var _7a=Math.round((_75.y-this._yMin)*_76.y)+5;
var _7b=_78-_77;
var _7c=_7a-_79;
var _7d=ravegeo.internal.Canvas.create(_7b,_7c);
var _7e=_7d.getElement();
this._canvasElement=_7e;
_7e.style.position="absolute";
_7e.style.zIndex="51";
_7e.style.left=_77+"px";
_7e.style.top=_79+"px";
this._layer._layerDiv.appendChild(_7e);
var _7f=(this.width>0)?{strokeColor:this.color,strokeWidth:this.width}:{fillColor:this.color};
ravegeo.internal.Utilities.fixStyle(_7f);
_7d.drawOval(5,5,_7b-10,_7c-10,_7f);
var _80=ravegeo.internal.Environment.isIE?_7e.firstChild:_7e;
_80._tile={owner:this._layer};
ravegeo.internal.Utilities.addEvent(_80,"mousedown",ravegeo.TiledMap._mouseDown,true);
ravegeo.internal.Utilities.addEvent(_80,"dragstart",ravegeo.internal.Utilities.stopEvent,false);
};
_66.prototype._isInside=function(_81,_82,_83,_84){
return this._xMin<_83&&this._xMax>_81&&this._yMin<_84&&this._yMax>_82;
};
_66.prototype._expandBounds=function(_85,_86){
if(this._xMin<_85.x){
_85.x=this._xMin;
}
if(this._xMax>_86.x){
_86.x=this._xMax;
}
if(this._yMin<_85.y){
_85.y=this._yMin;
}
if(this._yMax>_86.y){
_86.y=this._yMax;
}
};
_66.prototype._getCenter=function(){
return {x:(this.minX+this.maxX)/2,y:(this.minY+this.maxY)/2};
};
_66.prototype._setHighlight=function(_87,_88){
};
_66.prototype._removeHighlight=function(){
};
return _66;
})();
ravegeo.Symbol=(function(){
var _89=ravegeo.internal.Utilities;
var _8a=function(id,x,y,_8e,_8f,_90){
this.id=id;
this._x=x;
this._y=y;
this.symbol=_8e;
this.label=(typeof (_8f)!="undefined"&&_8f!=null)?_8f:"";
this.text=(typeof (_90)!="undefined"&&_90!=null)?_90:"";
};
_8a.prototype.getPoint=function(){
if(ravegeo._projector){
var p=ravegeo._projector.reverse(this._x,this._y);
return {x:p[0],y:p[1]};
}
return {x:this._x,y:this._y};
};
_8a.prototype._project=function(){
if(ravegeo._projector){
var p=ravegeo._projector.forward(this._x,this._y);
this._x=p[0];
this._y=p[1];
}
};
_8a.prototype._serialize=function(){
var s="s";
s+=this.id.length+";"+this.id;
s+=this._x+";";
s+=this._y+";";
s+=this.symbol.length+";"+this.symbol;
s+=this.label.length+";"+this.label;
s+=this.text.length+";"+this.text;
return s;
};
function mouseDown(e){
if(_89.leftButton(e)){
var _95=_89.getTarget(e);
var _96=_95._symbol;
if(_96){
var map=_96._layer._map;
var _98=map._callback;
if(_98&&_98.symbolClicked){
_98.symbolClicked(map,_96._layer,_96.id);
}
}
_89.stopEvent(e);
}
}
function mouseOver(e){
var _9a=_89.getTarget(e);
var _9b=_9a._symbol;
if(_9b){
_9a.style.border="1px solid gray";
if(!_9b._alwaysBalloon&&!_89.stringIsEmpty(_9b.text)){
_9b._balloon=createBallon(_9b,_9b._layer._textStyle);
_9b._layer._layerDiv.appendChild(_9b._balloon);
}
}
_89.stopEvent(e);
}
function mouseOut(e){
var _9d=_89.getTarget(e);
var _9e=_9d._symbol;
if(_9e){
if(_9e._balloon){
_9e._layer._layerDiv.removeChild(_9e._balloon);
}
_9e._balloon=null;
_9d.style.border="0px none";
}
_89.stopEvent(e);
}
function createBallon(_9f,_a0){
var _a1=document.createElement("div");
_89.setStyle(_a1,"position:absolute;top:0px;left:0px;z-index:53;border:1px solid;cursor:text;padding:3px 5px 3px 5px;white-space:pre;");
_a1.style.borderColor=_89.getColor(_a0.borderColor);
_a1.style.backgroundColor=_89.getColor(_a0.backgroundColor);
_a1.innerHTML+=_9f.text;
_a1.style.color=_89.getColor(_a0.textColor);
_a1.style.left=(_9f._left+_9f._img.width+5)+"px";
_a1.style.top=(_9f._top+_9f._img.height+5)+"px";
return _a1;
}
function imageLoaded(){
var _a2=this._symbol;
delete _a2._notYetLoaded;
_a2._layer._positionGeoObject(_a2);
if(_a2._doHighlight){
_a2._layer.highlightGeoObject(_a2.id,_a2._doHighlight);
delete _a2._doHighlight;
}
}
_8a.prototype._tiledMapInit=function(_a3,_a4){
var _a5;
if(_a4){
_a5={center:"Never"};
if(_a4._highlightElement){
_a5.showHighlight=true;
}
if(_a4._alwaysBalloon){
_a5.showText=true;
}
}
this._layer=_a3;
var img=document.createElement("img");
this._img=img;
img.src=this.symbol;
img.style.position="absolute";
img.style.zIndex="50";
try{
img.style.cursor="pointer";
}
catch(e){
img.style.cursor="hand";
}
img._symbol=this;
var _a7;
if(!_89.stringIsEmpty(this.label)){
var _a8=document.createElement("span");
this._innerLabelSpan=_a8;
_a8.innerHTML=this.label;
_89.setStyle(_a8,"font-family:sans-serif;font-size:small;padding:0px;white-space:pre;border:1px solid;padding:2px 3px 2px 3px;");
_a8.style.borderColor=_89.getColor(_a3._labelStyle.borderColor);
_a8.style.backgroundColor=_89.getColor(_a3._labelStyle.backgroundColor);
_a8.style.color=_89.getColor(_a3._labelStyle.textColor);
labelDiv=this._labelDiv=document.createElement("div");
_89.setStyle(labelDiv,"position:absolute;left:-750px;z-index:49;width:1500px;text-align:center;padding:5px;margin:1px;");
labelDiv.appendChild(_a8);
_a8._tile={owner:_a3};
_89.addEvent(_a8,"mousedown",ravegeo.TiledMap._mouseDown,true);
_89.addEvent(_a8,"dragstart",_89.stopEvent,false);
labelDiv._tile={owner:_a3};
//_89.addEvent(labelDiv,"mousedown",TiledMap._mouseDown,true);
_89.addEvent(labelDiv,"dragstart",_89.stopEvent,false);
_a7=this._symbolCenterDiv=document.createElement("div");
_89.setStyle(_a7,"position:absolute;z-index:49;width:0px;height:0px;padding:0px;margin:0px;");
_a7.appendChild(labelDiv);
}
_a3._positionGeoObject(this);
_89.addEvent(img,"mousedown",mouseDown,false);
_89.addEvent(img,"mouseover",mouseOver,false);
_89.addEvent(img,"mouseout",mouseOut,false);
_a3._layerDiv.appendChild(img);
if(_a7){
_a3._layerDiv.appendChild(_a7);
}
if(_a5){
_a3.highlightGeoObject(this.id,_a5);
}
};
_8a.prototype._destroy=function(){
if(this==this._layer._map._highlightedGeoObject){
this._removeHighlight();
delete this._layer._map._highlightedGeoObject;
}
this._layer._layerDiv.removeChild(this._img);
if(this._balloon){
this._layer._layerDiv.removeChild(this._balloon);
}
if(this._symbolCenterDiv){
this._labelDiv._tile=null;
this._innerLabelSpan._tile=null;
this._layer._layerDiv.removeChild(this._symbolCenterDiv);
}
};
_8a.prototype._position=function(_a9,_aa){
var cx=-Math.round((_a9.x-this._x)*_aa.x);
var cy=Math.round((_a9.y-this._y)*_aa.y);
this._left=cx-this._img.width/2;
this._top=cy-this._img.height/2;
this._img.style.left=this._left+"px";
this._img.style.top=this._top+"px";
if(this._labelDiv){
this._symbolCenterDiv.style.left=cx+"px";
this._symbolCenterDiv.style.top=cy+"px";
if(this._layer._labelsAboveSymbols){
this._labelDiv.style.bottom=(this._img.height/2-3)+"px";
}else{
this._labelDiv.style.top=(this._img.height/2-1)+"px";
}
}
if(!_89.isImageLoaded(this._img)){
this._notYetLoaded=true;
_89.onImageLoaded(this._img,imageLoaded);
}
if(this._highlightElement){
var _ad=Math.round(this._left+this._img.width/2);
var _ae=Math.round(this._top+this._img.height/2);
var ow=this._highlightOuterWidth;
if(typeof (ow)!="undefined"){
this._highlightElement.style.left=Math.round(_ad-ow)+"px";
this._highlightElement.style.top=(_ae-ow)+"px";
}
}
};
_8a.prototype._isInside=function(_b0,_b1,_b2,_b3){
return this._x>=_b0&&this._y>=_b1&&this._x<=_b2&&this._y<=_b3;
};
_8a.prototype._expandBounds=function(_b4,_b5){
if(this._x<_b4.x){
_b4.x=this._x;
}
if(this._x>_b5.x){
_b5.x=this._x;
}
if(this._y<_b4.y){
_b4.y=this._y;
}
if(this._y>_b5.y){
_b5.y=this._y;
}
};
_8a.prototype._getCenter=function(){
return {x:this._x,y:this._y};
};
_8a.prototype._setHighlight=function(_b6,_b7){
if(_b6){
this._alwaysBalloon=createBallon(this,this._layer._textStyle);
this._layer._layerDiv.appendChild(this._alwaysBalloon);
}
if(_b7){
var _b8=this._img.width;
var _b9=this._img.height;
var _ba=Math.round(this._left+_b8/2);
var _bb=Math.round(this._top+_b9/2);
var _bc=Math.max(_b8,_b9)/3;
var _bd=(Math.sqrt(_b8*_b8+_b9*_b9)/2)+_bc;
var ow=Math.round(_bd+_bc/2);
this._highlightOuterWidth=ow;
var _bf=ravegeo.internal.Canvas.create(ow*2,ow*2);
var _c0=_bf.getElement();
_c0.style.position="absolute";
_c0.style.zIndex="51";
_c0.style.left=Math.round(_ba-ow)+"px";
_c0.style.top=(_bb-ow)+"px";
this._layer._layerDiv.appendChild(_c0);
_c0._tile={owner:this._layer};
_89.addEvent(_c0,"mousedown",ravegeo.TiledMap._mouseDown,true);
_89.addEvent(_c0,"dragstart",_89.stopEvent,false);
this._highlightElement=_c0;
var end=Math.PI*2+0.1;
for(var i=0;i<=end;i+=inc){
var x=ow-Math.floor(_bd*Math.cos(i));
var y=ow-Math.floor(_bd*Math.sin(i));
_bf.drawCircle(x,y,_bc/2,_89.fixStyle({fillColor:this._layer._highlightColor}));
}
}
this._img.style.zIndex="53";
};
_8a.prototype._removeHighlight=function(){
this._img.style.zIndex="50";
if(this._alwaysBalloon){
this._layer._layerDiv.removeChild(this._alwaysBalloon);
delete this._alwaysBalloon;
}
if(this._highlightElement){
this._layer._layerDiv.removeChild(this._highlightElement);
delete this._highlightOuterWidth;
delete this._highlightElement;
}
};
return _8a;
})();
ravegeo.Polygon=(function(){
var _c5=function(id,_c7,_c8,_c9){
this.id=id;
this._xPoints=_c7;
this._yPoints=_c8;
this.color=(typeof (_c9)!="undefined")?_c9:"#000000";
};
_c5.prototype.getPoints=function(){
var _ca=this._xPoints;
var _cb=this._yPoints;
if(ravegeo._projector){
_ca=_ca.slice(0);
_cb=_cb.slice(0);
ravegeo._projector.reverseArray(_ca,_cb);
}
return {xValues:_ca,yValues:_cb};
};
_c5.prototype._project=function(){
if(ravegeo._projector){
ravegeo._projector.forwardArray(this._xPoints,this._yPoints);
}
};
_c5.prototype._serialize=function(){
var g="g";
g+=this.id.length+";"+this.id;
g+=ravegeo.internal.MapCommons._serializeDoubleArray(this._xPoints);
g+=ravegeo.internal.MapCommons._serializeDoubleArray(this._yPoints);
g+=this.color.length+";"+this.color;
return g;
};
_c5.prototype._tiledMapInit=function(_cd,_ce){
this._layer=_cd;
_cd._positionGeoObject(this);
};
_c5.prototype._destroy=function(){
this._layer._layerDiv.removeChild(this._canvasElement);
};
_c5.prototype._position=function(_cf,_d0){
ravegeo.internal.MapCommons._polyX_position(this,_cf,_d0,5,true);
};
_c5.prototype._isInside=function(_d1,_d2,_d3,_d4){
ravegeo.internal.MapCommons._polyX_isInside(this._xPoints,this._yPoints,_d1,_d2,_d3,_d4);
};
_c5.prototype._expandBounds=function(_d5,_d6){
ravegeo.internal.MapCommons._polyX_expandBounds(this._xPoints,this._yPoints,_d5,_d6);
};
_c5.prototype._getCenter=function(){
return ravegeo.internal.MapCommons._polyX_getCenter(this._xPoints,this._yPoints);
};
_c5.prototype._setHighlight=function(_d7,_d8){
};
_c5.prototype._removeHighlight=function(){
};
return _c5;
})();
ravegeo.Polyline=(function(){
var _d9=function(id,_db,_dc,_dd,_de){
this.id=id;
this._xPoints=_db;
this._yPoints=_dc;
this.width=(typeof (_dd)!="undefined")?_dd:0;
this.color=(typeof (_de)!="undefined")?_de:"#000000";
};
_d9.prototype.getPoints=function(){
var _df=this._xPoints;
var _e0=this._yPoints;
if(ravegeo._projector){
_df=_df.slice(0);
_e0=_e0.slice(0);
ravegeo._projector.reverseArray(_df,_e0);
}
return {xValues:_df,yValues:_e0};
};
_d9.prototype._project=function(){
if(ravegeo._projector){
ravegeo._projector.forwardArray(this._xPoints,this._yPoints);
}
};
_d9.prototype._serialize=function(){
var l="l";
l+=this.id.length+";"+this.id;
l+=ravegeo.internal.MapCommons._serializeDoubleArray(this._xPoints);
l+=ravegeo.internal.MapCommons._serializeDoubleArray(this._yPoints);
l+=this.width+";";
l+=this.color.length+";"+this.color;
return l;
};
_d9.prototype._tiledMapInit=function(_e2,_e3){
this._layer=_e2;
_e2._positionGeoObject(this);
};
_d9.prototype._destroy=function(){
this._layer._layerDiv.removeChild(this._canvasElement);
};
_d9.prototype._position=function(_e4,_e5){
ravegeo.internal.MapCommons._polyX_position(this,_e4,_e5,5+this.width,false);
};
_d9.prototype._isInside=function(_e6,_e7,_e8,_e9){
ravegeo.internal.MapCommons._polyX_isInside(this._xPoints,this._yPoints,_e6,_e7,_e8,_e9);
};
_d9.prototype._expandBounds=function(_ea,_eb){
ravegeo.internal.MapCommons._polyX_expandBounds(this._xPoints,this._yPoints,_ea,_eb);
};
_d9.prototype._getCenter=function(){
return ravegeo.internal.MapCommons._polyX_getCenter(this._xPoints,this._yPoints);
};
_d9.prototype._setHighlight=function(_ec,_ed){
};
_d9.prototype._removeHighlight=function(){
};
return _d9;
})();
ravegeo.MercatorProjector=(function(){
var _ee=Math.PI/180;
var _ef=111319.49079;
var _f0={};
_f0.forward=function(lon,lat){
if(lat>88){
lat=88;
}
if(lat<-88){
lat=-88;
}
var _f3=Math.sin(lat*_ee);
var _f4=0.5*Math.log((1+_f3)/(1-_f3));
var y=_f4/_ee*_ef;
return [lon*_ef,y];
};
_f0.reverse=function(x,y){
var _f8=2*Math.atan(Math.exp(y/_ef*_ee))-Math.PI/2;
return [x/_ef,_f8/_ee];
};
_f0.forwardArray=function(_f9,_fa){
for(var i in _f9){
var p=_f0.forward(_f9[i],_fa[i]);
_f9[i]=p[0];
_fa[i]=p[1];
}
};
_f0.reverseArray=function(_fd,_fe){
for(var i in _fd){
var p=_f0.reverse(_fd[i],_fe[i]);
_fd[i]=p[0];
_fe[i]=p[1];
}
};
return _f0;
})();
ravegeo.AppletMap=(function(){
var _101=0;
var _102=function(_103){
ravegeo.internal.MapCommons._fixParams(_103);
if(ravegeo._projector){
delete ravegeo._projector;
}
if(_103._appletProjector){
ravegeo._projector=_103._appletProjector;
}
this._appletTimeoutCallback=_103._appletTimeoutCallback;
this._callback=_103.callback;
this._mapContainer=_103.mapContainer;
this._layers=[];
var _104=ravegeo.internal.MapCommons.defaultInteractionDelay;
if(typeof (_103.interactionDelay)!="undefined"){
_104=_103.interactionDelay;
if(_104>ravegeo.internal.MapCommons.maxInteractionDelay||_104<0){
_104=ravegeo.internal.MapCommons.maxInteractionDelay;
}
}
var _105="webmap-"+ravegeo.internal.MapCommons.version+".jar";
if(_103.useSignedApplet){
_105="webmap-signed-"+ravegeo.internal.MapCommons.version+".jar";
}
this._id="RaveGeoWebMapApplet"+_101++;
var html="<applet id='"+this._id+"' code='ravegeo.webmap.WebMap.class' archive='"+_103.url+_105+"' mayscript='true' width='1' height='1'>";
html+="<param name='url' value='"+_103.url+"' />";
html+="<param name='name' value='"+_103.name+"' />";
if(_103.key){
html+="<param name='key' value='"+_103.key+"' />";
}
html+="<param name='callbackId' value='"+this._id+"' />";
html+="<param name='interactionDelay' value='"+_104+"' />";
if(_103.initialViewArea){
var x=_103.initialViewArea.x;
var y=_103.initialViewArea.y;
if(ravegeo._projector){
var p=ravegeo._projector.forward(x,y);
x=p[0];
y=p[1];
}
html+="<param name='initialViewArea.x' value='"+x+"' />";
html+="<param name='initialViewArea.y' value='"+y+"' />";
html+="<param name='initialViewArea.scale' value='"+_103.initialViewArea.scale+"' />";
}
if(_103.style){
var _10a="";
for(var k in _103.style){
_10a+=k+"|"+_103.style[k]+"|";
}
html+="<param name='style' value='"+_10a+"' />";
}
html+="</applet>";
this._mapContainer.innerHTML+=html;
ravegeo.AppletMap.appletMaps[this._id]=this;
this._isAppletLoaded=false;
if(_103._maxAppletLoadTime){
var _10c=this;
setTimeout(function(){
_10c._appletLoadTimedOut();
},_103._maxAppletLoadTime);
}
this._params=_103;
};
_102.prototype._appletLoaded=function(){
this._isAppletLoaded=true;
};
_102.prototype._appletLoadTimedOut=function(){
if(!this._isAppletLoaded){
if(this._appletTimeoutCallback){
this._appletTimeoutCallback();
}else{
this._errorDuringInit("AppletLoadTimeout","The applet did not load in the specified maximum time.");
}
}
};
_102.prototype._mapLoaded=function(){
var _10d=this._params;
delete this._params;
this._applet=document.getElementById(this._id);
try{
this._applet.getCenterX();
}
catch(e){
if(this._appletTimeoutCallback){
this._appletTimeoutCallback();
}else{
this._errorDuringInit("LiveConnectNotAvailable","Could not connect to applet using LiveConnect.");
}
return;
}
this._applet.style.width=this._mapContainer.clientWidth+"px";
this._applet.style.height=this._mapContainer.clientHeight+"px";
ravegeo.internal.Utilities.removeChildren(this._mapContainer,this._applet);
if(this._callback&&this._callback.mapLoaded){
this._callback.mapLoaded(this);
}
};
_102.prototype._errorDuringInit=function(code,_10f){
this._mapContainer.innerHTML="Fatal error: "+code+"<br>"+_10f;
if(this._callback&&this._callback.errorOccurred){
this._callback.errorOccurred(code,_10f);
}
};
_102.prototype._symbolClicked=function(_110,_111){
if(this._callback&&this._callback.symbolClicked){
this._callback.symbolClicked(this,this._layers[_110],_111);
}
};
_102.prototype._mapClicked=function(x,y){
if(this._callback&&this._callback.mapClicked){
if(ravegeo._projector){
var p=ravegeo._projector.reverse(x,y);
x=p[0];
y=p[1];
}
this._callback.mapClicked(this,x,y);
}
};
_102.prototype._interactionEnded=function(){
if(this._callback&&this._callback.interactionEnded){
this._callback.interactionEnded(this);
}
};
_102.prototype.getCenterX=function(){
var x=this._applet.getCenterX();
if(ravegeo._projector){
var y=this._applet.getCenterY();
var p=ravegeo._projector.reverse(x,y);
x=p[0];
}
return x;
};
_102.prototype.getCenterY=function(){
var y=this._applet.getCenterY();
if(ravegeo._projector){
var x=this._applet.getCenterX();
var p=ravegeo._projector.reverse(x,y);
y=p[1];
}
return y;
};
_102.prototype.getScale=function(){
return this._applet.getScale();
};
_102.prototype.getGeoBounds=function(){
var _11b=eval("("+this._applet.getGeoBounds()+")");
if(ravegeo._projector){
_11b[0]=ravegeo._projector.reverse(_11b[0][0],_11b[0][1]);
_11b[1]=ravegeo._projector.reverse(_11b[1][0],_11b[1][1]);
}
return {xMin:_11b[0][0],yMin:_11b[0][1],xMax:_11b[1][0],yMax:_11b[1][1]};
};
_102.prototype.setGeoBounds=function(_11c){
if(ravegeo._projector){
var minp=ravegeo._projector.forward(_11c.xMin,_11c.yMin);
var maxp=ravegeo._projector.forward(_11c.xMax,_11c.yMax);
_11c={xMin:minp[0],yMin:minp[1],xMax:maxp[0],yMax:maxp[1]};
}
this._applet.setGeoBounds(_11c.xMin,_11c.yMin,_11c.xMax,_11c.yMax);
};
_102.prototype.getRecommendedScales=function(){
return eval("("+this._applet.getRecommendedScales()+")");
};
_102.prototype.setViewArea=function(x,y,_121){
if(ravegeo._projector){
var p=ravegeo._projector.forward(x,y);
x=p[0];
y=p[1];
}
this._applet.setViewArea(x,y,_121);
};
_102.prototype.newLayer=function(opts){
var _124=new ravegeo.internal.AppletLayer(this._applet);
this._layers[_124._id]=_124;
return _124;
};
_102.prototype.removeLayer=function(_125){
this._applet.removeLayer(_125._id);
delete this._layers[_125._id];
};
_102.prototype.zoom=function(_126){
this._applet.zoom(_126);
};
_102.prototype.zoomTo=function(_127){
this._applet.zoomTo(_127);
};
_102.prototype.pan=function(dx,dy){
this._applet.pan(dx,dy);
};
_102.prototype.moveTo=function(x,y,_12c){
if(ravegeo._projector){
var p=ravegeo._projector.forward(x,y);
x=p[0];
y=p[1];
}
this._applet.moveTo(x,y,_12c);
};
_102.prototype.resize=function(_12e,_12f){
this._applet.style.width=_12e+"px";
this._applet.style.height=_12f+"px";
this._mapContainer.style.width=_12e+"px";
this._mapContainer.style.height=_12f+"px";
};
_102.initiateCreation=function(_130){
if(!ravegeo.internal.Environment.isJavaEnabled()){
throw new Error("Java does not seem to be enabled.");
}
var map=new ravegeo.AppletMap(_130);
};
_102.appletMaps={};
return _102;
})();
ravegeo.internal.AppletLayer=(function(){
var _132=function(_133){
this._applet=_133;
if(typeof (opts)=="undefined"){
opts={};
}
opts.arrangeGeoObjects=opts.arrangeGeoObjects?true:false;
if(typeof (opts.gridWidth)=="undefined"){
opts.gridWidth=16;
}
if(typeof (opts.gridHeight)=="undefined"){
opts.gridHeight=16;
}
if(typeof (opts.labelStyle)=="undefined"){
opts.labelStyle={};
}
var _134=opts.labelStyle;
if(!_134.borderColor){
_134.borderColor="";
}
if(!_134.backgroundColor){
_134.backgroundColor="";
}
if(!_134.textColor){
_134.textColor="";
}
opts.labelsAboveSymbols=opts.labelsAboveSymbols?true:false;
if(typeof (opts.textStyle)=="undefined"){
opts.textStyle={};
}
var _135=opts.textStyle;
if(!_135.borderColor){
_135.borderColor="";
}
if(!_135.backgroundColor){
_135.backgroundColor="";
}
if(!_135.textColor){
_135.textColor="";
}
if(typeof (opts.highlightColor)=="undefined"){
opts.highlightColor="";
}
this._id=this._applet.newLayer(opts.arrangeGeoObjects,opts.gridWidth,opts.gridHeight,opts.labelStyle.borderColor,opts.labelStyle.backgroundColor,opts.labelStyle.textColor,opts.labelsAboveSymbols,opts.textStyle.borderColor,opts.textStyle.backgroundColor,opts.textStyle.textColor,opts.highlightColor);
};
_132.prototype.clear=function(){
this._applet.clearGeoObjects(this._id);
};
_132.prototype.addGeoObjects=function(objs){
var _137="";
for(var idx in objs){
objs[idx]._project();
_137+=objs[idx]._serialize();
}
this._applet.addGeoObjects(this._id,_137);
};
_132.prototype.getGeoObjectIds=function(_139){
var js=this._applet.getGeoObjectIds(this._id,_139?true:false);
return eval("("+js+")");
};
_132.prototype.getGeoObject=function(id){
var js=this._applet.getGeoObject(this._id,id);
return eval("("+js+")");
};
_132.prototype.removeGeoObjects=function(ids){
var _13e="";
for(var idx in ids){
_13e+=ids[idx].length+";"+ids[idx];
}
this._applet.removeGeoObjects(this._id,_13e);
};
_132.prototype.setVisible=function(_140){
if(typeof (_140)=="undefined"){
_140=true;
}
this._applet.setLayerVisible(this._id,_140);
};
_132.prototype.showGeoObjects=function(_141){
this._applet.showGeoObjects(this._id,_141);
};
_132.prototype.highlightGeoObject=function(id,_143){
if(typeof (_143)=="undefined"){
_143={};
}
if(typeof (_143.center)=="undefined"){
_143.center="";
}
if(typeof (_143.showText)=="undefined"){
_143.showText=false;
}
if(typeof (_143.showHighlight)=="undefined"){
_143.showHighlight=false;
}
this._applet.highlightGeoObject(this._id,id,_143.center,_143.showText,_143.showHighlight);
};
return _132;
})();
ravegeo.internal.Canvas=(function(){
var _144="http://www.w3.org/TR/SVG11/feature#SVG";
var _145=(document.implementation&&(document.implementation.hasFeature("org.w3c.svg","1.0")||document.implementation.hasFeature(_144,"1.1")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape","1.0")));
function SVGCanvas(_146,_147){
this._element=document.createElementNS(SVGCanvas.xmlns,"svg");
this._element.setAttributeNS(null,"width",_146);
this._element.setAttributeNS(null,"height",_147);
this._style={strokeColor:"#000000"};
}
SVGCanvas.xmlns="http://www.w3.org/2000/svg";
SVGCanvas.buildStyleString=function(_148){
var _149="fill:"+(_148.fillColor||"none")+";";
if(typeof (_148.fillOpacity)!="undefined"){
_149+="fill-opacity:"+_148.fillOpacity+";";
}
_149+="stroke:"+(_148.strokeColor||"none")+";";
if(typeof (_148.strokeOpacity)!="undefined"){
_149+="stroke-opacity:"+_148.strokeOpacity+";";
}
if(typeof (_148.strokeWidth)!="undefined"){
_149+="stroke-width:"+_148.strokeWidth+";";
}
return _149;
};
SVGCanvas.createPoly=function(_14a,_14b,type,_14d){
var poly=document.createElementNS(SVGCanvas.xmlns,type);
var _14f="";
for(var i in _14a){
_14f+=_14a[i]+","+_14b[i]+" ";
}
poly.setAttributeNS(null,"points",_14f);
poly.setAttributeNS(null,"style",SVGCanvas.buildStyleString(_14d));
return poly;
};
SVGCanvas.prototype.getElement=function(){
return this._element;
};
SVGCanvas.prototype.setStyle=function(_151){
this._style=_151;
};
SVGCanvas.prototype.drawCircle=function(cx,cy,_154,_155){
_155=_155||this._style;
var _156=document.createElementNS(SVGCanvas.xmlns,"circle");
_156.setAttributeNS(null,"cx",cx);
_156.setAttributeNS(null,"cy",cy);
_156.setAttributeNS(null,"r",_154);
_156.setAttributeNS(null,"style",SVGCanvas.buildStyleString(_155));
this._element.appendChild(_156);
};
SVGCanvas.prototype.drawOval=function(x,y,_159,_15a,_15b){
_15b=_15b||this._style;
var _15c=document.createElementNS(SVGCanvas.xmlns,"ellipse");
_15c.setAttributeNS(null,"cx",x+_159/2);
_15c.setAttributeNS(null,"cy",y+_15a/2);
_15c.setAttributeNS(null,"rx",_159/2);
_15c.setAttributeNS(null,"ry",_15a/2);
_15c.setAttributeNS(null,"style",SVGCanvas.buildStyleString(_15b));
this._element.appendChild(_15c);
};
SVGCanvas.prototype.drawPolygon=function(_15d,_15e,_15f){
_15f=_15f||this._style;
this._element.appendChild(SVGCanvas.createPoly(_15d,_15e,"polygon",_15f));
};
SVGCanvas.prototype.drawPolyline=function(_160,_161,_162){
_162=_162||this._style;
this._element.appendChild(SVGCanvas.createPoly(_160,_161,"polyline",_162));
};
SVGCanvas.prototype.drawRect=function(x,y,_165,_166,_167){
_167=_167||this._style;
var rect=document.createElementNS(SVGCanvas.xmlns,"rect");
rect.setAttributeNS(null,"x",x);
rect.setAttributeNS(null,"y",y);
rect.setAttributeNS(null,"width",_165);
rect.setAttributeNS(null,"height",_166);
if(typeof (_167.cornerRadius)!="undefined"){
var r=(_166>_165)?_165*_167.cornerRadius:_166*_167.cornerRadius;
rect.setAttributeNS(null,"rx",r);
rect.setAttributeNS(null,"ry",r);
}
rect.setAttributeNS(null,"style",SVGCanvas.buildStyleString(_167));
this._element.appendChild(rect);
};
var _16a=document.namespaces;
if(_16a&&!_145){
var _16b=function(_16c){
return document.createElement("<ivml:"+_16c+" class=\"ivml\">");
};
document.createStyleSheet().addRule(".ivml","behavior:url(#default#VML)");
try{
if(!document.namespaces.ivml){
document.namespaces.add("ivml","urn:schemas-microsoft-com:vml");
}
}
catch(e){
_16b=function(_16d){
return document.createElement("<"+_16d+" xmlns=\"urn:schemas-microsoft.com:vml\" class=\"ivml\">");
};
}
}
function VMLCanvas(_16e,_16f){
var _170=_16b("group");
_170.style.position="absolute";
_170.style.top="0px";
_170.style.left="0px";
_170.style.width=_16e+"px";
_170.style.height=_16f+"px";
_170.coordsize=_16e+" "+_16f;
_170.coordorigin="1 1";
this._element=_170;
this._style={strokeColor:"#000000"};
}
VMLCanvas.createFillElement=function(_171){
var fill=_16b("fill");
if(typeof (_171.fillColor)!="undefined"){
fill.color=_171.fillColor;
if(typeof (_171.fillOpacity)!="undefined"){
fill.opacity=_171.fillOpacity;
}
}else{
fill.on=false;
}
return fill;
};
VMLCanvas.createStrokeElement=function(_173){
var _174=_16b("stroke");
if(typeof (_173.strokeColor)!="undefined"){
_174.color=_173.strokeColor;
if(typeof (_173.strokeOpacity)!="undefined"){
_174.opacity=_173.strokeOpacity;
}
if(typeof (_173.strokeWidth)!="undefined"){
_174.weight=_173.strokeWidth+"px";
}
}else{
_174.on=false;
}
return _174;
};
VMLCanvas.prototype.getElement=function(){
return this._element;
};
VMLCanvas.prototype.setStyle=function(_175){
this._style=_175;
};
VMLCanvas.prototype.drawCircle=function(cx,cy,_178,_179){
_179=_179||this._style;
this.drawOval(cx-_178,cy-_178,_178*2,_178*2,_179);
};
VMLCanvas.prototype.drawOval=function(x,y,_17c,_17d,_17e){
_17e=_17e||this._style;
var oval=_16b("oval");
oval.style.position="absolute";
oval.style.left=x;
oval.style.top=y;
oval.style.width=(_17c+1);
oval.style.height=(_17d+1);
oval.position="0 0";
oval.size=_17c+" "+_17d;
oval.appendChild(VMLCanvas.createFillElement(_17e));
oval.appendChild(VMLCanvas.createStrokeElement(_17e));
this._element.appendChild(oval);
};
VMLCanvas.prototype.drawPolyline=function(_180,_181,_182){
_182=_182||this._style;
var line=_16b("polyline");
line.style.position="absolute";
var _184="";
for(var i in _180){
_184+=_180[i]+" "+_181[i]+" ";
}
line.points=_184;
line.appendChild(VMLCanvas.createFillElement(_182));
var _186=VMLCanvas.createStrokeElement(_182);
_186.joinstyle="miter";
line.appendChild(_186);
this._element.appendChild(line);
};
VMLCanvas.prototype.drawPolygon=function(_187,_188,_189){
var _18a=[];
var _18b=[];
_18a.length=_18b.length=_187.length+1;
for(var i in _187){
_18a[i]=_187[i];
_18b[i]=_188[i];
}
_18a[_187.length]=_187[0];
_18b[_187.length]=_188[0];
this.drawPolyline(_18a,_18b,_189);
};
VMLCanvas.prototype.drawRect=function(x,y,_18f,_190,_191){
_191=_191||this._style;
var rect=_16b("roundrect");
rect.style.position="absolute";
rect.style.left=x;
rect.style.top=y;
rect.style.width=(_18f+1);
rect.style.height=(_190+1);
rect.arcsize=_191.cornerRadius||0;
rect.appendChild(VMLCanvas.createFillElement(_191));
var _193=VMLCanvas.createStrokeElement(_191);
_193.joinstyle="miter";
rect.appendChild(_193);
this._element.appendChild(rect);
};
function CanvasCanvas(_194,_195){
var _196=document.createElement("canvas");
_196.setAttribute("width",_194);
_196.setAttribute("height",_195);
this._element=_196;
this._style={strokeColor:"#000000"};
if(_196.getContext){
this._canvas=_196.getContext("2d");
}else{
throw new Error("No implementation supported.");
}
}
CanvasCanvas.createPolyPath=function(_197,_198,_199,_19a){
_199.beginPath();
_199.moveTo(_197[0],_198[0]);
for(var i=1;i<_197.length;++i){
_199.lineTo(_197[i],_198[i]);
}
if(_19a){
_199.closePath();
}
};
CanvasCanvas.drawPoly=function(_19c,_19d,_19e,_19f,_1a0){
if(typeof (_19f.fillColor)!="undefined"){
CanvasCanvas.createPolyPath(_19c,_19d,_19e,_1a0);
_19e.fillStyle=_19f.fillColor;
_19e.globalAlpha=(typeof (_19f.fillOpacity)!="undefined")?_19f.fillOpacity:1;
_19e.fill();
}
if(typeof (_19f.strokeColor)!="undefined"){
CanvasCanvas.createPolyPath(_19c,_19d,_19e,_1a0);
_19e.strokeStyle=_19f.strokeColor;
_19e.globalAlpha=(typeof (_19f.strokeOpacity)!="undefined")?_19f.strokeOpacity:1;
_19e.lineWidth=(typeof (_19f.strokeWidth)!="undefined")?_19f.strokeWidth:1;
_19e.stroke();
}
};
CanvasCanvas.prototype.getElement=function(){
return this._element;
};
CanvasCanvas.prototype.setStyle=function(_1a1){
this._style=_1a1;
};
CanvasCanvas.prototype.drawCircle=function(cx,cy,_1a4,_1a5){
_1a5=_1a5||this._style;
var _1a6=this._canvas;
_1a6.beginPath();
_1a6.arc(cx,cy,_1a4,0,2*Math.PI,true);
if(typeof (_1a5.fillColor)!="undefined"){
_1a6.beginPath();
_1a6.arc(cx,cy,_1a4,0,2*Math.PI,true);
_1a6.fillStyle=_1a5.fillColor;
_1a6.globalAlpha=(typeof (_1a5.fillOpacity)!="undefined")?_1a5.fillOpacity:1;
_1a6.fill();
}
if(typeof (_1a5.strokeColor)!="undefined"){
_1a6.beginPath();
_1a6.arc(cx,cy,_1a4,0,2*Math.PI,true);
_1a6.strokeStyle=_1a5.strokeColor;
_1a6.globalAlpha=(typeof (_1a5.strokeOpacity)!="undefined")?_1a5.strokeOpacity:1;
_1a6.lineWidth=(typeof (_1a5.strokeWidth)!="undefined")?_1a5.strokeWidth:1;
_1a6.stroke();
}
};
CanvasCanvas.prototype.drawOval=function(x,y,_1a9,_1aa,_1ab){
var _1ac=this._canvas;
if(_1a9<0.01||_1aa<0.01){
return;
}
var cx=x+_1a9/2;
var cy=(y+_1aa/2)*_1a9/_1aa;
_1ac.save();
_1ac.scale(1,_1aa/_1a9);
this.drawCircle(cx,cy,_1a9/2,_1ab);
_1ac.restore();
};
CanvasCanvas.prototype.drawPolyline=function(_1af,_1b0,_1b1){
_1b1=_1b1||this._style;
var _1b2=this._canvas;
CanvasCanvas.drawPoly(_1af,_1b0,_1b2,_1b1,false);
};
CanvasCanvas.prototype.drawPolygon=function(_1b3,_1b4,_1b5){
_1b5=_1b5||this._style;
var _1b6=this._canvas;
CanvasCanvas.drawPoly(_1b3,_1b4,_1b6,_1b5,true);
};
CanvasCanvas.prototype.drawRect=function(x,y,_1b9,_1ba,_1bb){
_1bb=_1bb||this._style;
var _1bc=this._canvas;
if(typeof (_1bb.fillColor)!="undefined"){
_1bc.fillStyle=_1bb.fillColor;
_1bc.globalAlpha=(typeof (_1bb.fillOpacity)!="undefined")?_1bb.fillOpacity:1;
_1bc.fillRect(x,y,_1b9,_1ba);
}
if(typeof (_1bb.strokeColor)!="undefined"){
_1bc.strokeStyle=_1bb.strokeColor;
_1bc.globalAlpha=(typeof (_1bb.strokeOpacity)!="undefined")?_1bb.strokeOpacity:1;
_1bc.lineWidth=(typeof (_1bb.strokeWidth)!="undefined")?_1bb.strokeWidth:1;
_1bc.strokeRect(x,y,_1b9,_1ba);
}
};
function createCanvas(_1bd,_1be,_1bf){
if(_1bf){
var _1c0=_1bf.toLowerCase();
if(_1c0=="svg"){
return new SVGCanvas(_1bd,_1be);
}else{
if(_1c0=="vml"){
return new VMLCanvas(_1bd,_1be);
}else{
if(_1c0=="canvas"){
return new CanvasCanvas(_1bd,_1be);
}
}
}
throw new Error("No such implementation.");
}else{
if(_145){
return new SVGCanvas(_1bd,_1be);
}else{
if(_16a){
return new VMLCanvas(_1bd,_1be);
}
}
return new CanvasCanvas(_1bd,_1be);
}
}
return {create:createCanvas};
})();
ravegeo.internal.MapAnimator=(function(){
var _1c1=25;
var _1c2=2000;
var _1c3=function(map){
this._map=map;
};
_1c3.prototype._animateTo=function(_1c5,_1c6){
var pfc=this._map._getPixelsFromCenter(_1c5-this._map._geoX,_1c6-this._map._geoY);
var _1c8=Math.sqrt(pfc.x*pfc.x+pfc.y*pfc.y)*1.25;
if(this._lastTimeout){
clearTimeout(this._lastTimeout);
}
if(_1c8<_1c2&&_1c8>_1c1){
if(!this._myAnimatorFunc){
var self=this;
this._myAnimatorFunc=function(){
self._doAnimate();
};
}
this._animDestX=-pfc.x;
this._animDestY=pfc.y;
this._animDoneX=0;
this._animDoneY=0;
this._animTime=_1c8;
this._animStart=new Date().getTime();
this._myAnimatorFunc();
}else{
this._map._setGeoCenter(_1c5,_1c6);
}
};
_1c3.prototype._stop=function(){
if(this._lastTimeout){
clearTimeout(this._lastTimeout);
this._lastTimeout=null;
}
};
_1c3.prototype._doAnimate=function(){
var _1ca=(new Date().getTime()-this._animStart)/this._animTime;
if(_1ca>1){
this._map._interactionEnded();
delete this._lastTimeout;
}else{
var doX=Math.round(this._animDestX*_1ca-this._animDoneX);
var doY=Math.round(this._animDestY*_1ca-this._animDoneY);
this._animDoneX+=doX;
this._animDoneY+=doY;
this._map._pixMove(doX,doY);
this._lastTimeout=setTimeout(this._myAnimatorFunc,10);
}
};
return _1c3;
})();
ravegeo.TiledMap=(function(){
var _1cd=ravegeo.internal.Utilities;
var _1ce=null;
var _1cf=0;
var _1d0=0;
var _1d1=0;
var _1d2=0;
function mouseMoved(e){
var _1d4=_1ce;
if(_1d4){
var _1d5=e.clientX-_1cf;
var _1d6=e.clientY-_1d0;
if(_1d5>1||_1d5<-1||_1d6>1||_1d6<-1){
_1cf=e.clientX;
_1d0=e.clientY;
_1d4._pixMove(_1d5,_1d6);
}
}
}
function mouseUp(e){
var _1d8=_1ce;
if(_1cd.leftButton(e)&&_1d8!==null){
var _1d9=e.clientX-_1cf;
var _1da=e.clientY-_1d0;
if(_1d9!=0||_1da!=0){
_1d8._pixMove(_1d9,_1da);
}
_1ce=null;
if(_1d1==e.clientX&&_1d2==e.clientY){
var _1db=_1d8._callback;
if(_1db&&_1db.mapClicked){
var dx=_1cd.mouseX(e)-_1cd.topLeftX(_1d8._outerDiv)-_1d8._mapWidth/2;
var dy=_1cd.mouseY(e)-_1cd.topLeftY(_1d8._outerDiv)-_1d8._mapHeight/2;
var x=_1d8._geoX+dx*(_1d8._zoomStepExtents[_1d8._zoomStep][0]/_1d8._tileWidthPix);
var y=_1d8._geoY-dy*(_1d8._zoomStepExtents[_1d8._zoomStep][1]/_1d8._tileHeightPix);
if(ravegeo._projector){
var p=ravegeo._projector.reverse(x,y);
x=p[0];
y=p[1];
}
_1db.mapClicked(_1d8,x,y);
}
}
_1d8._interactionEnded();
}
}
var _1e1=function(_1e2){
if(ravegeo._projector){
delete ravegeo._projector;
}
if(_1e2._tiledProjector){
ravegeo._projector=_1e2._tiledProjector;
}
this._url=_1e2.url;
this._name=_1e2.name;
this._key=_1e2.key;
this._tileCacherUrl=_1e2._tileServiceUrl+"GetTile?name="+_1e2._tileServiceName;
this._callback=_1e2.callback;
this._mapContainer=_1e2.mapContainer;
this._expireDate=_1e2._expireDate;
this._loadingImageUrl=this._url+"GetLoadingImage?name="+this._name;
if(typeof _1e2.interactionDelay!="undefined"){
this._interactionDelay=_1e2.interactionDelay;
if(this._interactionDelay>ravegeo.internal.MapCommons.maxInteractionDelay||this._interactionDelay<0){
this._interactionDelay=ravegeo.internal.MapCommons.maxInteractionDelay;
}
}else{
this._interactionDelay=ravegeo.internal.MapCommons.defaultInteractionDelay;
}
var _1e3=_1e2.tilesConfiguration;
this._originX=_1e3.originX;
this._originY=_1e3.originY;
this._nominalToMeter=_1e3.nominalToMeter;
this._tileWidthPix=_1e3.tileWidthPix;
this._tileHeightPix=_1e3.tileHeightPix;
this._zoomStepExtents=_1e3.zoomStepExtents;
var geoX=this._originX;
var geoY=this._originY;
this._zoomStep=0;
if(_1e2.initialViewArea){
var iva=_1e2.initialViewArea;
geoX=iva.x;
geoY=iva.y;
if(ravegeo._projector){
var p=ravegeo._projector.forward(iva.x,iva.y);
geoX=p[0];
geoY=p[1];
}
this._zoomStep=this._scale2ClosestZoomStep(iva.scale);
}
_1cd.addEvent(document,"mousemove",mouseMoved,false);
_1cd.addEvent(document,"mouseup",mouseUp,false);
this._layers={};
this._nextLayerId=0;
_1cd.removeChildren(this._mapContainer);
this._outerDiv=document.createElement("div");
var _1e8=this._outerDiv;
_1cd.setStyle(_1e8,"position:absolute;top:0px;left:0px;overflow:hidden;cursor:move;");
this._tileLayer=new ravegeo.internal.TileLayer(this);
var _1e9=document.createElement("div");
_1cd.setStyle(_1e9,"width:100%;height:100%;position:relative;overflow:hidden;");
_1e9.appendChild(_1e8);
if(_1e3.copyright){
var _1ea=document.createElement("div");
_1ea.innerHTML=_1e3.copyright;
_1cd.setStyle(_1ea,"color:black;position:absolute;left:4px;bottom:4px;z-index:1000;cursor:text;");
_1e8.appendChild(_1ea);
}
this._layout(geoX,geoY);
this._mapContainer.appendChild(_1e9);
this._animator=new ravegeo.internal.MapAnimator(this);
_1e2.callback.mapLoaded(this);
};
_1e1.initiateCreation=function(_1eb){
ravegeo.internal.MapCommons._fixParams(_1eb);
var url=_1eb.url+"GetHandle?name="+_1eb.name;
if(_1eb.key){
url+="&key="+_1eb.key;
}
url+="&referer="+encodeURIComponent(window.location);
ravegeo.io.Ajax.asyncJsonRequest(url,function(_1ed){
initiateCreationStep2(_1eb,_1ed);
},ravegeo.internal.MapCommons.getHandleTimeout);
};
function initiateCreationStep2(_1ee,_1ef){
if(_1ef.error){
errorOccurredDuringInit(_1ef.error,_1ee);
return;
}
if(_1ef.tileServiceUrl){
_1ee._tileServiceUrl=_1ef.tileServiceUrl;
}else{
_1ee._tileServiceUrl=_1ee.url;
}
if(_1ef.tileServiceName){
_1ee._tileServiceName=_1ef.tileServiceName;
}else{
_1ee._tileServiceName=_1ee.name;
}
_1ee._expireDate=new Date();
_1ee._expireDate.setTime(_1ee._expireDate.getTime()+_1ef.timeout);
ravegeo.io.Ajax.asyncJsonRequest(_1ee._tileServiceUrl+"GetTilesInfo?name="+_1ee._tileServiceName,function(_1f0){
initiateCreationStep3(_1ee,_1f0);
},ravegeo.internal.MapCommons.getTilesInfoTimeout);
}
function initiateCreationStep3(_1f1,_1f2){
if(_1f2.error){
errorOccurredDuringInit(_1f2.error,_1f1);
return;
}
_1f1.tilesConfiguration=_1f2;
var temp=new _1e1(_1f1);
}
function errorOccurredDuringInit(_1f4,_1f5){
errorOccurred(_1f4.code,_1f4.message,_1f5.mapContainer,_1f5.callback);
}
function errorOccurred(code,_1f7,_1f8,_1f9){
if(_1f8){
_1f8.innerHTML="Fatal error: "+code+"<br>"+_1f7;
}
if(_1f9&&_1f9.errorOccurred){
_1f9.errorOccurred(code,_1f7);
}
}
_1e1.prototype._layout=function(_1fa,_1fb){
this._mapWidth=this._mapContainer.clientWidth;
this._mapHeight=this._mapContainer.clientHeight;
this._outerDiv.style.width=this._mapWidth+"px";
this._outerDiv.style.height=this._mapHeight+"px";
this._geoX=_1fa;
this._geoY=_1fb;
this._tileLayer._layout(_1fa,_1fb,this._mapWidth,this._mapHeight);
for(var _1fc in this._layers){
var _1fd=this._layers[_1fc];
_1fd._layout(_1fa,_1fb,this._mapWidth,this._mapHeight);
}
};
_1e1.prototype._updateExpireDate=function(){
if(this._expireDate<new Date()){
var self=this;
var url=this._url+"GetHandle?name="+this._name;
if(this._key){
url+="&key="+this._key;
}
ravegeo.io.Ajax.asyncJsonRequest(url,function(_200){
if(_200.error){
errorOccurred(_200.error.code,_200.error.message,self._mapContainer,self._callback);
return;
}
var _201=_200.timeout;
self._expireDate=new Date();
self._expireDate.setTime(self._expireDate.getTime()+_201);
},ravegeo.internal.Debug.getHandleTimeout);
}
};
_1e1.prototype._getPixelsFromCenter=function(geoX,geoY){
var _204=this._tileWidthPix/this._zoomStepExtents[this._zoomStep][0];
var _205=this._tileHeightPix/this._zoomStepExtents[this._zoomStep][1];
return {x:Math.round(geoX*_204),y:Math.round(geoY*_205)};
};
_1e1.prototype._interactionEnded=function(){
if(this._cbTimeout){
clearTimeout(this._cbTimeout);
}
var self=this;
this._cbTimeout=setTimeout(function(){
self._updateExpireDate();
if(self._callback&&self._callback.interactionEnded){
self._callback.interactionEnded(self);
}
self._cbTimeout=null;
},this._interactionDelay);
};
_1e1.prototype._setGeoCenter=function(_207,_208,_209){
var _20a=false;
if(typeof (_209)!="undefined"){
_20a=this._changeZoomStep(_209);
}
if(this._geoX!=_207||this._geoY!=_208||_20a){
this._geoX=_207;
this._geoY=_208;
this._tileLayer._setGeoCenter(_207,_208);
for(var _20b in this._layers){
this._layers[_20b]._setGeoCenter(_207,_208);
}
}
};
_1e1.prototype._changeZoomStep=function(zs){
if(zs>=0&&zs<this._zoomStepExtents.length&&zs!=this._zoomStep){
this._zoomStep=zs;
return true;
}
return false;
};
_1e1.prototype._pixMove=function(x,y){
this._geoX-=x*(this._zoomStepExtents[this._zoomStep][0]/this._tileWidthPix);
this._geoY+=y*(this._zoomStepExtents[this._zoomStep][1]/this._tileHeightPix);
this._tileLayer._pixMove(x,y);
for(var _20f in this._layers){
var _210=this._layers[_20f];
_210._pixMove(x,y);
}
};
_1e1.prototype._zoomStep2Scale=function(zs){
return Math.round(this._zoomStepExtents[zs][1]*this._nominalToMeter/(this._tileHeightPix*0.0003));
};
_1e1.prototype._scale2ClosestZoomStep=function(_212){
var _213=this._zoomStep2Scale(0);
var _214=0;
for(var i=1;i<this._zoomStepExtents.length;++i){
var _216=this._zoomStep2Scale(i);
if(Math.abs(_216-_212)<Math.abs(_213-_212)){
_213=_216;
_214=i;
}else{
break;
}
}
return _214;
};
_1e1.prototype._getGeoWidth=function(_217){
return this._zoomStepExtents[_217][0]/this._tileWidthPix*this._mapWidth;
};
_1e1.prototype._getGeoHeight=function(_218){
return this._zoomStepExtents[_218][1]/this._tileHeightPix*this._mapHeight;
};
_1e1.prototype.getCenterX=function(){
if(ravegeo._projector){
var p=ravegeo._projector.reverse(this._geoX,this._geoY);
return p[0];
}
return this._geoX;
};
_1e1.prototype.getCenterY=function(){
if(ravegeo._projector){
var p=ravegeo._projector.reverse(this._geoX,this._geoY);
return p[1];
}
return this._geoY;
};
_1e1.prototype.getScale=function(){
return this._zoomStep2Scale(this._zoomStep);
};
_1e1.prototype.getGeoBounds=function(){
var rect=this._getGeoBounds(this._zoomStep);
if(ravegeo._projector){
var pmin=ravegeo._projector.reverse(rect.xMin,rect.yMin);
var pmax=ravegeo._projector.reverse(rect.xMax,rect.yMax);
rect.xMin=pmin[0];
rect.yMin=pmin[1];
rect.xMax=pmax[0];
rect.yMax=pmax[1];
}
return rect;
};
_1e1.prototype._getGeoBounds=function(_21e){
var _21f=this._getGeoWidth(_21e);
var _220=this._getGeoHeight(_21e);
return {xMin:this._geoX-_21f/2,yMin:this._geoY-_220/2,xMax:this._geoX+_21f/2,yMax:this._geoY+_220/2};
};
_1e1.prototype.setGeoBounds=function(_221){
if(ravegeo._projector){
var minp=ravegeo._projector.forward(_221.xMin,_221.yMin);
var maxp=ravegeo._projector.forward(_221.xMax,_221.yMax);
_221={xMin:minp[0],yMin:minp[1],xMax:maxp[0],yMax:maxp[1]};
}
var cx=(_221.xMax+_221.xMin)/2;
var cy=(_221.yMax+_221.yMin)/2;
var _226=this._getFittingZoomStep(Math.abs(_221.xMax-_221.xMin),Math.abs(_221.yMax-_221.yMin));
this._setGeoCenter(cx,cy,_226);
};
_1e1.prototype._getFittingZoomStep=function(_227,_228){
for(var i=0;i<this._zoomStepExtents.length;++i){
var _22a=this._getGeoWidth(i);
var _22b=this._getGeoHeight(i);
if(_227<=_22a&&_228<=_22b){
return i;
}
}
return this._zoomStepExtents.length-1;
};
_1e1.prototype.getRecommendedScales=function(){
var ret=[];
for(var zs in this._zoomStepExtents){
ret[zs]=this._zoomStep2Scale(zs);
}
return ret;
};
_1e1.prototype.setViewArea=function(x,y,_230){
x=parseFloat(x);
y=parseFloat(y);
if(ravegeo._projector){
var p=ravegeo._projector.forward(x,y);
x=p[0];
y=p[1];
}
var _232=this._scale2ClosestZoomStep(_230);
this._setGeoCenter(x,y,_232);
};
_1e1.prototype.zoom=function(_233){
if(_233<1){
this._setGeoCenter(this._geoX,this._geoY,this._zoomStep-1);
}else{
if(_233>1){
this._setGeoCenter(this._geoX,this._geoY,this._zoomStep+1);
}
}
};
_1e1.prototype.zoomTo=function(_234){
var _235=this._scale2ClosestZoomStep(_234);
this._setGeoCenter(this._geoX,this._geoY,_235);
};
_1e1.prototype.pan=function(dx,dy){
var _238=this._zoomStepExtents[this._zoomStep][0]/this._tileWidthPix;
var _239=this._zoomStepExtents[this._zoomStep][1]/this._tileHeightPix;
this._animator._animateTo(this._geoX+_238*this._mapWidth*dx,this._geoY+_238*this._mapHeight*dy);
};
_1e1.prototype._showBounds=function(_23a,_23b,_23c){
var _23d=this._scale2ClosestZoomStep(_23c);
if(_23a.x!=Number.POSITIVE_INFINITY){
var _23e=(_23b.x-_23a.x)*1.15;
var _23f=(_23b.y-_23a.y)*1.15;
var i;
for(i=0;i<this._zoomStepExtents.length;++i){
var _241=this._zoomStepExtents[i][0]/this._tileWidthPix*this._mapWidth;
var _242=this._zoomStepExtents[i][1]/this._tileHeightPix*this._mapHeight;
if(_241>_23e&&_242>_23f){
break;
}
}
var _243=_23a.x+(_23b.x-_23a.x)/2;
var _244=_23a.y+(_23b.y-_23a.y)/2;
if(i>_23d){
_23d=i;
}
if(_23d!=this._zoomStep){
this._setGeoCenter(_243,_244,_23d);
}else{
this._animateTo(_243,_244);
}
}else{
if(_23d>this._zoomStep){
this._setGeoCenter(this._geoX,this._geoY,_23d);
}
}
};
_1e1.prototype.moveTo=function(x,y,_247){
if(this.getScale()==_247){
if(ravegeo._projector){
var p=ravegeo._projector.forward(x,y);
x=p[0];
y=p[1];
}
this._animateTo(x,y);
}else{
this.setViewArea(x,y,_247);
}
};
_1e1.prototype.resize=function(_249,_24a){
this._mapContainer.style.width=_249+"px";
this._mapContainer.style.height=_24a+"px";
this._layout(this._geoX,this._geoY);
};
_1e1.prototype.newLayer=function(opts){
var _24c=this._nextLayerId++;
var _24d=new ravegeo.internal.GeoObjectLayer(_24c,this,opts);
_24d._layout(this._geoX,this._geoY,this._mapWidth,this._mapHeight);
this._layers[_24c]=_24d;
return _24d;
};
_1e1.prototype.removeLayer=function(_24e){
var _24f=_24e._id;
_24e._destroy();
delete this._layers[_24f];
};
_1e1._mouseDown=function(e){
if(_1cd.leftButton(e)){
var _251=_1cd.getTarget(e);
if(_251._tile){
_1ce=_251._tile.owner._map;
_1ce._animator._stop();
_1d1=_1cf=e.clientX;
_1d2=_1d0=e.clientY;
}
_1cd.stopEvent(e);
}
};
return _1e1;
})();
ravegeo.internal.Tile=(function(){
var Tile=function(_253,dtx,dty){
this.owner=_253;
this._dtx=dtx;
this._dty=dty;
this.img=document.createElement("img");
var img=this.img;
img.style.position="absolute";
img.style.MozUserSelect="none";
img.style.width=_253._tileWidthPix+"px";
img.style.height=_253._tileHeightPix+"px";
img.style.left=((_253._numberOfTiles.x/2*_253._tileWidthPix)+this._dtx*_253._tileWidthPix)+"px";
img.style.top=((_253._numberOfTiles.y/2*_253._tileHeightPix)-(this._dty+1)*_253._tileHeightPix)+"px";
img.oncontextmenu=function(e){
return false;
};
img._tile=this;
ravegeo.internal.Utilities.addEvent(img,"mousedown",ravegeo.TiledMap._mouseDown,false);
ravegeo.internal.Utilities.addEvent(img,"dragstart",ravegeo.internal.Utilities.stopEvent,false);
};
function onImageLoad(){
var _258=this._tile;
this._tile=null;
_258.img.src=_258.newImage.src;
_258.img.onload=null;
}
Tile.prototype._updateImage=function(){
var _259=this.owner._map._tileCacherUrl;
_259+="&tx="+(this._dtx+this.owner._ctx);
_259+="&ty="+(-this._dty+this.owner._cty);
_259+="&zoomStep="+this.owner._map._zoomStep;
if(this.newImage){
this.newImage.onload=null;
this.newImage.src=null;
this.newImage._tile=null;
}
this.newImage=new Image(5,5);
this.newImage.src=_259;
if(!ravegeo.internal.Utilities.isImageLoaded(this.newImage)){
this.newImage._tile=this;
this.img.src=this.owner._map._loadingImageUrl;
ravegeo.internal.Utilities.onImageLoaded(this.newImage,onImageLoad);
}else{
this.img.src=_259;
}
};
Tile.prototype._position=function(){
this.img.style.left=(this._dtx*this.owner._tileWidthPix)+"px";
this.img.style.top=(this._dty*this.owner._tileHeightPix)+"px";
};
Tile.prototype._wrap=function(dtx,dty){
this._dtx+=dtx;
this._dty+=dty;
var _25c=false;
var _25d=this.owner._allowedTilePositions;
if(this._dtx<_25d.min.x){
this._dtx+=this.owner._numberOfTiles.x;
_25c=true;
}else{
if(this._dtx>_25d.max.x){
this._dtx-=this.owner._numberOfTiles.x;
_25c=true;
}
}
if(this._dty<_25d.min.y){
this._dty+=this.owner._numberOfTiles.y;
_25c=true;
}else{
if(this._dty>_25d.max.y){
this._dty-=this.owner._numberOfTiles.y;
_25c=true;
}
}
if(_25c){
this._updateImage();
}
this._position();
};
return Tile;
})();
ravegeo.internal.TileLayer=(function(){
var _25e=function(map){
this._map=map;
this._tileWidthPix=map._tileWidthPix;
this._tileHeightPix=map._tileHeightPix;
this._myDiv=document.createElement("div");
ravegeo.internal.Utilities.setStyle(this._myDiv,"position:absolute;overflow:visible;width:10px;height:10px;");
map._outerDiv.appendChild(this._myDiv);
};
_25e.prototype._layout=function(_260,_261,_262,_263){
this._numberOfTiles={x:Math.ceil(_262/this._tileWidthPix)+1,y:Math.ceil(_263/this._tileHeightPix)+1};
var _264=_262/2;
var _265=_263/2;
this._wrapLimit={min:{},max:{}};
if(this._numberOfTiles.x%2==0){
this._wrapLimit.max.x=(this._tileWidthPix*this._numberOfTiles.x)/2-_264;
this._wrapLimit.min.x=-this._wrapLimit.max.x;
}else{
this._wrapLimit.max.x=(this._tileWidthPix*(this._numberOfTiles.x-1))/2-_264;
this._wrapLimit.min.x=-this._wrapLimit.max.x-this._tileWidthPix;
}
if(this._numberOfTiles.y%2==0){
this._wrapLimit.max.y=(this._tileHeightPix*this._numberOfTiles.y)/2-_265;
this._wrapLimit.min.y=-this._wrapLimit.max.y;
}else{
this._wrapLimit.max.y=(this._tileHeightPix*(this._numberOfTiles.y-1))/2-_265;
this._wrapLimit.min.y=-this._wrapLimit.max.y-this._tileHeightPix;
}
this._originalLeft=Math.floor(_262/2);
this._originalTop=Math.floor(_263/2);
this._tiles=[];
ravegeo.internal.Utilities.removeChildren(this._myDiv);
var _266=-Math.floor(this._numberOfTiles.x/2);
var _267=-Math.floor(this._numberOfTiles.y/2);
this._allowedTilePositions={min:{x:_266,y:_267},max:{x:_266+this._numberOfTiles.x-1,y:_267+this._numberOfTiles.y-1}};
for(var i=this._allowedTilePositions.min.x;i<=this._allowedTilePositions.max.x;++i){
for(var j=this._allowedTilePositions.min.y;j<=this._allowedTilePositions.max.y;++j){
var tile=new ravegeo.internal.Tile(this,i,j);
this._tiles[this._tiles.length]=tile;
this._myDiv.appendChild(tile.img);
}
}
this._positionAllTiles(_260,_261);
};
_25e.prototype._setGeoCenter=function(_26b,_26c){
this._positionAllTiles(_26b,_26c);
};
_25e.prototype._positionAllTiles=function(_26d,_26e){
var pfc=this._map._getPixelsFromCenter(this._map._originX-_26d,this._map._originY-_26e);
this._dx=pfc.x%this._tileWidthPix;
this._dy=-pfc.y%this._tileHeightPix;
if(pfc.x<0){
this._ctx=-Math.ceil(pfc.x/this._tileWidthPix);
}else{
this._ctx=-Math.floor(pfc.x/this._tileWidthPix);
}
if(pfc.y<0){
this._cty=-Math.ceil(pfc.y/this._tileHeightPix)-1;
}else{
this._cty=-Math.floor(pfc.y/this._tileHeightPix)-1;
}
for(var i=0;i<this._tiles.length;++i){
this._tiles[i]._updateImage();
this._tiles[i]._position();
}
this._wrapIfNecessary();
this._positionDiv();
this._map._interactionEnded();
};
_25e.prototype._positionDiv=function(){
this._myDiv.style.left=(this._originalLeft+this._dx)+"px";
this._myDiv.style.top=(this._originalTop+this._dy)+"px";
};
_25e.prototype._pixMove=function(x,y){
this._dx+=x;
this._dy+=y;
this._wrapIfNecessary();
this._positionDiv();
};
_25e.prototype._wrapIfNecessary=function(){
if(this._shouldWrap()){
var dtx=0;
if(this._dx<this._wrapLimit.min.x){
dtx=Math.min(Math.ceil(this._dx/this._tileWidthPix),-1);
}else{
if(this._dx>this._wrapLimit.max.x){
dtx=Math.max(Math.ceil(this._dx/this._tileWidthPix),1);
}
}
var dty=0;
if(this._dy<this._wrapLimit.min.y){
dty=Math.min(Math.ceil(this._dy/this._tileHeightPix),-1);
}else{
if(this._dy>this._wrapLimit.max.y){
dty=Math.max(Math.ceil(this._dy/this._tileHeightPix),1);
}
}
this._wrap(dtx,dty);
}
};
_25e.prototype._shouldWrap=function(){
var _275=this._dx>this._wrapLimit.max.x||this._dx<this._wrapLimit.min.x;
var _276=this._dy>this._wrapLimit.max.y||this._dy<this._wrapLimit.min.y;
return _275||_276;
};
_25e.prototype._wrap=function(dtx,dty){
this._ctx-=dtx;
this._cty+=dty;
this._dx-=this._tileWidthPix*dtx;
this._dy-=this._tileHeightPix*dty;
for(var i=0;i<this._tiles.length;++i){
this._tiles[i]._wrap(dtx,dty);
}
};
return _25e;
})();
ravegeo.internal.GeoObjectLayer=(function(){
var _27a={borderColor:"#000000",backgroundColor:"#7f7f7f",textColor:"#ffffff"};
var _27b={borderColor:"#7f7f7f",backgroundColor:"#ffffff",textColor:"#000000"};
var _27c=function(id,map,opts){
this._id=id;
this._map=map;
if(typeof (opts)=="undefined"){
opts={};
}
this._textStyle=fixStyle(opts.textStyle,_27a);
this._labelStyle=fixStyle(opts.labelStyle,_27b);
this._labelsAboveSymbols=opts.labelsAboveSymbols;
this._highlightColor=opts.highlightColor;
if(!this._highlightColor){
this._highlightColor="#ff0000";
}
this._geoObjects={};
this._layerDiv=document.createElement("div");
ravegeo.internal.Utilities.setStyle(this._layerDiv,"position:absolute;z-index:"+(50+id)+";overflow:visible;width:0px;height:0px;");
map._outerDiv.appendChild(this._layerDiv);
};
function fixStyle(_280,_281){
if(!_280){
_280={};
}
if(!_280.borderColor){
_280.borderColor=_281.borderColor;
}
if(!_280.backgroundColor){
_280.backgroundColor=_281.backgroundColor;
}
if(!_280.textColor){
_280.textColor=_281.textColor;
}
return _280;
}
_27c.prototype._layout=function(_282,_283,_284,_285){
this._pixMapCenter={left:Math.round(_284/2),top:Math.round(_285/2)};
this._setGeoCenter(_282,_283);
};
_27c.prototype._setGeoCenter=function(_286,_287){
this._geoCenter={x:_286,y:_287};
this._layerPixPosition={left:this._pixMapCenter.left,top:this._pixMapCenter.top};
this._positionLayerDiv();
this._positionGeoObjects();
};
_27c.prototype._positionLayerDiv=function(){
this._layerDiv.style.left=this._layerPixPosition.left+"px";
this._layerDiv.style.top=this._layerPixPosition.top+"px";
};
_27c.prototype._positionGeoObjects=function(){
for(var _288 in this._geoObjects){
var _289=this._geoObjects[_288];
_289._position(this._geoCenter,this._getGeoToPixels());
}
};
_27c.prototype._positionGeoObject=function(_28a){
_28a._position(this._geoCenter,this._getGeoToPixels());
};
_27c.prototype._getGeoToPixels=function(){
return {x:this._map._tileWidthPix/this._map._zoomStepExtents[this._map._zoomStep][0],y:this._map._tileHeightPix/this._map._zoomStepExtents[this._map._zoomStep][1]};
};
_27c.prototype._pixMove=function(dx,dy){
this._layerPixPosition.left+=dx;
this._layerPixPosition.top+=dy;
this._positionLayerDiv();
};
_27c.prototype._destroy=function(){
this.clear();
this._map._outerDiv.removeChild(this._layerDiv);
delete this._layerDiv;
};
_27c.prototype.clear=function(){
for(var id in this._geoObjects){
this._geoObjects[id]._destroy();
}
this._geoObjects={};
};
_27c.prototype.addGeoObjects=function(objs){
for(var idx in objs){
var obj=objs[idx];
obj._project();
var _291=this._geoObjects[obj.id];
obj._tiledMapInit(this,_291);
if(_291){
_291._destroy();
}
this._geoObjects[obj.id]=obj;
}
};
_27c.prototype.getGeoObjectIds=function(_292){
var ret=[];
var id;
if(_292){
var _295=this._map.getGeoBounds();
for(id in this._geoObjects){
var _296=this._geoObjects[id];
if(_296._isInside(_295.xMin,_295.yMin,_295.xMax,_295.yMax)){
ret[ret.length]=id;
}
}
}else{
for(id in this._geoObjects){
ret[ret.length]=id;
}
}
return ret;
};
_27c.prototype.getGeoObject=function(id){
var ret=this._geoObjects[id];
if(typeof (ret)=="undefined"){
return null;
}
return ret;
};
_27c.prototype.removeGeoObjects=function(ids){
for(var idx in ids){
var id=ids[idx];
this._geoObjects[id]._destroy();
delete this._geoObjects[id];
}
};
_27c.prototype.setVisible=function(_29c){
if(typeof (_29c)=="undefined"||_29c){
this._layerDiv.style.visibility="visible";
}else{
this._layerDiv.style.visibility="hidden";
}
};
_27c.prototype.showGeoObjects=function(_29d){
var _29e={x:Number.POSITIVE_INFINITY,y:Number.POSITIVE_INFINITY};
var _29f={x:Number.NEGATIVE_INFINITY,y:Number.NEGATIVE_INFINITY};
for(var id in this._geoObjects){
var obj=this._geoObjects[id];
obj._expandBounds(_29e,_29f);
}
this._map._showBounds(_29e,_29f,_29d);
};
_27c.prototype.highlightGeoObject=function(id,_2a3){
var _2a4=this._geoObjects[id];
if(!_2a3){
_2a3={};
}
var map=this._map;
if(map._highlightedGeoObject){
map._highlightedGeoObject._removeHighlight();
delete map._highlightedGeoObject;
}
if(_2a4){
if(_2a4._notYetLoaded){
_2a4._doHighlight=_2a3;
}
if(typeof (_2a3.center)!="string"){
_2a3.center="";
}
if(!_2a3.showText){
_2a3.showText=false;
}
if(!_2a3.showHighlight){
_2a3.showHighlight=false;
}
_2a4._setHighlight(_2a3.showText,_2a3.showHighlight);
map._highlightedGeoObject=_2a4;
var _2a6=_2a3.center.toLowerCase();
var _2a7;
if(_2a6=="whennotshowing"){
var _2a8=(map._mapWidth*0.43)*(map._zoomStepExtents[map._zoomStep][0]/map._tileWidthPix);
var _2a9=(map._mapHeight*0.43)*(map._zoomStepExtents[map._zoomStep][1]/map._tileHeightPix);
var minx=map._geoX-_2a8;
var miny=map._geoY-_2a9;
var maxx=map._geoX+_2a8;
var maxy=map._geoY+_2a9;
_2a7=_2a4._getCenter();
if(_2a7.x<minx||_2a7.x>maxx||_2a7.y<miny||_2a7.y>maxy){
map._animateTo(_2a7.x,_2a7.y);
}
}else{
if(_2a6!="never"){
_2a7=_2a4._getCenter();
map._animateTo(_2a7.x,_2a7.y);
}
}
}
};
return _27c;
})();
ravegeo.WebMap=(function(){
var _2ae={};
_2ae.initiateCreation=function(_2af){
if(ravegeo.AppletMap){
if(ravegeo.internal.Environment.isJavaWellSupported()){
_2af._appletTimeoutCallback=function(){
ravegeo.TiledMap.initiateCreation(_2af);
};
_2af._maxAppletLoadTime=20000;
ravegeo.AppletMap.initiateCreation(_2af);
}else{
ravegeo.TiledMap.initiateCreation(_2af);
}
}else{
if(ravegeo.TiledMap){
ravegeo.TiledMap.initiateCreation(_2af);
}else{
throw new Error("Can not show map.");
}
}
};
_2ae.version=ravegeo.internal.MapCommons.version;
return _2ae;
})();

var fixParams=function(_1){
_1.url="http://maps.labs.ericsson.net/ravegeo/webmap2/";
_1._tiledProjector=ravegeo.MercatorProjector;
if(_1.callback){
_1._callback=_1.callback;
}
if(!_1.name){
_1.name="Default";
}
if(!_1.initialViewArea){
_1.initialViewArea={x:12.0203,y:57.73375,scale:25000000};
}
};
ericsson=ravegeo;
ericsson.WebMap._initiateCreation=ericsson.WebMap.initiateCreation;
ericsson.WebMap.initiateCreation=function(_2){
var _3=fixParams(_2);
this._initiateCreation(_2);
return _3;
};
ericsson.AppletMap._initiateCreation=ericsson.AppletMap.initiateCreation;
ericsson.AppletMap.initiateCreation=function(_4){
var _5=fixParams(_4);
this._initiateCreation(_4);
return _5;
};
ericsson.TiledMap._initiateCreation=ericsson.TiledMap.initiateCreation;
ericsson.TiledMap.initiateCreation=function(_6){
var _7=fixParams(_6);
this._initiateCreation(_6);
return _7;
};