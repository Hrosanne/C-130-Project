var song = "";
var leftWrist_x = 0;
var leftWrist_y = 0;
var rightWrist_x = 0;
var rightWrist_y = 0;
var scoreLeftWrist = 0;
var scoreRightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized!");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score - Left Wrist = "+scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score - Right Wrist = "+scoreRightWrist);
        leftWrist_x = results[0].pose.leftWrist.x ;
        leftWrist_y = results[0].pose.leftWrist.y ;
        rightWrist_x = results[0].pose.rightWrist.x ; 
        rightWrist_y = results[0].pose.rightWrist.y ; 
        console.log("Left Wrist X = "+leftWrist_x+"; Left Wrist Y = "+leftWrist_y);
        console.log("Right Wrist X = "+rightWrist_x+"; Right Wrist Y = "+rightWrist_y);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2){
    circle(leftWrist_x,leftWrist_y,20);
    numberLeftWrist_Y = Number(leftWrist_y);
    removeDecimal = floor(numberLeftWrist_Y);
    volume = removeDecimal/500;
    document.getElementById("volume").innerHTML = "Volume = "+volume;
    song.setVolume(volume);
    }
    if(scoreRightWrist>0.2){
    circle(rightWrist_x,rightWrist_y,20);
    if(rightWrist_y>0 && rightWrist_y<100){
        document.getElementById("speed").innerHTML  = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightWrist_y>100 && rightWrist_y<200){
        document.getElementById("speed").innerHTML  = "Speed = 1x";
        song.rate(1);
    }
    else if(rightWrist_y>200 && rightWrist_y<300){
        document.getElementById("speed").innerHTML  = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWrist_y>300 && rightWrist_y<400){
        document.getElementById("speed").innerHTML  = "Speed = 2x";
        song.rate(2);
    }
    else if(rightWrist_y>400 && rightWrist_y<500){
        document.getElementById("speed").innerHTML  = "Speed = 2.5x";
        song.rate(2.5);
    }
}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}