import { Observable } from '@nativescript/core';

export class MainViewModel extends Observable {
    private _isRecording = false;
    private _status = 'Ready to record';
    private _recordingTime = '0:00';
    private _recordings: any[] = [];
    private _timer: any;

    constructor() {
        super();
        this.loadRecordings();
    }

    get isRecording(): boolean {
        return this._isRecording;
    }

    get status(): string {
        return this._status;
    }

    get recordingTime(): string {
        return this._recordingTime;
    }

    get recordings(): any[] {
        return this._recordings;
    }

    toggleRecording() {
        if (!this._isRecording) {
            this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    private startRecording() {
        this._isRecording = true;
        this._status = 'Recording...';
        this.startTimer();
        
        this.notifyPropertyChange('isRecording', this._isRecording);
        this.notifyPropertyChange('status', this._status);
    }

    private stopRecording() {
        this._isRecording = false;
        this._status = 'Recording saved';
        this.stopTimer();
        
        this._recordings.unshift({
            title: `Recording ${this._recordings.length + 1}`,
            duration: this._recordingTime,
            date: new Date()
        });
        
        this.notifyPropertyChange('isRecording', this._isRecording);
        this.notifyPropertyChange('status', this._status);
        this.notifyPropertyChange('recordings', this._recordings);
    }

    private startTimer() {
        let seconds = 0;
        this._timer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            this._recordingTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            this.notifyPropertyChange('recordingTime', this._recordingTime);
        }, 1000);
    }

    private stopTimer() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
            this._recordingTime = '0:00';
            this.notifyPropertyChange('recordingTime', this._recordingTime);
        }
    }

    private loadRecordings() {
        this._recordings = [];
        this.notifyPropertyChange('recordings', this._recordings);
    }
}