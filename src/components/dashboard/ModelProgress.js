import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ModelProgress = ({ progress }) => {
  const milestones = [
    { percent: 25, label: 'Basic Speech Recognition' },
    { percent: 50, label: 'Advanced Pattern Recognition' },
    { percent: 75, label: 'Context Understanding' },
    { percent: 100, label: 'Full Language Comprehension' }
  ];

  return (
    <div className="card h-100">
      <div className="card-header">
        <h4 className="mb-0">Model Learning Progress</h4>
      </div>
      <div className="card-body">
        <div className="progress mb-4" style={{ height: '25px' }}>
          <div 
            className="progress-bar bg-success" 
            role="progressbar" 
            style={{ width: `${progress}%` }}
            aria-valuenow={progress} 
            aria-valuemin="0" 
            aria-valuemax="100"
          >
            {progress}%
          </div>
        </div>

        <div className="milestones">
          {milestones.map((milestone, index) => (
            <div 
              key={index} 
              className="d-flex align-items-center mb-3"
            >
              <FontAwesomeIcon 
                icon={progress >= milestone.percent ? faCheckCircle : faBrain}
                className={`me-2 ${progress >= milestone.percent ? 'text-success' : 'text-muted'}`}
              />
              <div>
                <h6 className="mb-0">{milestone.label}</h6>
                <small className="text-muted">{milestone.percent}% milestone</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelProgress; 