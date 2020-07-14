import React, { Component } from 'react'
import util from '../AppUtil'
import './Energy.css'

export default class Energy extends Component
{
	render() {
		return(
			<div id='energy'>
				<div className='energy-icon icon-energy tint-ui'></div>
				<div id='energy-amount'>{util.shortNumber(this.props.amount)}</div>
			</div>
		)
	}

	componentDidMount() {
		this.amountDisplay = util.$('energy-amount');
		window.addEventListener('energy-update', (e) => {
			this.amountDisplay.innerText = util.shortNumber(e.detail);
		})
	}
}
