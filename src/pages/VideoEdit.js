import React from 'react';
import { useParams } from 'react-router-dom';
import VideoEditor from '../components/VideoEditor';

const VideoEdit = () => {
  const { videoId } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <VideoEditor videoId={videoId} />
        </div>
      </div>
    </div>
  );
};

export default VideoEdit; 