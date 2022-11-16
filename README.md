# NeuralSynth
Make music with your body!

## Main idea
We believe music is fundamental in our lives, to let us express our creativity, let go of tension and stress we might be feeling, and reconnect with ourselves and others.

Thus, we created NeuralSynth, for anyone to start creating music, even without any experience or instrument. NeuralSynth works with a computer vision model capable of tracking your body movements and mapping them to different audio parameters to let you create music with your body.

<img width="500" alt="NeuralSynth" src="https://user-images.githubusercontent.com/10205873/201897023-811b9dfd-62dc-4d2b-aafd-66edd5429503.png">

You can try our web-app at https://zephirl.github.io/NeuralSynth. For the best experience, please use Google Chrome.

Alternatively, a recorded demo video can be viewed [here](https://rebrand.ly/NeuralSynthDemoVideo).


## System structure

The NeuralSynth system is composed of three main components. Namely, live pose estimation with the Mediapipe API, audio synthesis through Tone.JS, and the web-app user interface made with React and javascript.

<img width="680" alt="System Structure-3" src="https://user-images.githubusercontent.com/10205873/202117268-3c62f726-9607-4ae4-9bec-36cacbddf3ae.png">

To learn more, you can read our paper detailing NeuralSynth in this repo [here](NeuralSynth.pdf).
