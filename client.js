import React from 'react';
import ReactDOM from 'react-dom';

const config = {
	'title': 'Sounds of Paris'
};

class TitleBar extends React.Component {
	style = {
		height: '100px',
		position: 'fixed',
		backgroundColor: 'lightgrey'
	};
	render () {
		return (
			<header style={this.style}>
				{config.title}
			</header>
		);
	}
};

const app = (
	<React.Fragment>
		<TitleBar/>
	</React.Fragment>
);

document.addEventListener (
	'DOMContentLoaded',
	() => {
		document.title = config.title;
		ReactDOM.render (app, document.getElementById('app'));
	}
);
