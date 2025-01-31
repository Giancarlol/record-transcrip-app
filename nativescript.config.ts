import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.app',
  appPath: 'app',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  },
  ios: {
    discardUncaughtJsExceptions: false
  },
  webpackConfigPath: 'webpack.config.js',
  useLibs: true,
  environmentVariables: {
    NODE_ENV: 'development'
  }
} as NativeScriptConfig;