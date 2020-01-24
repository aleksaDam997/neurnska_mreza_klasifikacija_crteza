const len = 784;
const total_data = 10000;

const CAT = 0;
const TRAIN = 2;
const RAINBOW = 1;

let cats_data;
let trains_data;
let rainbows_data;

let cats = {};
let trains = {};
let rainbows = {};

let nn;

function preload(){
  cats_data = loadBytes('cats1000.bin');
  trains_data = loadBytes('trains1000.bin');
  rainbows_data = loadBytes('rainbows1000.bin');
}

function prepareData(category, data, label){

category.training = [];
category.testing = [];
let treshold = 0.9 * total_data;

for(let i = 0; i < total_data; i ++){

let offset = i * len;

if(i < treshold){
category.training[i] = data.bytes.subarray(offset, offset + len);
category.training[i].label = label;
}else{
  category.testing[i - treshold] = data.bytes.subarray(offset, offset + len);
  category.testing[i - treshold].label = label;
}
}

}

function trainEpoch(training) {
  shuffle(training, true);
  //console.log(training);
  // Train for one epoch
  for (let i = 0; i < training.length; i++) {
    let data = training[i];
    let inputs = Array.from(data).map(x => x / 255);
    let label = training[i].label;
    let targets = [0, 0, 0];
    targets[label] = 1;
    // console.log(inputs);
    // console.log(targets);
    nn.train(inputs, targets);
    let percent = floor(i / training.length * 100);
    console.log(percent + "% of training is done");
  }
}

function testAll(testing) {

  let correct = 0;
  // Train for one epoch
  for (let i = 0; i < testing.length; i++) {
    // for (let i = 0; i < 1; i++) {
    let data = testing[i];
    let inputs = Array.from(data).map(x => x / 255);
    let label = testing[i].label;
    let guess = nn.predict(inputs);

    let m = max(guess);
    let classification = guess.indexOf(m);
    // console.log(guess);
    // console.log(classification);
    // console.log(label);

    if (classification === label) {
      correct++;
    }
  }
  let percent = 100 * correct / testing.length;
  return percent;

}

function setup() {
createCanvas(280, 280);
background(255);

prepareData(cats, cats_data, CAT);
prepareData(trains, trains_data, TRAIN);
prepareData(rainbows, rainbows_data, RAINBOW);

nn = new NeuralNetwork(len, 64, 3);

let training = [];
training = training.concat(cats.training);
training = training.concat(trains.training);
training = training.concat(rainbows.training);

let testing = [];
testing = testing.concat(cats.testing);
testing = testing.concat(trains.testing);
testing = testing.concat(rainbows.testing);

  // trainEpoch(training);
  // console.log("trained " + i + " times...");
  // testAll(testing);
  // console.log(testAll(testing) + "% correct predictions");

  let epoch = 0;

  let trainButton = select('#train');
  trainButton.mousePressed(function() {
    trainEpoch(training);
    epoch++;
    console.log(epoch + ": training epoch");
  });

  let testButton = select('#test');
  testButton.mousePressed(function() {
    let succesPercent = testAll(testing);
    console.log(succesPercent + "% correct answers, congrats!");
  });

  let guessButton = select('#guess');
  guessButton.mousePressed(function() {
    let inputs = [];
    let img = get();
    img.resize(28, 28);
    img.loadPixels();

    for(let i = 0; i < len; i ++){
    
      let bright = img.pixels[i * 4];
      inputs[i] = (255 - bright) / 255.0;
    }

    let guess = nn.predict(inputs);
    let m = max(guess);
    let classification = guess.indexOf(m);

    //image(img, 0, 0);

    if(classification === CAT){
      console.log("MACKA");
    }else if(classification === TRAIN){
      console.log("KUCA");
    }else if(classification === RAINBOW){
      console.log("DUGA");
    }

    let clearButton = select('#clear');
    clearButton.mousePressed(function() {
    background(255);
  });

  });

// let total = 100;

// for(let n = 0; n < total; n++){
//   let img = createImage(28, 28);
//   img.loadPixels();
//   let offset = n * 784;

//   for(let i = 0; i < 784; i++){
//     let val = 255 - cats_data.bytes[i + offset];
//     img.pixels[i * 4 + 0] = val;
//     img.pixels[i * 4 + 1] = val;
//     img.pixels[i * 4 + 2] = val;
//     img.pixels[i * 4 + 3] = 255;
//   }
// img.updatePixels();
// let x = (n % 10) * 28;
// let y = floor(n / 10) * 28;
// image(img, x, y);
// }
// 152079 pasa
// 123122 macaka
// 126765 duga
// 127868 vozova
// 133492 ptica
// 135340 kuca





}

function draw() {

  strokeWeight(6);
  stroke(0);
 
  if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

}





