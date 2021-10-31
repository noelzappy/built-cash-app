module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            screens: './src/screens',
            theme: './src/theme',
            utils: './src/utils',
            languages: './src/languages',
            constants: './src/constants',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
