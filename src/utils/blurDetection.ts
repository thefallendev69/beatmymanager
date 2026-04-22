export function calculateBlurScore(image: HTMLImageElement): number {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    return 0;
  }

  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  context.drawImage(image, 0, 0);

  const { data, width, height } = context.getImageData(0, 0, canvas.width, canvas.height);
  const gray = new Float32Array(width * height);

  for (let i = 0; i < data.length; i += 4) {
    const idx = i / 4;
    gray[idx] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
  }

  const laplacianValues: number[] = [];
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      const idx = y * width + x;
      const value =
        gray[idx - width] +
        gray[idx - 1] +
        gray[idx + 1] +
        gray[idx + width] -
        4 * gray[idx];
      laplacianValues.push(value);
    }
  }

  if (laplacianValues.length === 0) {
    return 0;
  }

  const mean = laplacianValues.reduce((sum, value) => sum + value, 0) / laplacianValues.length;
  const variance =
    laplacianValues.reduce((sum, value) => sum + (value - mean) ** 2, 0) / laplacianValues.length;

  return Math.round(variance * 100) / 100;
}

export function isImageBlurry(blurScore: number, threshold = 120): boolean {
  return blurScore < threshold;
}
