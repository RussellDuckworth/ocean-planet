import React, { Component } from 'react'
import store from '../LocalStore'
import util from '../AppUtil'
import app from '../app'
import './Species.css'

class CostDisplay extends Component
{
	render() {
		let addClass = '';
		if (this.props.addClass) {
			addClass = this.props.addClass;
		}
		return(
			<div
				id={this.props.name+'-cost-'+addClass}
				className={'cost-container '+addClass}>
				<div className='cost-icon icon-energy' ></div>
				<div className='cost' >{util.shortNumber(this.props.cost)}</div>
			</div>
		)
	}
}

export default class Species extends Component
{
	constructor(props) {
		super(props);
		this.nameDiv = React.createRef();
		this.speciesDiv = React.createRef();
		this.portrait = React.createRef();
		this.robotButon = React.createRef();
		this.statusText = React.createRef();
		this.name = props.data.name;
		this.duration = parseInt(props.data.duration) * 1000;
		this.production = props.data.production;
		this.cost = props.data.cost;
		this.mcost = props.data.mcost;
		this.image = props.data.image;
		this.count = parseInt(store.getItem(this.name+'-count'));
	}

	click() {
		console.log(this.name+" click");
		this.startGenerate();
	}

	clickPortrait() {
		console.log(this.name+" clickPortrait");
		if (this.animating) return;
		if (app.energy >= this.cost) {
			util.rmClass(this.portrait.current, 'press-me');
			this.oneMore();
			this.portrait.current.style.animation = '';
			let animationDuration = 250;
			this.portrait.current.style.animation = 'pressed '+animationDuration+'ms 0s 1 linear'
			this.animating = true;
			util.wait(animationDuration)
			.then( () => {
				this.animating = false;
				this.portrait.current.style.animation = ''
			})
			util.dispatch('spend', this.cost)
		} else {
			console.warn("you cannot afford more "+this.name);
			this.flashError();
		}
	}

	oneMore() {
		store.setItem( (this.name+'-count'), ++this.count );
		this.updateNameDisplay();
		this.startGenerate();
	}

	flashError() {
		util.addClass(this.speciesDiv.current, 'error');
		util.wait( 500 )
		.then( () => {
			util.rmClass(this.speciesDiv.current, 'error');
		})
	}

	updateNameDisplay() {
		let s = '';
		if (this.count === 1) {
			s = "1 "+util.cap(this.name);
		} else {
			s = this.count + " "+util.cap(this.props.data.namep);
		}
		if (this.count !== 0) {
			s += " = " + util.shortNumber(this.production * this.count);
		} else {
			s = util.cap(this.name);
		}
		this.nameDiv.current.innerText = s;
	}

	activateRobot() {
		util.rmClass(this.robotButon.current, 'gray');
		util.addClass(this.robotButon.current, 'tint-photo');
		util.rmClass(this.robotButon.current, 'affordable');
		util.addClass(util.$(this.name+'-cost-robot'), 'invisible');
	}

	clickRobot(e) {
		console.log(this.name+" clickRobot");
		if (this.robot) return;
		if (app.energy >= this.mcost) {
			this.robotButon.current.style.animation = 'pressed 250ms 0s 1 linear'
			this.robot = true;
			store.setItem(this.name+'-robot', true);
			this.startGenerate();
			util.dispatch('spend', this.mcost);
			this.activateRobot();
		} else {
			console.warn("you cannot afford the "+this.name+" robot");
			e.stopPropagation();
			this.flashError();
		}
	}

	render() {
		return (
			<div
				className='species-container'
				onClick={(e) => this.click(e)}
			>
				<div
					ref={this.nameDiv}
					className='name'
					onClick={(e) => this.click(e)}
				></div>
				<div
					ref={this.statusText}
					className='status-text'
				>.</div>

				<div
					ref={this.speciesDiv}
					className='species ocean-glow'
				>
					<div
						ref={this.portrait}
						id={this.name+'-portrait'}
						className='portrait tint-photo'
						onClick={(e) => this.clickPortrait(e)}
					></div>

					<div
						className='progress-container'
						onClick={(e) => this.click(e)}
					>
						<div id={this.name+'-progress'} className='progress' ></div>
					</div>
					<div
						ref={this.robotButon}
						id={this.name+'-robot'}
						className='portrait robot gray'
						onClick={(e) => this.clickRobot(e)}
					></div>
					<CostDisplay cost={this.cost} name={this.name} />
					<CostDisplay cost={this.mcost} name={this.name} addClass='robot' />
				</div>
			</div>
		)
	}

