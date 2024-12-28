import React, { useState, useRef, useEffect } from 'react';
import SpeechProcessor from '../services/SpeechProcessor';
import axios from 'axios';

const VideoEditor = ({ videoId }) => {
    const [captions, setCaptions] = useState([]);
    const videoRef = useRef(null);
    const speechProcessorRef = useRef(null);

    useEffect(() => {
        // Load existing captions
        const loadCaptions = async () => {
            try {
                const response = await axios.get(`/api/video/captions/${videoId}`);
                setCaptions(response.data.captions || []);
            } catch (error) {
                console.error('Error loading captions:', error);
            }
        };

        loadCaptions();
    }, [videoId]);

    useEffect(() => {
        if (videoRef.current) {
            speechProcessorRef.current = new SpeechProcessor(
                videoRef.current,
                handleNewCaption
            );

            videoRef.current.addEventListener('play', handleVideoPlay);
            videoRef.current.addEventListener('pause', handleVideoPause);

            return () => {
                videoRef.current?.removeEventListener('play', handleVideoPlay);
                videoRef.current?.removeEventListener('pause', handleVideoPause);
            };
        }
    }, []);

    const handleVideoPlay = () => {
        speechProcessorRef.current?.startProcessing();
    };

    const handleVideoPause = () => {
        speechProcessorRef.current?.stopProcessing();
    };

    const handleNewCaption = (caption) => {
        setCaptions(prev => [...prev, caption]);
    };

    const handleCaptionDelete = (index) => {
        setCaptions(prev => prev.filter((_, i) => i !== index));
    };

    const handleCaptionEdit = (index, newText) => {
        setCaptions(prev => prev.map((caption, i) => 
            i === index ? { ...caption, text: newText, is_edited: true } : caption
        ));
    };

    const handleSave = async () => {
        try {
            await axios.post(`/api/video/captions/${videoId}`, { captions });
            alert('Captions saved successfully!');
        } catch (error) {
            console.error('Error saving captions:', error);
            alert('Failed to save captions. Please try again.');
        }
    };

    const formatTime = (seconds) => {
        return new Date(seconds * 1000).toISOString().substr(11, 8);
    };

    return (
        <div className="card mb-4">
            <div className="card-header">
                <h4 className="mb-0">Edit Captions</h4>
            </div>
            <div className="card-body">
                <div className="video-container mb-4">
                    <video ref={videoRef} controls className="w-100">
                        <source src={`/api/video/stream/${videoId}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                
                <div className="caption-editor mb-4">
                    <div className="d-flex justify-content-between mb-3">
                        <button 
                            className="btn btn-primary"
                            onClick={() => handleNewCaption({
                                start: videoRef.current?.currentTime || 0,
                                end: (videoRef.current?.currentTime || 0) + 3,
                                text: 'New caption',
                                is_edited: true,
                                confidence: 1.0
                            })}
                        >
                            Add Caption
                        </button>
                        <button 
                            className="btn btn-success"
                            onClick={handleSave}
                        >
                            Save All Changes
                        </button>
                    </div>
                    
                    <div className="list-group">
                        {captions.map((caption, index) => (
                            <div key={index} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <small className="text-muted">
                                        {formatTime(caption.start)} - {formatTime(caption.end)}
                                    </small>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleCaptionDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <textarea
                                    className="form-control caption-text"
                                    rows="2"
                                    value={caption.text}
                                    onChange={(e) => handleCaptionEdit(index, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoEditor; 