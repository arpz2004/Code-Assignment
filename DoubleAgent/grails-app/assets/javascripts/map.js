
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJwejIwMDQiLCJhIjoiY2oyMWsyeWR5MDAybzJ2cDIwMGg3dXY4eiJ9.7xlHSnQ2tf9H_ZRKFokBNg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(mymap);

    L.marker([51.51, -0.09]).addTo(mymap)
        .bindPopup('test1')
        .openPopup();
    test3()
function test2() {
        return function() {
            L.marker([51.49, -0.09]).addTo(mymap)
                .bindPopup('test2')
                .openPopup();
        }
}

function test3() {
    L.marker([51.5, -0.09]).addTo(mymap)
        .bindPopup('test3')
        .openPopup();
}

function addToMap(lat, long) {
    return function () {
        L.marker([lat, long]).addTo(mymap)
            .bindPopup('test4')
            .openPopup();
    }
}