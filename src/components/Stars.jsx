import React, { Component } from 'react'
import util from '../AppUtil'
import './Stars.css'

const NUM_STARS = 500;

export default class Stars extends Component
{
	render() {
		let stars = [];
		for (let i = NUM_STARS; i > 0; i--) {
			stars.push(<div key={'star'+i} className='star' style={{
				opacity: Math.max(0.1, (Math.random()*0.6) ),
				left: (Math.random() * document.body.clientWidth)+'px',
				top: (Math.random() * document.body.clientHeight*2)+'px'
			}} />)
		}
		return(<div id='stars'>{stars}</div>)
	}

	componentDidMount() {
		this.stars = util.$('stars');
		document.addEventListener('scroll', () => {
			this.stars.style.top =
				(document.documentElement.scrollTop * -0.33)+'px';
		})
	}
}
