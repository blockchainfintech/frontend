import React from 'react'
import '../Style/Header.css'

class Header extends React.Component {
	render () {
		return (
			<div className="Header-container">
				<span className="Header-title">OrWalk</span>
				<span>Congestion Monitor</span>
			</div>
		)
	}
}

export default Header