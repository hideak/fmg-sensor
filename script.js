const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const neuralResult = document.getElementById('neuralResult')
const context = canvas.getContext('2d');

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
    neuralResult.innerHTML = result;
});
