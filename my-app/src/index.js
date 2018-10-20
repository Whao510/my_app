import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//全局样式
import './stylesheets/main.scss';

import * as serviceWorker from './serviceWorker';

//路由
import {HashRouter as Router} from 'react-router-dom'; 

//antd-mobile全局样式
import 'antd-mobile/dist/antd-mobile.css';

//swiper
import 'swiper/dist/css/swiper.min.css'

//全局配置
import './modules/config'
ReactDOM.render(
<Router>
    <App />
</Router>
, document.getElementById('root'));

serviceWorker.unregister();
