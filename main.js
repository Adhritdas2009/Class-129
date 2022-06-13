song='';
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
score1=0;
function preload(){
   song= loadSound('music.mp3')
}

function setup(){
    canvas=createCanvas(500, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function draw(){
    image(video, 0, 0, 500, 500);
    if(score1>0.2){
    fill('red');
    stroke('red');
    circle(leftWristx, leftWristy, 20);
    inNumbery=Number(leftWristy);
    console.log(inNumbery)
    lxy=floor(inNumbery);
    console.log(lxy);
    vol=lxy/500;
    console.log(vol);
    document.getElementById('volume').innerHTML='Volume: ' + vol;
    song.setVolume(vol);
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log('The model has been loaded')
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log('The x position of the left wrist is ' + leftWristx + ' and the y position is ' + leftWristy + '.')
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log('The x position of the right wrist is ' + rightWristx + ' and the y position is ' + rightWristy + '.')
        score1=results[0].pose.keypoints[9].score;
        console.log('The score is ' + score1);
    }
}