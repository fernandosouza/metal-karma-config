'use strict';

const babelPluginTransformNodeEnvInline = require('babel-plugin-transform-node-env-inline');
const karmaChai = require('karma-chai');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaMocha = require('karma-mocha');
const karmaSinon = require('karma-sinon');
const karmaSourceMapSupport = require('karma-source-map-support');
const karmaWebpack = require('karma-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function (config) {
  config.set({
  	plugins: [
    	karmaChai,
  		karmaChromeLauncher,
    	karmaMocha,
    	karmaSourceMapSupport,
			karmaSinon,
			karmaWebpack
  	],

    frameworks: ['mocha', 'chai', 'sinon', 'source-map-support'],

    files: [
			'test/**/*.js'
		],

		webpack: {
			module: {
				rules: [
					{
						test: /\.scss$/,
						use: ExtractTextPlugin.extract({
							fallback: "style-loader",
							use: "css-loader"
						})
					}
				]
			},
			plugins: [
				new ExtractTextPlugin("styles.css"),
			]
		},

		webpackMiddleware: {
      noInfo: true
    },

    preprocessors: {
      'test/**/*.js': ['webpack']
    },

    browsers: ['Chrome']
  });
};
