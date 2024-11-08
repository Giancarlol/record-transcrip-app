import { Application } from '@nativescript/core';

export function setupErrorHandling(): void {
    Application.on(Application.uncaughtErrorEvent, (args) => {
        console.error('Uncaught error:', args.error);
    });

    if (global.isIOS) {
        NSSetUncaughtExceptionHandler((error) => {
            console.error('iOS Native Exception:', error);
        });
    }
}