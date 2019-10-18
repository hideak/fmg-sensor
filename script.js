const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const neuralResult = document.getElementById('neuralResult')
const colorR = document.getElementById('colorR');
const colorG = document.getElementById('colorG');
const colorB = document.getElementById('colorB');
const context = canvas.getContext('2d');
const button = document.getElementById('startMeasuring')

// Function to draw video to canvas
function updateContent() {
    context.drawImage(video, 0, 0, 300, 300);
    const frame = context.getImageData(0, 0, 300, 300);
    const length = frame.data.length / 4;
    let [r, g, b] = [0, 0, 0];
    for(let i = 0; i < length; i++) {
        r = (i*r + frame.data[i*4+0])/(i+1);
        g = (i*g + frame.data[i*4+1])/(i+1);
        b = (i*b + frame.data[i*4+2])/(i+1);
    }
    colorR.innerHTML = 'R: ' + r.toFixed(3);
    colorG.innerHTML = 'G: ' + g.toFixed(3);
    colorB.innerHTML = 'B: ' + b.toFixed(3);
}

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

// Tensorflow.js hello world simple example:
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1]}));
model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

// Synthetic data for training:
const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

// Training process:
model.fit(xs, ys, {epochs: 10}).then(() => {
    let result = model.predict(tf.tensor2d([5], [1, 1]));
    neuralResult.innerHTML = 'Rede neural para teste: ' + result;
});

setInterval(updateContent, 0);