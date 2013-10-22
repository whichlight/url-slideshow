var gData;
var slides = [];

document.addEventListener('DOMContentLoaded', function() {
  var URL = "0AhknddmTtUqPdEhlc2NzYzdCQ254Q1hQMmVSZzlqMlE"
  Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true } )
})
function showInfo(data) {
  gData = data;
  gData.forEach(function(entry){
    slides[entry['rowNumber']-1]=entry['url'];
  });
  startSlideshow();

}

function addSlide(data, index){
  var slide_html = "<div class='slide' id='"+ index+"'>";

//text is in different places.  description and title. not everything has HTML tag
//how do i just get a preview for everything without having to customize

  //twitter img
  if(data['provider_name']==="Twitter" && data['type'] === "photo"){
   slide_html+="<div id='text'>"+data['description']+"</div>";
   slide_html+="<div id='media'><img src='"+data['url']+"'</div>";
   interval = 5;
   if(!data['description']){interval=0;}
  }
  else if(data['provider_name']==="Twitter" && data['type'] === "link"){
   slide_html+="<div id='text'>"+data['description']+"</div>";
   interval = 5;
   if(!data['description']){interval=0;}
  }
  //vine vid
  else if(data['provider_name']==="Vine"){
   slide_html+="<div id='text'>"+data['description']+"</div>";
   slide_html+="<div id='media'>"+ data['html'] +"</div>";
   interval = 7;
  }

  //instagram img
  else if(data['provider_name']==="Instagram" && data['type'] ==="photo"){
   slide_html+="<div id='text'>"+data['title']+"</div>";
   slide_html+="<div id='media'><img src='"+data['url']+"'</div>";
   interval = 5;
  }

  //instagram vid
  else if(data['provider_name']==="Instagram" && data['type'] ==="video"){
   slide_html+="<div id='text'>"+data['title']+"</div>";
   slide_html+="<div id='media'>"+ data['html'] +"</div>";
   interval = 15;
  }
  //other
  else{
   console.log("other :" + data['url']);
   slide_html+="<div id='text'>"+data['title']+"</div>";
   slide_html+="<div id='media'><img src='"+data['thumbnail_url']+"'</div>";
   interval = 5;
  }

  //get random color
  var color = HSVtoRGB(Math.random(), 1,1);
  color_str = "rgb("+color['r']+","+color['g']+','+color['b']+")";

  slide_html+="</div>";
  $("#slides").append(slide_html);
  $("#text").css("color",color_str);

  var color = HSVtoRGB(Math.random(), 1,1);
  color_str = "rgb("+color['r']+","+color['g']+','+color['b']+")";

  setTimeout(function(){nextSlide()},interval*1000);
}
var next;
var interval=10;

function showSlide(number){
   embedSlide(slides[number]);
   next = (number + 1 ) % slides.length;
}

function embedSlide(url){
$('#slides').empty();
 $.embedly.oembed(url, {query:{width:1000, autoplay:true, image_width: 1000, image_height:1000, image_grow:true, image_method: 'resize'}}).done(function(results){
   results.forEach(function(data, index){
    console.log(data);
    addSlide(data, index);
   });
 });
}


function startSlideshow(){
  showSlide(0);
}

function nextSlide(){
  showSlide(next);
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor(r * 255),
        g: Math.floor(g * 255),
        b: Math.floor(b * 255)
    };
}
