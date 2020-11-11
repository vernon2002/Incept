var can1=document.getElementById("can1");
var can2=document.getElementById("can2");
var can3=document.getElementById("can3");
var can4=document.getElementById("can4");
var can5=document.getElementById("can5");
var show ;
var hide ;
var hidden ;

function uploads(){
 var input_s=document.getElementById("imgs");
 show = new SimpleImage(input_s);
 show.drawTo(can1);
}
function uploadh(){
 var input_h=document.getElementById("imgh"); 
 hide = new SimpleImage(input_h);
 hide.drawTo(can2);
}
function uploade(){
 var input_e=document.getElementById("imge"); 
 hidden = new SimpleImage(input_e);
 hidden.drawTo(can4);
}


function bits(val){
return Math.floor(val/16)*16;
}

function chop(){
  for(var px of show.values()){
    px.setRed(bits(px.getRed()));
    px.setGreen(bits(px.getGreen()));
    px.setBlue(bits(px.getBlue()));
    }  
  return show;
}

function shift(){
for(var px of hide.values()){
  px.setRed(px.getRed()/16);
  px.setGreen(px.getGreen()/16);
  px.setBlue(px.getBlue()/16);
  }
  return hide;
}

function combine (show,hide){
  var result = new SimpleImage(show.getWidth(),show.getHeight());
  for (var px of result.values()){
    var x = px.getX();
    var y = px.getY();
    var showpx = show.getPixel(x,y);
    var hidepx = hide.getPixel(x,y);
    px.setRed(showpx.getRed()+hidepx.getRed());
    px.setGreen(showpx.getGreen()+hidepx.getGreen());
    px.setBlue(showpx.getBlue()+hidepx.getBlue());
  }
  return result;
}

function compress(){
 show = chop(show);
 hide = shift(hide);
 var ans = combine(show,hide);
 ans.drawTo(can3);
}
function extract() {
    for (var pixel of hidden.values()) {
        pixel.setRed((pixel.getRed() - bits(pixel.getRed())) * 16);
        pixel.setGreen((pixel.getGreen() - bits(pixel.getGreen())) * 16);
        pixel.setBlue((pixel.getBlue() - bits(pixel.getBlue())) * 16);
    }
    hidden.drawTo(can5);
}