import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faGraduationCap, 
  faRobot 
} from '@fortawesome/free-solid-svg-icons';

const RecentVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentVideos = async () => {
      try {
        const response = await axios.get('/api/video/recent');
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching recent videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentVideos();
  }, []);

  return (
    <div className="card h-100">
      <div className="card-header">
        <h4 className="mb-0">Recent Videos</h4>
      </div>
      <div className="card-body">
        {videos.map((video) => (
          <div key={video.id} className="d-flex align-items-center mb-3 p-2 border rounded">
            <FontAwesomeIcon 
              icon={video.mode === 'learning' ? faGraduationCap : faRobot}
              className="text-primary me-3"
            />
            <div className="flex-grow-1">
              <h6 className="mb-0">{video.original_filename}</h6>
              <small className="text-muted">
                {new Date(video.upload_date).toLocaleDateString()} - {video.mode} Mode
              </small>
            </div>
            <Link 
              to={`/edit/${video.id}`}
              className="btn btn-sm btn-outline-primary"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentVideos; 