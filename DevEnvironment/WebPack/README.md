# webpack.config.js

This file will controle the ocnfiguration of the webpack.
It allows to add modules like the babel module but it doesn't control totally that module.

# .babelrc

We need this file to tell babel how it shoudl work

# sass loader

when setting the webpack config the order matters, because we need to convert the sass to css and then run the css-loader, otherwise it will not understand the language
one way to webpack know the existance of the scss is to import it inside the js file

# style-loader

it can extract the styles from the bundle

# mini-css-extract-plugin

in this case the css will be extracted from the budle and saved on a separate file with this plugin

# SASS is a pre-rocessor language

# postCSS is a post processor.

it is a library that can modify our code after we written it
it is an independent library and it is not mandatory to use with webpack. it is usefull to combine in order to automoate our process
we need plugins to allow postcss workerby itself it only consumes css and spits css
https://www.postcss.parts/

# ESlint

Linting is the process of reviewing your code for consistencies.
it's essentially a code quality reviewer

Tehre are several libraries. In this case it is used the eslint.org
