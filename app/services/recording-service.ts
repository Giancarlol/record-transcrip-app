import { knownFolders, path, File, Folder, isAndroid } from '@nativescript/core';
import { Recording } from '../models/recording';

declare const android: any;
declare const java: any;
declare const AVAudioSession: any;
declare const AVAudioRecorder: any;
declare const NSURL: any;
declare const NSDictionary: any;

export class RecordingService {
    private recorder: any;
    private currentRecording: string;
    private recordingsFolder: Folder;

    constructor() {
        this.recordingsFolder = knownFolders.documents().getFolder('recordings');
        this.setupFolder();
    }

    private setupFolder() {
        if (!this.recordingsFolder.exists()) {
            this.recordingsFolder.create();
        }
    }

    async startRecording(): Promise<void> {
        if (isAndroid) {
            return this.startAndroidRecording();
        } else {
            return this.startiOSRecording();
        }
    }

    private async startAndroidRecording(): Promise<void> {
        try {
            const MediaRecorder = android.media.MediaRecorder;
            this.recorder = new MediaRecorder();
            this.currentRecording = path.join(this.recordingsFolder.path, `recording-${Date.now()}.m4a`);

            this.recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            this.recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            this.recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
            this.recorder.setOutputFile(this.currentRecording);
            
            await new Promise<void>((resolve, reject) => {
                this.recorder.prepare();
                this.recorder.start();
                resolve();
            });
        } catch (error) {
            console.error('Error starting Android recording:', error);
            throw error;
        }
    }

    private async startiOSRecording(): Promise<void> {
        try {
            const session = AVAudioSession.sharedInstance();
            await session.setCategoryWithOptionsError('PlayAndRecord', 1);
            await session.setActiveError(true);

            this.currentRecording = path.join(this.recordingsFolder.path, `recording-${Date.now()}.m4a`);
            const url = NSURL.fileURLWithPath(this.currentRecording);

            const settings = NSDictionary.dictionaryWithObjectsForKeys([
                44100.0,
                4,
                1,
                16,
                AVAudioQualityMedium
            ], [
                'AVSampleRateKey',
                'AVFormatIDKey',
                'AVNumberOfChannelsKey',
                'AVLinearPCMBitDepthKey',
                'AVEncoderAudioQualityKey'
            ]);

            this.recorder = AVAudioRecorder.alloc().initWithURLSettingsError(url, settings);
            this.recorder.prepareToRecord();
            this.recorder.record();
        } catch (error) {
            console.error('Error starting iOS recording:', error);
            throw error;
        }
    }

    async stopRecording(): Promise<void> {
        try {
            if (isAndroid) {
                if (this.recorder) {
                    this.recorder.stop();
                    this.recorder.release();
                }
            } else {
                if (this.recorder) {
                    this.recorder.stop();
                }
                const session = AVAudioSession.sharedInstance();
                await session.setActiveError(false);
            }
        } catch (error) {
            console.error('Error stopping recording:', error);
            throw error;
        }
    }

    getRecordings(): Recording[] {
        const recordings: Recording[] = [];
        const files = this.recordingsFolder.getEntities();
        
        files.forEach(file => {
            if (file instanceof File && file.name.endsWith('.m4a')) {
                recordings.push(new Recording(
                    file.path,
                    new Date(parseInt(file.name.split('-')[1]))
                ));
            }
        });

        return recordings.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
}