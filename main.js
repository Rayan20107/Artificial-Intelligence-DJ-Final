rightwristx=0;

rightwristy=0;

leftwristx=0;

leftwristy=0;

leftwristscore=0;

rightwristscore=0;

song1status="";

song2status="";

song1="";

song2=""

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3")
}

function setup()
{
    canvas=createCanvas(500, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    pose=ml5.poseNet(video, modelLoaded);
    pose.on('pose', gotResults);
}

function draw()
{
    image(video, 0, 0, 500, 500);
    fill("red");
    stroke("red");
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    if (leftwristscore > 0.2) 
    {
        circle(leftwristx, leftwristy, 25);
        song2.stop();

        if (song1status==false)
        {
            song1.play();
            document.getElementById("song-name").innerHTML="Harry Potter theme is playing"
        }
    }

    if (rightwristscore > 0.2)
    {
        circle(rightwristx, rightwristy, 25);
        song1.stop();

        if(song2status==false)
        {
            song2.play();
            document.getElementById("song-name").innerHTML="Peter Pan song is playing"
        }
    }

}

function modelLoaded()
{
    console.log("Model has been initialized");
}

function gotResults(pose)
{
    console.log(pose);
    rightwristx=pose[0].pose.rightWrist.x;
    rightwristy=pose[0].pose.rightWrist.y;
    leftwristx=pose[0].pose.leftWrist.x;
    leftwristy=pose[0].pose.leftWrist.y;
    leftwristscore=pose[0].pose.keypoints[9].score;
    rightwristscore=pose[0].pose.keypoints[10].score;
    console.log(rightwristscore);
    console.log(leftwristscore);
    console.log(rightwristx);
    console.log(rightwristy);
    console.log(leftwristx);
    console.log(leftwristy);
}