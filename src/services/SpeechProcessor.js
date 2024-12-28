class SpeechProcessor {
    constructor(videoElement, onNewCaption) {
        this.video = videoElement;
        this.processing = false;
        this.recognition = null;
        this.onNewCaption = onNewCaption;
        
        // Check for browser support and get the appropriate speech recognition API
        const SpeechRecognition = window.SpeechRecognition || 
                                 window.webkitSpeechRecognition || 
                                 window.mozSpeechRecognition || 
                                 window.msSpeechRecognition;
        
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.setupRecognition();
        } else {
            console.warn('Speech recognition is not supported in this browser');
        }
    }
    
    setupRecognition() {
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        
        this.recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            if (result.isFinal) {
                const text = result[0].transcript;
                const confidence = result[0].confidence;
                this.addCaption(text, confidence);
            }
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.stopProcessing();
        };
    }
    
    startProcessing() {
        if (!this.recognition) {
            console.error('Speech recognition not supported');
            return;
        }
        
        this.processing = true;
        this.recognition.start();
    }
    
    stopProcessing() {
        if (this.recognition) {
            this.recognition.stop();
        }
        this.processing = false;
    }
    
    addCaption(text, confidence) {
        const currentTime = this.video.currentTime;
        const caption = {
            start: currentTime - 2,
            end: currentTime,
            text: text,
            confidence: confidence,
            is_edited: false
        };
        
        this.onNewCaption(caption);
    }
}

export default SpeechProcessor; 