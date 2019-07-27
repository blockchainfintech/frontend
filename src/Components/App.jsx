import React from 'react';
import Heatmap from './Heatmap';
import Header from './Header';
import '../Style/App.css';

class App extends React.Component {
	render() {
		return (
			<div class="App-container">
				<Header />
				<Heatmap />
			</div>
		);
	}

}

export default App;