	componentDidMount() {
		let bg = 'url(/img/'+this.image+')';
		this.portrait.current.style.backgroundImage = bg;
		this.robot = store.getItem(this.name+'-robot');

		if (this.robot) {
			this.activateRobot();
		}

		if (!this.count) this.count = 0;
		this.updateNameDisplay();
		this.showAffordable();

		// new game bring attention to lipid
		if (this.name === 'lipid' && app.energy <= 1) {
			util.addClass(this.portrait.current, 'press-me');
		}

		this.restartHarvest();

		window.addEventListener('energy-update', (e) => {
			this.showAffordable();
		})
	}

	restartHarvest() {
		this.timeHarvestStart = store.getItem(this.name+'-harvest-start-time');
		let remainderTime = 0;

		if (this.timeHarvestStart > 0) {
			console.log(this.name + "restart harvest" );
			console.log(this.name+" timeHarvestStart = " +this.timeHarvestStart)
			let timeElapsed = Date.now() - this.timeHarvestStart;
			console.log(" timeElapsed: "+timeElapsed);
			let numHarvests = Math.floor(timeElapsed / this.duration);
			remainderTime = timeElapsed % this.duration;
			if (!this.robot) {
				console.log("no robot");
				if (numHarvests >= 1) {
					this.generate( this.production * this.count );
					store.removeItem(this.name+'-harvest-start-time');
				} else {
					console.log("restart manual harvest");
					this.startGenerate(remainderTime);
				}
			} else {
				console.log("robot");
				console.log(numHarvests+" offline harvests");
				if (numHarvests >= 1) {
					this.generate( this.production * this.count * numHarvests );
				}
			}
		}
		if (this.robot) {
			this.startGenerate(remainderTime);
		}
	}

	generate( amount ) {
		util.dispatch('generate', amount );
	}

	showAffordable() {
		let affordable = (app.energy >= this.cost);
		//console.log(this.name+" affordable: "+affordable);

		// dim if none, dim less if can buy first
		let opacity = 1;
		if (!this.count) {
			opacity = (affordable) ? 0.67 : 0.16;
		}
		this.speciesDiv.current.style.opacity = opacity;

		// change the portrait?
		if (affordable) {
			util.addClass(this.portrait.current, 'affordable');
			if (!this.generating) this.statusText.current.innerText = '';
		} else {
			util.rmClass(this.portrait.current, 'affordable');
		}

		// change the robot?
		if (!this.robot) {
			if (app.energy >= this.mcost) {
				util.addClass(this.robotButon.current, 'affordable');
				if (this.name === 'lipid') {
					util.addClass(this.robotButon.current, 'press-me');
				}
			} else {
				util.rmClass(this.robotButon.current, 'affordable');
			}
		}
	}

	startGenerate(timeElapsed = 0) {
		//console.log("startGenerate( "+timeElapsed+" )");
		if (!this.count) {
			console.warn("no count");
			return util.wait(100)
			.then( () => { this.clickPortrait() })
		}
		if (this.generating) return;

		let animationOffset = 0;
		if (timeElapsed) {
			animationOffset = timeElapsed * -1;
		} else {
			timeElapsed = 0;
		}

		const bar = util.$(this.name+'-progress');
		const anim = 'barload '+this.duration+'ms '+animationOffset+'ms 1 linear';
		bar.style.animation = anim;
		this.generating = true;
		let waitTime = this.duration + animationOffset;
		this.startGenerateTime = Date.now();

		if (timeElapsed === 0) {
			store.setItem(this.name+'-harvest-start-time', Date.now());
		}

		this.tickDownTime( waitTime );

		util.wait(waitTime)
		.then( () => {
			this.generate( this.production * this.count );
			this.generating = false;
			store.removeItem(this.name+'-harvest-start-time');
			bar.style.animation = '';
			if (this.robot) {
				util.rmClass(this.robotButon.current, 'auto-activate');
				util.wait(100)
				.then( () => {
					this.startGenerate();
					util.addClass(this.robotButon.current, 'auto-activate');
				})
			}
		})
	}

	tickDownTime( duration ) {
		let secondsRemaining = 
			Math.round((duration - (Date.now() - this.startGenerateTime))/1000);
		if (secondsRemaining === 0) {
			if (!this.robot) secondsRemaining = '+';
		}
		this.statusText.current.innerText = secondsRemaining;
		if (secondsRemaining > 0) {
			util.wait(1000)
			.then( () => {
				this.tickDownTime(duration);
			})
		}
	}
}
