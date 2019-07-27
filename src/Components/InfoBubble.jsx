import React from 'react'
import '../Style/InfoBubble.css'

class InfoBubble extends React.Component {
	render() {
		var loadName;
		if (this.props.data.count < 0.3) {
			loadName = "crowd-low";
		} else if (this.props.data.count < 0.75) {
			loadName = "crowd-med";
		} else {
			loadName = "crowd-high";
		}
		return (
			<div className="InfoBubble-Container">
				<span className="InfoBubble-Title">{this.props.data.name}</span>
				<div className={`InfoBubble-IndContainer ${loadName}`}>
					<div className="InfoBubble-Ind ind1"></div>
					<div className="InfoBubble-Ind ind2"></div>
					<div className="InfoBubble-Ind ind3"></div>
				</div>
				<span className="InfoBubble-count">{(this.props.data.count * 100).toString().slice(0,2)}% of maximum</span>
			</div>
		)
	}
}

export default InfoBubble;