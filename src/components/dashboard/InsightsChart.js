import React from 'react';

const InsightsChart = () => {
  const data = {
    weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    accuracy: [65, 75, 82, 88],
    words: [20, 45, 75, 100]
  };

  const maxValue = Math.max(...data.accuracy, ...data.words);

  return (
    <div className="insights-chart">
      <div className="chart-container">
        <div className="chart-bars">
          {data.weeks.map((week, index) => (
            <div key={week} className="bar-group">
              <div 
                className="bar accuracy-bar"
                style={{ height: `${(data.accuracy[index] / maxValue) * 100}%` }}
              >
                <span className="bar-value">{data.accuracy[index]}%</span>
              </div>
              <div 
                className="bar words-bar"
                style={{ height: `${(data.words[index] / maxValue) * 100}%` }}
              >
                <span className="bar-value">{data.words[index]}</span>
              </div>
              <div className="bar-label">{week}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color accuracy-color"></div>
          <span>Recognition Accuracy</span>
        </div>
        <div className="legend-item">
          <div className="legend-color words-color"></div>
          <span>Words Learned</span>
        </div>
      </div>
    </div>
  );
};

export default InsightsChart; 