const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
const mobileModules = path.resolve(__dirname, 'node_modules');

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react' || moduleName.startsWith('react/')) {
    return context.resolveRequest(context, path.join(mobileModules, moduleName), platform);
  }
  if (moduleName === 'react-dom' || moduleName.startsWith('react-dom/')) {
    return context.resolveRequest(context, path.join(mobileModules, moduleName), platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
