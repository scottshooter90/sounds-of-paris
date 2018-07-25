import React from 'react';
import ReactDOM from 'react-dom';
import places from './places.json';

const config = {
	'titlePrefix': 'Sounds of',
	'titleSuffix': 'Paris'
};

const bodyStyle = `
	font-family: Lora, "Helvetica Neue", Helvetica, Arial, sans-serif
`;

class BackgroundImage extends React.Component {
	static defaultProps = {
		src: ''
	};
	divStyle = {
		backgroundImage: 'url("'+this.props.src+'")',
		height: '100%',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	}
	render () {
		return (
			<div style={this.divStyle}>
			</div>
		);
	}
}

class TitleBar extends React.Component {
	style = {
		position: 'absolute',
		left: '0px',
		top: '0px',
		color: 'white',
		width: '100%',
		paddingLeft: '10px',
		userSelect: 'none'
	};
	prefixStyle = {
		fontWeight: 'normal'
	};
	render () {
		return (
			<header style={this.style}>
				<h2>
					<span style={this.prefixStyle}>
						{config.titlePrefix.toUpperCase ()+' '}
					</span>
					{config.titleSuffix.toUpperCase ()}
				</h2>
			</header>
		);
	}
};

class AudioPlayer extends React.Component {
	static defaultProps = {
		reference: null
	};
	render () {
		return (
			<audio ref={this.props.reference}>
				<source src={places[0].audio}/>
			</audio>
		);
	}
};

class DescriptionSection extends React.Component {
	style = {
		position: 'absolute',
		top: '80px',
		bottom: '80px',
		color: 'white',
		fontWeight: 'lighter',
		padding: '10px',
		marginLeft: '20px',
		marginRight: '20px',
		overflow: 'auto'
	}
	render () {
		return (
			<div style={this.style}>
				<h3>
					{this.props.title}
				</h3>
				<p>
					{this.props.description}
				</p>
			</div>
		)
	}
}

class MediaBar extends React.Component {
	static defaultProps = {
		playing: false,
		playPause: () => {}
	};
	style = {
		position: 'absolute',
		bottom: '0px',
		left: '0px',
		paddingLeft: '10px',
		color: 'white',
		cursor: 'pointer',
		userSelect: 'none'
	};
	render () {
		return (
			<footer>
				<h2 style={this.style} onClick={this.props.playPause}>
					{this.props.playing ? 'PAUSE' : 'PLAY'}
				</h2>
			</footer>
		);
	}
}

class App extends React.Component {
	state = {
		mainAudioPlaying: false
	}
	mainAudio = React.createRef ();
	playPauseMainAudio = () => {
		if (this.mainAudio.current) {
			if (this.state.mainAudioPlaying) {
				this.mainAudio.current.pause ();
				this.setState ({mainAudioPlaying: false});
			} else {
				this.mainAudio.current.play ();
				this.setState ({mainAudioPlaying: true});
			}
		} else {
			console.log ("audio doesn't exist");
		}
	}
	render () {
		return (
			<React.Fragment>
				<AudioPlayer
					reference={this.mainAudio}
				/>
				<BackgroundImage
					src={places[0].image}
				/>
				<TitleBar/>
				<DescriptionSection
					title={places[0].name}
					description={places[0].description}
				/>
				<MediaBar
					playing={this.state.mainAudioPlaying}
					playPause={this.playPauseMainAudio}
				/>
			</React.Fragment>
		);
	}
}

document.addEventListener (
	'DOMContentLoaded',
	() => {
		document.title = config.titlePrefix + ' ' +config.titleSuffix;
		document.body.style = bodyStyle;
		ReactDOM.render (<App/>, document.getElementById ('app'));
	}
);
