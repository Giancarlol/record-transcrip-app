import { Observable, knownFolders, path } from '@nativescript/core';
import { RecordingService } from '../services/recording-service';

export class RecorderViewModel extends Observable {
    private _isRecording: boolean = false;
    private recordingService: RecordingService;

    constructor() {
        super();
        this.recordingService = new RecordingService();
    }

    get isRecording(): boolean {
        return this._isRecording;
    }

    set isRecording(value: boolean) {
        if (this._isRecording !== value) {
            this._isRecording = value;
            this.notifyPropertyChange('isRecording', value);
        }
    }

    async toggleRecording() {
        try {
            if (!this.isRecording) {
                await this.recordingService.startRecording();
                this.isRecording = true;
                console.log('Recording started');
            } else {
                await this.recordingService.stopRecording();
                this.isRecording = false;
                console.log('Recording stopped');
            }
        } catch (error) {
            console.error('Recording error:', error);
            this.isRecording = false;
        }
    }
}