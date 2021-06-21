var map = L.map('map').setView([41.430272,-97.359271], 4);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(map);

// start GeoJson


function getColor(d) {
 return    d > 3 ? '#005a32' :
           d > 2  ? '#238b45' :
           d > 1  ? '#41ab5d' :
           d > 0  ? '#74c476' :
           d > 0   ? '#a1d99b' :
           d > 0   ? '#c7e9c0' :
           d > 0   ? '#e5f5e0' :
					  '#f7fcf5';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.count_),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

L.geoJson(craft_beer, {style: style}).addTo(map);

//good up to here

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
	
	info.update(layer.feature.properties);
};

function resetHighlight(e) {
    geojson.resetStyle(e.target);
	info.update();
};



var geojson;
// ... our listeners
geojson = L.geoJson(craft_beer);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
};

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(craft_beer, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// new additions for adding the custom info box when hover

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Number of Firms per State</h4>' +  (props ?
       '<h5>' +  props.name + '</h5>'+'<b>'+ props.count_ + ' Firms'+'</b>'
        : 'Hover over a State');
};

info.addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 30, 50, 100, 300, 400],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);
