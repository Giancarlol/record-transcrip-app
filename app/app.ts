import { Application } from '@nativescript/core';
import { setupErrorHandling } from './utils/error-handler';

// Initialize error handling
setupErrorHandling();

// Run the application
Application.run({ moduleName: 'app-root' });