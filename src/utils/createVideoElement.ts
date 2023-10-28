export const createVideoElement = (file: File): Promise<HTMLVideoElement> => {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.src = URL.createObjectURL(file);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(video);
    }, 0);
  });
};
