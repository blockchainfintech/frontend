import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    //console.log("hello");
    let H = window.H
    window.addEventListener('resize', () => map.getViewPort().resize());
    var platform = new H.service.Platform({
      'apikey' : 'ARCRXWgqODAir_5AWo_fQfFA4wzI33UuYXRV4EXU1g4'
    });

    // Obtain the default map types from the platform object:
    var maptypes = platform.createDefaultLayers();
    //console.log(maptypes);
    //console.log(document.getElementById('mapContainer'))

    // Instantiate (and display) a map object:
    var map = new H.Map(
    document.getElementById('mapContainer'),
    maptypes.vector.normal.map,
    {
      zoom: 15,
      center: { lat: -33.9, lng: 151.2305 }
    });


    // Create the default UI:
    var ui = H.ui.UI.createDefault(map, maptypes);

    var mapEvents = new H.mapevents.MapEvents(map);
    var behavior = new H.mapevents.Behavior(mapEvents);

    var style = {strokeColor:"rgba(100 , 0, 0, 0.6)", fillColor:"rgba(100, 0, 0, 0.5)"};

    //console.log(map.getViewModel()/*.getLookAtData().bounds*/);
    console.log(map);



    /* CIRCLES */

    // var circle1 = new H.map.Circle({lat: -33.9000000, lng: 151.23050000}, 100, {style: style});
    // var circle2 = new H.map.Circle({lat: -33.9000000, lng: 151.23150000}, 100);



    // map.addObject(circle1);
    // map.addObject(circle2);
  }


  
  render() {
    return (
    <div id='mapContainer' style={{width:640, height:640}}>

    </div>

  );
  }
  
}

export default App;
