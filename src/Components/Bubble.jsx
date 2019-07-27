import React from 'react'
import AttachInfoBubbles from '../Misc/AttachInfoBubbles'
import '../Style/Bubble.css'

const H = window.H;

class Bubble extends React.Component {
	constructor(coord, text, map, d) {
		super();
		this.map = map;

		this.text = text;

		this.marker = new H.map.Marker(coord);
		// this.marker.setData(text);
		map.addObject(this.marker);
		this.marker.addEventListener('tap', (evt) => {
			this.bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
				content: this.text
			})
			var ui = new H.ui.UI(map);
			ui.addBubble(this.bubble);
		
		}, false)
	}

	remove() {
		this.map.removeObject(this.marker);
		if (this.bubble) {
			var ui = new H.ui.UI(this.map);
			ui.removeBubble(this.bubble);
			this.bubble.close();
			this.bubble = null;
		}
	}

	setText(text) {
		this.text = text;
		if (this.bubble){
			this.bubble.setContent(text);
		}
	}


}


export default Bubble;