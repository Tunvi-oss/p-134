img = "";
status = "";
object = [];

function preload(){
song = loadSound("the_best_alarm_ever.mp3");
}

function setup(){

    
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status !="")
    {
     for(i= 0; i< object.length; i++)
     {
         document.getElementById("status").innerHTML = "Status : Object Detected";
         document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+ object.length;

         fill(r,g,b);
         percent = floor(object[i].confidence*100);
         text(object[i].label +""+percent+"%",object[i].x,object[i].y);
         nofill();
         stroke(r,g,b)
         rect(object[i].x,object[i].y,object[i].width,object[i].hight);
     }
    }
}  

function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(video, gotResult);

}

function gotResult(error, results){
    if(error){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        console.log(error);
    }

    console.log(results);
    object = results;
}