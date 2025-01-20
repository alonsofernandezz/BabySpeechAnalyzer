import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faRobot, 
  faUpload,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/video/list');
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !mode) return;

    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('mode', mode);
    setUploading(true);

    try {
      const response = await axios.post('/api/video/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/edit/${response.data.video_id}`);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      {/* Mode Selection */}
      {!mode && (
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">Choose Mode</h4>
              </div>
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <div 
                      className="card h-100 cursor-pointer hover-shadow"
                      onClick={() => setMode('learning')}
                    >
                      <div className="card-body text-center">
                        <FontAwesomeIcon 
                          icon={faGraduationCap} 
                          size="3x" 
                          className="text-primary mb-3" 
                        />
                        <h5>Learning Mode</h5>
                        <p>Help train our model by correcting captions</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div 
                      className="card h-100 cursor-pointer hover-shadow"
                      onClick={() => setMode('predictive')}
                    >
                      <div className="card-body text-center">
                        <FontAwesomeIcon 
                          icon={faRobot} 
                          size="3x" 
                          className="text-primary mb-3" 
                        />
                        <h5>Predictive Mode</h5>
                        <p>Use our trained model to analyze speech</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Form */}
      {mode && (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Upload Video ({mode} Mode)</h4>
                <button 
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setMode(null)}
                >
                  Change Mode
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="video" className="form-label">
                      Choose video file
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="video"
                      accept="video/*"
                      onChange={handleFileSelect}
                      required
                    />
                    <div className="form-text">
                      Supported formats: MP4, AVI, MOV (max 16MB)
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={uploading || !selectedFile}
                  >
                    {uploading ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faUpload} className="me-2" />
                        Upload
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Video List */}
            {videos.length > 0 && (
              <div className="card">
                <div className="card-header">
                  <h4 className="mb-0">Your Videos</h4>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    {videos.map((video) => (
                      <a
                        key={video.id}
                        href={`/edit/${video.id}`}
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <h6 className="mb-1">{video.original_filename}</h6>
                          <small className="text-muted">
                            Mode: {video.mode}
                          </small>
                        </div>
                        <span className="badge bg-primary rounded-pill">
                          {new Date(video.upload_date).toLocaleDateString()}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload; 