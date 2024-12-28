import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faVideo, 
  faBrain,
  faCheckCircle,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import InsightsChart from '../../components/dashboard/InsightsChart';
import ModelProgress from '../../components/dashboard/ModelProgress';
import RecentVideos from '../../components/dashboard/RecentVideos';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVideos: 0,
    processedMinutes: 0,
    accuracyRate: 0,
    modelProgress: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-5">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Stats Overview */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faVideo} size="2x" className="text-primary mb-3" />
              <h5>Total Videos</h5>
              <h3>{stats.totalVideos}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faChartLine} size="2x" className="text-success mb-3" />
              <h5>Processed Minutes</h5>
              <h3>{stats.processedMinutes}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faCheckCircle} size="2x" className="text-info mb-3" />
              <h5>Accuracy Rate</h5>
              <h3>{stats.accuracyRate}%</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faBrain} size="2x" className="text-warning mb-3" />
              <h5>Model Progress</h5>
              <h3>{stats.modelProgress}%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Speech Recognition Insights</h4>
            </div>
            <div className="card-body">
              <InsightsChart />
            </div>
          </div>
        </div>
      </div>

      {/* Model Progress and Recent Videos */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <ModelProgress progress={stats.modelProgress} />
        </div>
        <div className="col-md-6 mb-4">
          <RecentVideos />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 