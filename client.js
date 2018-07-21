import React from 'react';
import ReactDOM from 'react-dom';

const config = {
	'titlePrefix': 'Sounds of',
	'titleSuffix': 'Paris'
};

const bodyStyle = `
	font-family: Lora,"Helvetica Neue",Helvetica,Arial,sans-serif;
`;

class BackgroundImage extends React.Component {
	divStyle = {
		backgroundImage: 'url("'+this.props.src+'")',
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
		position: 'absolute',
		left: '0px',
		top: '0px',
		color: 'white',
		width: '100%',
		paddingLeft: '10px'
	};
	render () {
		return (
			<header style={this.style}>
				<h2>
					<span style={{fontWeight: 'normal'}}>
						{config.titlePrefix.toUpperCase ()+' '}
					</span>
					{config.titleSuffix.toUpperCase ()}
				</h2>
			</header>
		);
	}
};

class AudioPlayer extends React.Component {
	render () {
		return (
			<audio id="myAudio">
				<source src="27.01.18.Aligre_low.mp3"/>
			</audio>
		);
	}
};

class DescriptionSection extends React.Component {
	title = 'Gare Du Nord';
	style = {
		position: 'absolute',
		top: '80px',
		bottom: '80px',
		color: 'white',
		fontWeight: 'lighter',
		padding: '10px',
		marginLeft: '20px',
		marginRight: '20px',
		overflow: 'scroll'
	}
	render () {
		return (
			<div style={this.style}>
				<h3>
					{this.title}
				</h3>
				<p>
In addition to being a national railway terminal, Gare du Nord is also a massive regional MTR interchange. The recording starts at the Eurostar-reserved platforms, goes on through to the national and regional departure areas, and then continues down to the lower levels where the underground express service operates. The last part follows the interchange tunnel linking to the La Chapelle station on Metro line 2. The total distance, on foot, is close to 800m and is spent entirely underground.
				</p>
			</div>
		)
	}
}

class MediaBar extends React.Component {
	state = {
		playing: false
	};
	style = {
		position: 'absolute',
		bottom: '0px',
		left: '0px',
		paddingLeft: '10px',
		color: 'white',
		cursor: 'pointer'
	};
	playAudio = () => {
		const tmp = document.getElementById('myAudio');
		tmp.play ();
		this.setState ({playing: true});
	}
	pauseAudio = () => {
		const tmp = document.getElementById('myAudio');
		tmp.pause ();
		this.setState ({playing: false});
	}
	render () {
		return (
			<footer>
				<h2 style={this.style} onClick={()=>this.state.playing ? this.pauseAudio() : this.playAudio()}>{this.state.playing ? 'PAUSE' : 'PLAY'}</h2>
			</footer>
		);
	}
}

const app = (
	<React.Fragment>
		<AudioPlayer/>
		<BackgroundImage
			src='./gare-bg.png'
		/>
		<TitleBar/>
		<DescriptionSection/>
		<MediaBar/>

	</React.Fragment>
);

document.addEventListener (
	'DOMContentLoaded',
	() => {
		document.title = config.titlePrefix + ' ' +config.titleSuffix;
		document.body.style = bodyStyle;
		ReactDOM.render (app, document.getElementById('app'));
	}
);
