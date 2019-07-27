import React from 'react';
import ReactDOM from 'react-dom';
import InfoBubble from '../Components/InfoBubble';

export default function AttachInfoBubbles () {
	var aaa = document.getElementsByClassName("infoBubble-root");
	for (var i = 0; i < aaa.length; i++) {
		var thisData = JSON.parse(aaa[i].tag);
		var c = ReactDOM.render(<InfoBubble data={thisData} />, aaa[i]);
		
		//aaa[i].className = "infoBubble-root"; // remove notAttached class
	}
}