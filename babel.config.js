module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@assets': './src/assets',
          '@config': './src/config',
          '@theme': './src/theme',
          '@navigation': './src/presentation/navigation',
          '@screens': './src/presentation/screens',
        },
      },
    ],
  ],
};
