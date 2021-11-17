noseX=0;
noseY=0;
difference=0;
rightWristX=0;
leftWristX=0;

function setup()
{
    video=createCapture(VIDEO);
    video.size(530,400);
    video.position(20,150);
    canvas = createCanvas(550,500);
    canvas.position(600,108);
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    background('#dbc602');

    document.getElementById("square_sides").innerHTML="Size of the square is = "+difference+"px";

    fill('#4299c2');
    stroke('#4299c2');
    square(noseX,noseY,difference);
}

function modelLoaded()
{
    console.log('PoseNet is initialized');
}

function gotPoses(results)
{
    if (results.length>0)
    {
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("Nose X = "+noseX+"Nose Y = "+noseY);

        rightWristX=results[0].pose.rightWrist.x;
        leftWristX=results[0].pose.leftWrist.x;
        difference=floor(leftWristX-rightWristX);
        console.log("Right Wrist X = "+rightWristX+"Left Wrist X"+leftWristX+"Difference = "+difference);
    }
}