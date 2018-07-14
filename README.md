Chatty
=====================

A lightweight chat application that allows multiple users to communicate in real time.

Chatty users do not create accounts, but instead set their display name upon entering the chat. They can change their name as many times as they want, or leave it as the default 'Anonymous'.

Chatty was created using React, Webpack, and Babel, as well as other technologies listed in the dependencies.

### Usage

1. Fork and then clone this repository.

```
git clone git@github.com:[YOUR GITHUB USERNAME]/react-simple-boilerplate.git
```

2. Install dependencies from the react-simple-boilerplate directory using the `npm install` command.

```
npm install
```

3. Install dependencies from the chatty_server directory using the `npm install` command.

```
npm install
```

3. This project runs on two servers. In separate terminal tabs or windows, open the 'react-simple-boilerplate' and 'chatty_server' directories. Run the `npm start` command in both of them. The app will be served at <http://localhost:3000/>

```
npm start
```
4. Visit <http://localhost:3000/> in your browser.

### Screenshots

![Screenshot of Chatty home page](https://github.com/TheresaCampbell/react-simple-boilerplate/blob/master/docs/chatty.png?raw=true)
![Screenshot of methods that set App component state when messages are sent and display names are updated](https://github.com/TheresaCampbell/react-simple-boilerplate/blob/master/docs/state-setting-methods.png?raw=true)
![Screenshot of WebSocket server](https://github.com/TheresaCampbell/react-simple-boilerplate/blob/master/docs/websocket-server.png?raw=true)

### Dependencies

* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* css-loader
* eslint
* eslint-plugin-react
* express
* node-sass
* random-color
* react
* react-dom
* sass-loader
* sockjs-client
* style-loader
* uuid
* webpack
* webpack-dev-server
* ws