import ReactDOMServer from 'react-dom/server';
import express from 'express';
import React from 'react';
import fs from 'fs';
import {App} from './src.js';

const index = fs.readFileSync('./docs/index.html', 'utf8');
var app = express ();
app.use ('/docs', express.static ('static'));
app.get ('**', (req, res) => {
	const html = ReactDOMServer.renderToString (<App/>);
	const finalHtml = index.replace('<!-- APP -->', html);
	res.set ('Cache-Control', 'public, max-age=600, s-maxage=1200');
	res.send (finalHtml)
});

app.listen (3000, function () {console.log ('WebApp listening on port 3000')});
