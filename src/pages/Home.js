import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faBrain, 
  faEdit,
  faUpload,
  faMagic,
  faCheckCircle,
  faChartLine,
  faLock
} from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="display-4 mb-3">Baby Speech Analyzer</h1>
          <p className="lead mb-4">
            Understand your baby's speech through the power of machine learning. 
            Upload videos, edit captions, and track your little one's language development.
          </p>
          {!user ? (
            <div className="d-grid gap-2 d-md-flex">
              <Link to="/register" className="btn btn-primary btn-lg me-md-2">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-outline-secondary btn-lg">
                Sign In
              </Link>
            </div>
          ) : (
            <div className="d-grid gap-2 d-md-flex">
              <Link to="/upload" className="btn btn-primary btn-lg">
                Upload Video
              </Link>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <div className="card bg-dark text-white">
            <div className="card-body p-4">
              <h3 className="card-title mb-4">Key Features</h3>
              <div className="d-flex align-items-start mb-3">
                <div className="feature-icon me-3">
                  <FontAwesomeIcon icon={faVideo} size="2x" className="text-primary" />
                </div>
                <div>
                  <h5>Video Upload</h5>
                  <p className="mb-0">Upload videos of your baby's speech for analysis</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <div className="feature-icon me-3">
                  <FontAwesomeIcon icon={faBrain} size="2x" className="text-primary" />
                </div>
                <div>
                  <h5>ML-Powered Analysis</h5>
                  <p className="mb-0">Advanced speech recognition tailored for baby talk</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <div className="feature-icon me-3">
                  <FontAwesomeIcon icon={faEdit} size="2x" className="text-primary" />
                </div>
                <div>
                  <h5>Caption Editor</h5>
                  <p className="mb-0">Edit and refine speech captions in real-time</p>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <div className="feature-icon me-3">
                  <FontAwesomeIcon icon={faChartLine} size="2x" className="text-primary" />
                </div>
                <div>
                  <h5>Progress Tracking</h5>
                  <p className="mb-0">Monitor your baby's speech development over time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">How It Works</h3>
              <div className="row g-4">
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="mb-3">
                      <FontAwesomeIcon icon={faUpload} size="3x" className="text-primary" />
                    </div>
                    <h5>1. Upload</h5>
                    <p>Upload a video of your baby speaking</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="mb-3">
                      <FontAwesomeIcon icon={faMagic} size="3x" className="text-primary" />
                    </div>
                    <h5>2. Analyze</h5>
                    <p>Our ML model analyzes the speech patterns</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="mb-3">
                      <FontAwesomeIcon icon={faEdit} size="3x" className="text-primary" />
                    </div>
                    <h5>3. Edit</h5>
                    <p>Review and edit the generated captions</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center">
                    <div className="mb-3">
                      <FontAwesomeIcon icon={faCheckCircle} size="3x" className="text-primary" />
                    </div>
                    <h5>4. Track</h5>
                    <p>Monitor speech development progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Detail Section */}
      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="text-center mb-3">
                <FontAwesomeIcon icon={faBrain} size="3x" className="text-primary" />
              </div>
              <h4 className="text-center mb-3">Smart Analysis</h4>
              <p>Our advanced machine learning model is specifically trained to understand baby speech patterns, making it more accurate than general-purpose speech recognition.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="text-center mb-3">
                <FontAwesomeIcon icon={faChartLine} size="3x" className="text-primary" />
              </div>
              <h4 className="text-center mb-3">Development Tracking</h4>
              <p>Track your baby's speech development over time with detailed progress reports and milestone tracking.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <div className="text-center mb-3">
                <FontAwesomeIcon icon={faLock} size="3x" className="text-primary" />
              </div>
              <h4 className="text-center mb-3">Privacy First</h4>
              <p>Your baby's videos and data are securely stored and never shared without your explicit permission.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card bg-primary text-white">
            <div className="card-body p-4 text-center">
              <h3 className="mb-4">Start Understanding Your Baby Today</h3>
              <p className="lead mb-4">Join other parents in capturing and understanding your baby's developmental journey</p>
              {!user ? (
              ) : (
                <Link to="/upload" className="btn btn-light btn-lg">
                  Start Uploading
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 