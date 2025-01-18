import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLock, 
  faDownload, 
  faToggleOn, 
  faToggleOff,
  faSave
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Settings = () => {
  const [settings, setSettings] = useState({
    privacyEnabled: true,
    autoExport: false,
    exportFormat: 'mp4',
    captionFormat: 'srt'
  });
  const [saving, setSaving] = useState(false);

  const handleExport = async () => {
    try {
      const response = await axios.post('/api/video/export-all', {
        format: settings.exportFormat,
        captionFormat: settings.captionFormat
      });
      const downloadUrl = response.data.downloadUrl;
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error exporting videos:', error);
      alert('Failed to export videos. Please try again.');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post('/api/settings/update', settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Privacy Settings */}
          <div className="card mb-4">
            <div className="card-header">
              <h4 className="mb-0">
                <FontAwesomeIcon icon={faLock} className="me-2" />
                Privacy Settings
              </h4>
            </div>
            <div className="card-body">
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Enhanced Privacy Mode</h5>
                  <p className="text-muted mb-0">
                    Enable additional privacy protections for your videos
                  </p>
                </div>
                <button 
                  className="btn btn-link"
                  onClick={() => handleToggle('privacyEnabled')}
                >
                  <FontAwesomeIcon 
                    icon={settings.privacyEnabled ? faToggleOn : faToggleOff} 
                    size="2x"
                    className={settings.privacyEnabled ? 'text-success' : 'text-muted'}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Export Settings */}
          <div className="card mb-4">
            <div className="card-header">
              <h4 className="mb-0">
                <FontAwesomeIcon icon={faDownload} className="me-2" />
                Export Settings
              </h4>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">Video Export Format</label>
                <select 
                  className="form-select"
                  value={settings.exportFormat}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    exportFormat: e.target.value
                  }))}
                >
                  <option value="mp4">MP4</option>
                  <option value="avi">AVI</option>
                  <option value="mov">MOV</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Caption Format</label>
                <select 
                  className="form-select"
                  value={settings.captionFormat}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    captionFormat: e.target.value
                  }))}
                >
                  <option value="srt">SRT</option>
                  <option value="vtt">VTT</option>
                </select>
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Auto-Export Completed Videos</h5>
                  <p className="text-muted mb-0">
                    Automatically export videos when captions are finalized
                  </p>
                </div>
                <button 
                  className="btn btn-link"
                  onClick={() => handleToggle('autoExport')}
                >
                  <FontAwesomeIcon 
                    icon={settings.autoExport ? faToggleOn : faToggleOff} 
                    size="2x"
                    className={settings.autoExport ? 'text-success' : 'text-muted'}
                  />
                </button>
              </div>
              <button 
                className="btn btn-primary"
                onClick={handleExport}
              >
                <FontAwesomeIcon icon={faDownload} className="me-2" />
                Export All Videos
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="d-grid">
            <button 
              className="btn btn-success btn-lg"
              onClick={handleSave}
              disabled={saving}
            >
              <FontAwesomeIcon icon={faSave} className="me-2" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 