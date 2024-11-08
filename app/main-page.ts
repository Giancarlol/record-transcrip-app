import { EventData, Page } from '@nativescript/core';
import { RecorderViewModel } from './components/recorder/recorder-view-model';
import { initializeAudioSession } from './services/audio-service';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    
    // Initialize audio session
    initializeAudioSession();
    
    // Set up view model
    if (!page.bindingContext) {
        page.bindingContext = new RecorderViewModel();
    }
}