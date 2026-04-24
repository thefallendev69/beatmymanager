import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

let modelPromise: Promise<cocoSsd.ObjectDetection> | null = null;

async function getModel() {
  if (!modelPromise) {
    modelPromise = cocoSsd.load();
  }
  return modelPromise;
}

export async function detectPersonConfidence(image: HTMLImageElement): Promise<number> {
  const model = await getModel();
  const predictions = await model.detect(image);
  const personPrediction = predictions
    .filter((prediction) => prediction.class === 'person')
    .sort((a, b) => b.score - a.score)[0];

  return personPrediction?.score ?? 0;
}
