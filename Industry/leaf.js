var map = L.map( 'map', {
    center: [53.0, 9.0],
    minZoom: 2,
    zoom: 2
});
L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( map );

layerControl.addBaseLayer(OpenStreetMap_HOT, "Streets");

var url = "counties.topojson";

var counties = L.geoJson().addTo(map);

/*can put html inside here, this is one way you could add a legend*/
layerControl.addOverlay(counties, "Counties");

var cData = omnivore.topojson(url, null, counties);
