let map = L.map('map').setView([58.373523, 26.716045], 12)

const osm =
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: 'OpenStreetMap contributors',
})

osm.addTo(map)
6

function defaultMapSettings() {
map.setView([58.373523, 26.716045], 12)
}

addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson')
// add geoJSON layer
async function addDistrictsGeoJson(url) {
 const response = await fetch(url)
 const data = await response.json()
 L.choropleth(data, {
 valueProperty: 'TOWERS',
 scale: ['#feebe2', '#7a0177'],
 steps: 5,
 mode: 'e', // q for quantile, e for equidistant
 style: {
 color: '#fff',
 weight: 2,
 fillOpacity: 0.8,
 },
 onEachFeature: function (feature, layer) {
 layer.bindPopup('Value: ' + feature.properties.OBJECTID)
 },
 }).addTo(map)
}
