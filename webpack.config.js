/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  resolve: {
    alias: {
			'@src': path.resolve(__dirname, 'src'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@actions': path.resolve(__dirname, 'src/actions'),
			'@pages': path.resolve(__dirname, 'src/pages')
		}
  }
}