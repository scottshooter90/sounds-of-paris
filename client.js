import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './src.js';

document.addEventListener (
	'DOMContentLoaded',
	() => document.getElementById ('go').addEventListener ('click', () => ReactDOM.render (<App/>, document.getElementById ('app')))
);
