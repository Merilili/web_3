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

addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')

function heatDataConvert(feature) {
   return [
   feature.geometry.coordinates[1],
   feature.geometry.coordinates[0],
   feature.properties.area,
    ]
  }

// add geoJSON layer
async function addCelltowersGeoJson(url) {
 const response = await fetch(url)
 const data = await response.json()
 const heatData = data.features.map(heatDataConvert)
 const heatMap = L.heatLayer(heatData, { radius: 10})
 heatMap.addTo(map)
}
