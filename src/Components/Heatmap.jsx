import React from 'react'
import '../Style/Heatmap.css'
import Bubble from './Bubble'
import InfoBubble from './InfoBubble'
import ReactDOMServer from 'react-dom/server';

const URL = "http://localhost:5000/";
const H = window.H;
const REFRESH_TIME = 2000;

class Heatmap extends React.Component {
	constructor() {
		super();
		this.allCircles = [];
		this.allBubbles = {};
	}

	// sends GET request to server, returns object returned
	requestFromServer(topLeft, bottomRight) {
		return fetch(URL + "congestion?lat1=" + topLeft.lat + "&long1=" + topLeft.lng + "&lat2=" + bottomRight.lat + "&long2=" + bottomRight.lng, {
			method: "GET",
		}).then(resp => {
			return resp.json();
		})
	}

	generateInfoBubble(n) {
		// Make the stuff yea
		let cont = document.createElement("div");
		cont.className = "infoBubble-root";
		var child = ReactDOMServer.renderToString(<InfoBubble data={n} />)
		cont.innerHTML = child;
		return cont;
	}

	// updates nodes on the map
	updateNodes(map) {
		// find top left and bottom right coords on current bounding box of map
		var topLeft = map.getViewModel().getLookAtData().bounds.getBoundingBox().getTopLeft();
		var bottomRight = map.getViewModel().getLookAtData().bounds.getBoundingBox().getBottomRight();

		// request server to find where nodes are
		this.requestFromServer(topLeft, bottomRight).then(resp => {
			// once request from server is complete, delete all old circles from map
			for (var i = 0; i < this.allCircles.length; i++) {
				map.removeObject(this.allCircles[i]);
			}
			this.allCircles = [];

			// all new nodes
			var nodes = resp.nodes;

			// for each new node add them to the map
			for (var i = 0; i < nodes.length; i++) {
				var nodeLat = nodes[i].latitude;
				var nodeLong = nodes[i].longitude;
				var nodeVal = nodes[i].count;
				var nodeText = nodes[i].name;
				var nodePos = {
					"lat"  : nodeLat,
					"lng" : nodeLong
				}

				var n = nodes[i]

				var style = {strokeColor:"rgba(100, 0, 0, 0.6)", fillColor:`rgba(${255*nodeVal}, 0, 0, 0.5)`};
				// add circle to map
				var circle = new H.map.Circle(nodePos, 100, {style: style});
				map.addObject(circle);

				var bubbleText = this.generateInfoBubble(n);


				// Add bubble
				if (this.allBubbles[n.nodeId] !== undefined) {
					// bubble already exists
					this.allBubbles[n.nodeId].setText(bubbleText);
				} else {
					var bubble = new Bubble(nodePos, bubbleText, map, n);
					this.allBubbles[n.nodeId] = bubble;
				}
				
				// add circle to all circles
				this.allCircles.push(circle);
			}
		})
	}

	componentDidMount() {
		window.addEventListener('resize', () =>{
			map.getViewPort().resize();
		});

		var platform = new H.service.Platform({
			'apikey' : 'ARCRXWgqODAir_5AWo_fQfFA4wzI33UuYXRV4EXU1g4'
		});

		// Obtain the default map types from the platform object:
		var maptypes = platform.createDefaultLayers();

		// Instantiate (and display) a map object:
		var map = new H.Map(
			document.getElementsByClassName('Heatmap-container')[0],
			maptypes.vector.normal.map,
			{
				zoom: 15,
				center: { lat: -33.9, lng: 151.2305 }
			});
		this.map = map;

		map.addEventListener('dragend', () => {
			this.updateNodes(map);
		})

		// Create the default UI:
		var ui = H.ui.UI.createDefault(map, maptypes);

		var mapEvents = new H.mapevents.MapEvents(map);
		var behavior = new H.mapevents.Behavior(mapEvents);	

		this.updateNodes(map);


		// refresh it every REFRESH_TIME ms
		window.setInterval(() => this.updateNodes(map), REFRESH_TIME);
		
	}

	render() {
		return (
			<div className='Heatmap-container'>

			</div>

		);
	}

}

export default Heatmap;
