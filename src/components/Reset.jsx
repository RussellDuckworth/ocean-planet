import React, { Component } from 'react'
import store from '../LocalStore'
import app from '../app'

export default class Reset extends Component
{
	click() {
		store.deleteEverything();
		app.reloadApp();
	}

	render() {
		return (
			<div >
				<div style={{height: '444px'}}></div>
				<button className='button'
					onClick={(e) => this.click(e)}
				>Reset Planet</button>
				<div style={{height: '222px'}}></div>
			</div>
		)
	}
}
