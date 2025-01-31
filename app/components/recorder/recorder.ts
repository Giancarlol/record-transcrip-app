import { NavigatedData, Page } from '@nativescript/core';
import { RecorderViewModel } from './recorder-view-model';

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new RecorderViewModel();
}