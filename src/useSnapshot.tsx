import { useCallback, useEffect, useRef, useState } from 'react';
import { createVideoElement } from './utils/createVideoElement';
import { drawImage } from './utils/drawImage';
import { getVideoMetadata } from './utils/getVideoMetadata';

interface UseVideoSnapshot {
  file: File | null;
}

const wait = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const INIT_METADATA = { title: '', fileSize: 0, fileExtension: '' };

export const useSnapshot = ({ file }: UseVideoSnapshot) => {
  const [url, setUrl] = useState<string>('');
  const [snapshots, setSnapshots] = useState<string[]>([]);
  const [metadata, setMetadata] = useState(INIT_METADATA);
  const [error, setError] = useState('');

  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const onClickSnapshotCapture = async () => {
    const { current: videoElement } = videoElementRef;

    if (!videoElement) {
      return;
    }

    handleSnapshotCapture(videoElement);
  };

  const handleSnapshotCapture = async (videoElement: HTMLVideoElement) => {
    if (videoElement.currentTime === 0) {
      console.log('1');
      videoElement.currentTime = 0.01;
    }

    videoElement.onerror = () => {
      setError('Parsing error');
      setMetadata(INIT_METADATA);
    };

    await wait(1000);
    const image = drawImage(videoElement);
    setSnapshots((prevState) => [image, ...prevState]);
  };

  const autoSnapshotCapture = useCallback(async (file: File) => {
    const video = await createVideoElement(file);
    await handleSnapshotCapture(video);
  }, []);

  useEffect(() => {
    if (!file) {
      return;
    }

    setMetadata(getVideoMetadata(file));
    setUrl(URL.createObjectURL(file));
    autoSnapshotCapture(file);

    return () => {
      setSnapshots([]);
      setUrl('');
    };
  }, [autoSnapshotCapture, file]);

  return {
    url,
    onClickSnapshotCapture,
    snapshots,
    videoElementRef,
    metadata,
    error,
  };
};
