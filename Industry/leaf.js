var map = L.map( 'map', {
    center: [53.0, 9.0],
    minZoom: 2,
    zoom: 2
});

L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( map );

function getColor(d) {
    return d > 1000 ? '#b10026' :
           d > 500  ? '#e31a1c' :
           d > 200  ? '#fc4e2a' :
           d > 100  ? '#fd8d3c' :
           d > 50   ? '#feb24c' :
           d > 20   ? '#fed976' :
           d > 10   ? '#ffeda0' :
		   d < 10   ? '#ffffcc' :
                      '#FFFFFF';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.measlesrate),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
}

L.geoJson(countriesData, {style: style}).addTo(map);
