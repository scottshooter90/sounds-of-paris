import React from 'react';
import ReactDOM from 'react-dom';
import places from './places.json';

const config = {
	'titlePrefix': 'Sounds of',
	'titleSuffix': 'Paris'
};

const bodyStyle = `
	font-family: Lora, "Helvetica Neue", Helvetica, Arial, sans-serif;
	line-height: 1.5
`;

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

class App extends React.Component {
	state = {
		mainAudioPlaying: false,
		currentPlaceIndex: 0,
		images: {}
	}
	componentDidMount () {
		for (var index in places) {
			if (!this.state.images.hasOwnProperty (places[index].image)) {
				this.setState ({images: Object.assign (
					{},
					this.state.images,
					{[places[index].image]: {fetching: true, fetched: false, image: null}}
				)});
				fetch (places[index].image, {mode: 'no-cors'})
					.then (response => this.setState ({images: Object.assign (
						{},
						this.state.images,
						{[places[index].image]: {fetching: false, fetched: true, image: response}}
					)}));
			}
		}
	}
	mainAudio = React.createRef ();
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
	render () {
		return (
			<React.Fragment>
				<AudioPlayer
					playing={this.state.mainAudioPlaying}
					reference={this.mainAudio}
					file={places[this.state.currentPlaceIndex].audio}
				/>
				<BackgroundImage
					src={this.state.images.hasOwnProperty(places[this.state.currentPlaceIndex].image) ? this.state.images[places[this.state.currentPlaceIndex].image].image : 'loading'}
				/>
				<TitleBar/>
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

document.addEventListener (
	'DOMContentLoaded',
	() => {
		document.title = config.titlePrefix+' '+config.titleSuffix;
		document.body.style = bodyStyle;
		ReactDOM.render (<App/>, document.getElementById ('app'));
	}
);
