
// Arrays storing the project mockup image ids and divs to show containing each project content when clicked upon
var projectsArray = ["#ma", "#cpp", "#face", "#loop", "#sq", "#pul"];
var projectsDivArray = ["#maDiv", "#cppDiv", "#faceDiv", "#loopDiv", "#sqDiv", "#pulDiv"];

// Enable onclick functions for each project mockup to show project content
$("#maMock").click({projectTitle: "ma", projectDiv: "#maDiv"}, showProject);
$("#cppMock").click({projectTitle: "cpp", projectDiv: "#cppDiv"}, showProject);
$("#faceMock").click({projectTitle: "face", projectDiv: "#faceDiv"}, showProject);
$("#loopMock").click({projectTitle: "loop", projectDiv: "#loopDiv"}, showProject);
$("#pulMock").click({projectTitle: "pul", projectDiv: "#pulDiv"}, showProject);
$("#sqMock").click({projectTitle: "sq", projectDiv: "#sqDiv"}, showProject);


//Enable onclick for close X on bottom page when project is opened
$("#closeDiv").click(init);

// Function to show project when clicked upon corresponding projectmockup
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
    case "pul":
      $("#section3").addClass('pulActive');
      break;
    case "sq":
      $("#section3").addClass('sqActive');
    default:
      console.log("Invalid project name");
  }

  $("#projectImgs").css({justifyContent: "center"});

  for(let i = 0; i < projectsArray.length; i++)
  {
    if($(projectsArray[i]).is(":visible")){
      $(projectsArray[i]).css({opacity: 1, display: 'none'}).animate({opacity: 0}, 200);
    }
  }
  $(event.data.projectDiv).css({opacity: 0, display: 'flex',}).animate({opacity: 1}, 1000).delay(1000);
};

function init(){
  $("#section3").removeClass('maActive');
  $("#section3").removeClass('cppActive');
  $("#section3").removeClass('faceActive');
  $("#section3").removeClass('loopActive');
  $("#section3").removeClass('pulActive');
  $("#section3").removeClass('sqActive');

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
    $("#projectsHeader").css({opacity: 0, display: 'flex'}).animate({opacity: 1}, 200);

    for(let i = 0; i < projectsArray.length; i++){
        $(projectsArray[i]).css({opacity: 0, display: 'flex'}).animate({opacity: 1}, 200);
    }
}
