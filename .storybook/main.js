
// const path = require('path')

// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// module.exports = {
//   core: {
//     builder: {
//       name: 'webpack5',
//       options: {
//         lazyCompilation: true,
//       },
//     }
//   },
//   stories: [
//     // Paths to the story files
//     // '../src/shared/components/**/*.stories.mdx',
//     // '../src/shared/components/**/*.stories.@(js|jsx|ts|tsx)',
//    '../src/**/*.stories.mdx', 
//    '../src/**/*.stories.@(js|jsx|ts|tsx)',
//   ],
//   addons: [
//     '@storybook/addon-links',
//     '@storybook/addon-essentials',
//     // '@storybook/addon-controls'
//     {
     
//       name: '@storybook/addon-postcss',
//       options: {
//         postcssLoaderOptions: {
//           implementation: require('postcss'),
//         },
//       },
//     },
//   ],
//   // typescript: {
//   //   reactDocgen: false
//   // },

//   webpackFinal: async config =>
//   {
//     config.resolve.roots = [
//       path.resolve(__dirname, '../public'),
//       'node_modules',
//     ];

//     // config.resolve.alias = {
//     //   ...config.resolve?.alias,
//     //   '@': [path.resolve(__dirname, '../src/'), path.resolve(__dirname, '../')],
//     // };
//     // config.resolve.plugins = [
//     //   ...(config.resolve.plugins || []),
//     //   new TsconfigPathsPlugin({
//     //     extensions: config.resolve.extensions,
//     //   }),
//     // ]
  
//     config.module.rules.push({
//       test: /\.scss$/,
//       exclude: /node_modules(?!\/@storybook\/addon-info)/,
//       use: [
//         'style-loader',
//         'css-loader',
//         // 'postcss-loader',
//         'sass-loader', 
//         {
//           loader: 'sass-loader',
//           options: {
//             importLoaders: true,
//             indentedSyntax: true
//           }
//         }
//       ],
//       include: path.resolve(__dirname, '../'),
//     });

//     return config;
//   }

// };


module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  /** Expose public folder to storybook as static */
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-css-modules-preset',
    'storybook-addon-next-router',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
};