
var projectsArray = ["#ma", "#cpp", "#face", "#loop"];
var projectsDivArray = ["#maDiv", "#cppDiv", "#faceDiv", "#loopDiv"];

$("#maMock").click({projectTitle: "ma", projectDiv: "#maDiv"}, showProject);
$("#cppMock").click({projectTitle: "cpp", projectDiv: "#cppDiv"}, showProject);
$("#faceMock").click({projectTitle: "face", projectDiv: "#faceDiv"}, showProject);
$("#loopMock").click({projectTitle: "loop", projectDiv: "#loopDiv"}, showProject);



$("#closeDiv").click(init);

// Initialize project startup display with all project mockups visible
// init({projectClicked: false});



// Function to show project when clicked upon
function showProject(event) {

  $("#projectsHeader").css({opacity: 1, display: 'block'}).animate({opacity: 0}, 200);

  $("#closeDiv").css({opacity: 0, display: 'block'}).animate({opacity: 1}, 200);

  switch(event.data.projectTitle){
    case "ma":
      $("#section3").addClass('maActive');
      break;
    case "cpp":
      $("#section3").addClass('cppActive');
      break;
    case "face":
      $("#section3").addClass('faceActive');
      break;
    case "loop":
      $("#section3").addClass('loopActive');
      break;
  }
  // $("#section3").css({background: event.data.backgroundGradient}, 200);

  $("#projectImgs").css({justifyContent: "center"});

  for(let i = 0; i < projectsArray.length; i++)
  {
    if($(projectsArray[i]).is(":visible")){
      $(projectsArray[i]).css({opacity: 1, display: 'none'}).animate({opacity: 0}, 200);
    }
  }
  $(event.data.projectDiv).css({opacity: 0, display: 'flex',}).animate({opacity: 1}, 1000).delay(1000);
};

// function closeProject(){
//
//
//   init();
//   // $("#section3").css({backgroundColor: "rgba(118, 129, 163, 1)"}, 200);
//
// }

function init(){

  $("#section3").removeClass('maActive');
  $("#section3").removeClass('cppActive');
  $("#section3").removeClass('faceActive');
  $("#section3").removeClass('loopActive');

  hideProject();
  setTimeout( () => {
    showProjectsMockups();
  }, 1000);

}

function hideProject(){
  for(let i = 0; i< projectsDivArray.length; i++)
  {
    $(projectsDivArray[i]).fadeOut(200);
  }
  if($("#closeDiv").css("opacity") !== 0){
    $("#closeDiv").css({opacity: 1, display: 'block'}).animate({opacity: 0}, 200)
  }
}

function showProjectsMockups(){
    $("#projectsHeader").css({opacity: 0, display: 'block'}).animate({opacity: 1}, 200);

    for(let i = 0; i < projectsArray.length; i++){
        $(projectsArray[i]).css({opacity: 0, display: 'flex'}).animate({opacity: 1}, 200);
    }
}

function scrollingUp(){
	 var lastScrollTop = 0, delta = 5;
	 $(window).scroll(function(){
		 var nowScrollTop = $(this).scrollTop();
		 if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
		 	if (nowScrollTop > lastScrollTop){
          return false;
  		 		// return true;
		 	} else {
        return true;

			}
		 lastScrollTop = nowScrollTop;
		 }
	 });
 }
