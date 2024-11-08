import { Observable } from '@nativescript/core';

export class RecorderViewModel extends Observable {
    private _isRecording: boolean = false;
    private _recordingTime: number = 0;
    private _timer: any;

    constructor() {
        super();
    }

    get isRecording(): boolean {
        return this._isRecording;
    }

    get recordingTime(): string {
        const minutes = Math.floor(this._recordingTime / 60);
        const seconds = this._recordingTime % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    startRecording() {
        this._isRecording = true;
        this._recordingTime = 0;
        this.notifyPropertyChange('isRecording', this._isRecording);
        
        this._timer = setInterval(() => {
            this._recordingTime++;
            this.notifyPropertyChange('recordingTime', this.recordingTime);
        }, 1000);
    }

    stopRecording() {
        this._isRecording = false;
        this.notifyPropertyChange('isRecording', this._isRecording);
        
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }
}