import React from 'react'
import ReactDOM from 'react-dom'
import store from './LocalStore'
import config from '../config'
import util from './AppUtil'
import Planet from './components/Planet'
import PlanetSimple from './components/Planet'
import Species from './components/Species'
import Stars from './components/Stars'
import Energy from './components/Energy'
import Reset from './components/Reset'

function $(id) { return util.$( id ) };

const START_ENERGY = 1;

var app =
{
	startApp: function() {
		console.log("startApp() "+location.href);

		this.planetStartTime = store.getItem('planet-start-time');

		if (!this.planetStartTime) {
			this.newGame();
		} else {
			//this.energy = BigInt(parseInt(store.getItem('energy')));
			this.energy = parseInt(store.getItem('energy'));
			if (!this.energy) {
				this.energy = START_ENERGY;
				this.updateEnergy(this.energy);
			}
			console.log("continuing planet "+this.planetStartTime);
		}
		
		this.addEnergyEventListeners();
		ReactDOM.render( <Energy amount={this.energy} />, $('energy-container') );
		ReactDOM.render( <Stars />, $('stars-container') );
		ReactDOM.render( <PlanetSimple />, $('planet-container') );
		this.makeSpecies( this.planetStartTime );
		ReactDOM.render( <Reset />, $('reset-container') );
	},

	newGame: function() {
		console.log("newGame()");
		//this.energy = BigInt(START_ENERGY);
		this.energy = START_ENERGY;
		store.setItem('planet-start-time', Date.now());
		this.updateEnergy();
	},

	addEnergyEventListeners: function() {
		window.addEventListener('spend', (e) => {
			console.log("spend: " + e.detail);
			this.updateEnergy( e.detail * -1 );
		});
		window.addEventListener('generate', (e) => {
			this.updateEnergy( e.detail );
		});
	},

	updateEnergy: function(addAmount) {
		//console.log("updateEnergy( "+addAmount+" )");
		if (!addAmount) addAmount = 0;
		if (!this.energy) this.energy = 0;
		//this.energy += BigInt(addAmount);
		this.energy += addAmount;
		store.setItem('energy', this.energy);
		util.dispatch('energy-update', this.energy);
	},

	makeSpecies: function( planetStartTime ) {
		console.log("makeSpecies( "+planetStartTime+" )");
		let arr = [];
		config.forEach(species => {
			arr.push(<Species key={'species-'+species.name} data={species} state={{}}  />);
		})
		ReactDOM.render( arr, $('species-container') );
	},

	reloadApp: function() {
		window.location = ('/');
	}
};

document.addEventListener('DOMContentLoaded', function() {
	app.startApp();
});


export default app;

