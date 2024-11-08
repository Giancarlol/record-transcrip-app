const webpack = require('@nativescript/webpack');

module.exports = (env) => {
  webpack.init(env);
  webpack.useConfig('typescript');

  webpack.chainWebpack((config) => {
    // Add any custom webpack configurations here
    config.optimization.minimize(false);
    
    // Handle platform-specific code
    config.resolve.extensions
      .prepend('.ios.ts')
      .prepend('.android.ts');
  });

  return webpack.resolveConfig();
};