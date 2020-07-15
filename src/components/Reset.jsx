import React, { Component } from 'react'
import store from '../LocalStore'
import util from '../AppUtil'
import app from '../app'

export default class Reset extends Component
{
	click() {
		store.deleteEverything();
		util.$('reset-button').innerText = "So long and thanks for all the fish"
		util.wait(1200)
		.then( () => {
			app.reloadApp();
		})
	}

	render() {
		return (
			<div >
				<div style={{height: '444px'}}></div>
				<button
					id='reset-button'
					className='button'
					onClick={(e) => this.click(e)}
				>Reset Planet</button>
				<div style={{height: '222px'}}></div>
			</div>
		)
	}
}
