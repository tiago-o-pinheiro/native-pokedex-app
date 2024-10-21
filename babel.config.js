module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@assets': './src/assets',
          '@config': './src/config',
          '@actions': './src/actions',
          '@hooks': './src/shared/hooks',
          '@stores': './src/shared/stores',
          '@domain': './src/domain',
          '@infrasctructure': './src/infrastructure',
          '@theme': './src/theme',
          '@presentation': './src/presentation',
          '@navigation': './src/presentation/navigation',
          '@screens': './src/presentation/screens',
          '@components': './src/presentation/components',
        },
      },
    ],
  ],
};
