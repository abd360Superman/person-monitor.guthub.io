let status = "";
let objects = [];
let alarm = '';

function perload() {
  alarm = loadSound('alarm.mp3');
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380)
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    objects = results;
  }
}

function draw() {
  person_found = false;
  image(video, 0, 0, 380, 380);
  if (status != '') {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (c = 0; c < objects.length; c++) {
      if (objects.label[c] === 'person') {
        document.getElementById('person-detected').innerHTML = 'Person Found';
        person_found = true;
        fill(r, g, b)
        percent = floor(objects[c].confidence * 100)
        text(objects[c].label + ' ' + percent + '%', objects[c].x + 15, objects[c].y + 15)
        noFill()
        stroke(r, g, b)
        rect(objects[c].x, objects[c].y, objects[c].width, objects[c].height)
      }
    }
    if(person_found === false) {
      document.getElementById('person-detected').innerHTML = 'Person not found';
    }
  }
}

function playAlarm() {
  alarm.play();
  alarm.setVolume(1);
  alarm.rate(1);
}