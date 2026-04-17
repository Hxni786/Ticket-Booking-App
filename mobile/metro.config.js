const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable safe module resolution for packages like react-navigation 7
config.resolver.unstable_enablePackageExports = true;

module.exports = config;
