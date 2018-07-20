import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
	<React.Fragment>
		React is working
	</React.Fragment>
);

document.addEventListener ('DOMContentLoaded', ()=>ReactDOM.render (App, document.getElementById('app')));
