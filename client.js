import React from 'react';
import ReactDOM from 'react-dom';
import places from './places.json';

const config = {
	'titlePrefix': 'Sounds of',
	'titleSuffix': 'Paris'
};

class BackgroundImage extends React.Component {
	static defaultProps = {
		src: ''
	};
	divStyle = {
		height: '100%',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	}
	render () {
		return (
			<div style={Object.assign ({}, this.divStyle, {backgroundImage: 'url("'+this.props.src+'")'})}>
			</div>
		);
	}
}

class AudioPlayer extends React.Component {
	static defaultProps = {
		playing: false,
		reference: null,
		file: ''
	};
	shouldComponentUpdate (nextProps) {
	    return (this.props.file !== nextProps.file);
	}
	componentDidUpdate () {
		if (this.props.playing) {
			this.props.reference.current.play ();
		}
	}
	render () {
		if (this.props.reference.current) {
			this.props.reference.current.load ();
		}
		return (
			<audio ref={this.props.reference}>
				<source src={this.props.file}/>
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
	shouldComponentUpdate (nextProps) {
		return nextProps.description !== this.props.description || nextProps.title !== this.props.title
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

class BasicButton extends React.Component {
	static defaultProps = {
		onClick: () => {},
		width: 'auto',
		children: 'SUBMIT'
	};
	style = {
		color: 'white',
		cursor: 'pointer',
		userSelect: 'none',
		display: 'inline-block',
		width: this.props.width,
		margin: '10px'
	};
	render () {
		return (
			<h2 style={this.style} onClick={this.props.onClick}>
				{this.props.children}
			</h2>
		);
	}
}

const preloadImage = (imageUrl, onLoad, onError) => {
	var imageObj = new Image ();
	imageObj.onLoad = onLoad;
	imageObj.onError = onError;
	imageObj.src = imageUrl;
	return imageObj;
}

class App extends React.Component {
	state = {
		mainAudioPlaying: false,
		currentPlaceIndex: 0
	}
	mainAudio = React.createRef ();
	images = [];
	skipMainAudio = () => {
		if (this.state.currentPlaceIndex == places.length - 1) {
			this.setState ({currentPlaceIndex: 0})
		} else {
			this.setState ({currentPlaceIndex: this.state.currentPlaceIndex + 1})
		}
	}
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

	componentDidMount () {
		window.addEventListener ('load', () => this.images = places.map (place => preloadImage (place.image)));
	}

	render () {
		var currentImage = places[this.state.currentPlaceIndex].image;
		return (
			<React.Fragment>
				<AudioPlayer
					playing={this.state.mainAudioPlaying}
					reference={this.mainAudio}
					file={places[this.state.currentPlaceIndex].audio}
				/>
				<BackgroundImage
					src={currentImage}
				/>
				<DescriptionSection
					title={places[this.state.currentPlaceIndex].name}
					description={places[this.state.currentPlaceIndex].description}
				/>
				<footer style={{position: 'absolute', bottom: '0px', left: '0px'}}>
					<BasicButton
						onClick={this.playPauseMainAudio}
						width="80px"
					>
						{this.state.mainAudioPlaying ? 'PAUSE' : 'PLAY'}
					</BasicButton>
					<BasicButton
						onClick={this.skipMainAudio}
					>
						SKIP
					</BasicButton>
				</footer>
			</React.Fragment>
		);
	}
}

//document.addEventListener (
//	'DOMContentLoaded',
//	() => ReactDOM.render (<App/>, document.getElementById ('app'))
//);

document.addEventListener (
	'DOMContentLoaded',
	() => document.getElementById ('go').addEventListener ('click', () => ReactDOM.render (<App/>, document.getElementById ('app')))
);
