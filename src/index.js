import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "./index.css";

if (module.hot) module.hot.accept()

ReactDOM.render(
    <App />,
    document.getElementById('root')
)