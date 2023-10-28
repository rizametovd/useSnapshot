import { ChangeEvent, useState } from 'react';
import { useSnapshot } from './useSnapshot';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const { url, error, snapshots, videoElementRef, metadata, onClickSnapshotCapture } = useSnapshot({ file });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div
        style={{
          width: '400px',
          height: 200,
          background: 'red',
        }}
      >
        <video
          playsInline
          preload="metadata"
          ref={videoElementRef}
          src={url}
          controls
          style={{ width: '100%', height: '100%' }}
        ></video>
      </div>

      <input
        onChange={handleChange}
        type="file"
        // accept="video/mp4,video/x-m4v,video/*"
      />

      {error ? (
        <span>{error}</span>
      ) : (
        <>
          <button onClick={onClickSnapshotCapture}>Take snapshot</button>

          <div>
            <span>{metadata.title}</span>
            <br />
            <span>{metadata.fileSize} Mb</span>
            <span>{metadata.fileExtension}</span>
          </div>
          <div>
            {snapshots.map((snapshot, idx) => (
              <img style={{ width: 600 }} key={idx} src={snapshot} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
