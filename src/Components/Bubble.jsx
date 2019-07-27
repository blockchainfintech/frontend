import React from 'react'
import AttachInfoBubbles from '../Misc/AttachInfoBubbles'
import '../Style/Bubble.css'

const H = window.H;

class Bubble extends React.Component {
	constructor(coord, text, map, d) {
		super();
		this.map = map;

		this.marker = new H.map.Marker(coord);
		// this.marker.setData(text);
		map.addObject(this.marker);
		this.marker.addEventListener('tap', (evt) => {
			this.bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
				content: text
			})
			var ui = new H.ui.UI(map);
			ui.addBubble(this.bubble);
			this.bubble.addEventListener('tap', (evt) => {
				ui.removeBubble(this.bubble);
				this.bubble = null;
			})

			AttachInfoBubbles();
		}, false)
	}

	remove() {
		this.map.removeObject(this.marker);
		if (this.bubble) {
			var ui = new H.ui.UI(this.map);
			ui.removeBubble(this.bubble);
			this.bubble = null;
		}
	}


}


export default Bubble;