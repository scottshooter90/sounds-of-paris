import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './src.js';

document.addEventListener (
	'DOMContentLoaded',
	() => ReactDOM.render (<App/>, document.getElementById ('app'))
	//() => document.getElementById ('go').addEventListener ('click', () => ReactDOM.render (<App/>, document.getElementById ('app')))
);
