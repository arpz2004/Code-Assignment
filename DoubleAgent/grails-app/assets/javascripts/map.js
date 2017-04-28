var map = (function() {
    var markers = [];
    var mymap = L.map('mapid').setView([39.82, -98.58], 5);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJwejIwMDQiLCJhIjoiY2oyMWsyeWR5MDAybzJ2cDIwMGg3dXY4eiJ9.7xlHSnQ2tf9H_ZRKFokBNg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(mymap);

    return {
        addMarker: function (lat, long) {
            var marker = L.marker([lat, long]).addTo(mymap)
                .bindPopup('Latitude: ' + lat + '\nLongitude: ' + long)
                .openPopup();
            markers.push(marker)
        },
        fitScreen: function(){
            var group = L.featureGroup(markers)
            mymap.fitBounds(group.getBounds())
        }
    }
})();