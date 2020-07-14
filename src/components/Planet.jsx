import React, { Component } from 'react'
import store from '../LocalStore'
import app from '../app'
import './Planet.css'

export default class Planet extends Component
{
	click() {
		console.warn("planet click "+this.clicks)
		if (this.clicks++ > 9) {
			store.deleteEverything();
			app.reloadApp();
		}
	}

	render() {
		this.clicks = 0;
		return (
			<div
				className='planet-new'
				onClick={(e) => this.click(e)}
			>
				<div className='planet-new overlay'>
					<div className='planet-new shadow'></div>
				</div>
			</div>
		)
	}
}
