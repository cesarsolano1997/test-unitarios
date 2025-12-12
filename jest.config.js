module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-reanimated|@react-navigation|react-native-worklets)/)'

  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js', './node_modules/react-native-gesture-handler/jestSetup.js']
}
