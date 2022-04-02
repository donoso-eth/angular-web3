const webpack = require('webpack');
module.exports = {
  node: {global: true},
  resolve: {
    fallback: {
        buffer: require.resolve('buffer/'),
    },
},
plugins: [
  new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
  }),
]
  };