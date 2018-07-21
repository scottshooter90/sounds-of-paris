import React from 'react';
import ReactDOM from 'react-dom';

const config = {
	'title': 'Sounds of Paris'
};

const bodyStyle = `
	font-family: sans-serif
`;

class BackgroundImage extends React.Component {
	divStyle = {
		backgroundImage: 'url("gare-bg.png")',
		height: '100%',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	}
	render () {
		return (
			<React.Fragment>
				<div style={this.divStyle}>
				</div>
			</React.Fragment>
		);
	}
}

class TitleBar extends React.Component {
	style = {
		height: '50px',
		position: 'absolute',
		left: '0px',
		top: '0px',
		backgroundColor: 'lightgrey',
		opacity: 0.5,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		paddingLeft: '10px'
	};
	render () {
		return (
			<header style={this.style}>
				{config.title}
			</header>
		);
	}
};

class MediaBar extends React.Component {
	style = {
		position: 'absolute',
		bottom: '0px',
		left: '0px',
		height: '50px',
		width: '100%',
		opacity: 0.5,
		display: 'flex',
		alignItems: 'center',
		paddingLeft: '10px',
		backgroundColor: 'lightgrey'
	};
	render () {
		return (
			<footer style={this.style}>
				PLAY
			</footer>
		);
	}
}

const app = (
	<React.Fragment>
		<BackgroundImage/>
		<TitleBar/>

		<MediaBar/>
	</React.Fragment>
);

document.addEventListener (
	'DOMContentLoaded',
	() => {
		document.title = config.title;
		document.body.style = bodyStyle;
		ReactDOM.render (app, document.getElementById('app'));
	}
);
