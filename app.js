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
  if(data['provider_name']==="Twitter"){
   slide_html+="<div id='text'>"+data['description']+"</div>";
   slide_html+="<div id='media'><img src='"+data['url']+"'</div>";
   interval = 5;
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

  slide_html+="</div>";
  $("#slides").append(slide_html);
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
//show each one one at a time, jquery animations

