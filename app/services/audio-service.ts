import { isIOS } from '@nativescript/core';

export function initializeAudioSession(): void {
    if (isIOS) {
        try {
            const audioSession = AVAudioSession.sharedInstance();
            audioSession.setCategoryWithOptionsError('PlayAndRecord', 1);
            audioSession.setActiveError(true);
        } catch (error) {
            console.error('Failed to initialize audio session:', error);
        }
    }
}