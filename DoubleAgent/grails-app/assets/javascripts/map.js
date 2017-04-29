var map = (function() {
    var markers = [];
    var mymap = L.map('mapid').setView([39.82, -98.58], 5);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJwejIwMDQiLCJhIjoiY2oyMWsyeWR5MDAybzJ2cDIwMGg3dXY4eiJ9.7xlHSnQ2tf9H_ZRKFokBNg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(mymap);

    return {
        addMarker: function (name, age, gender, lat, long) {
            var femaleIcon = L.icon({
                className: 'fem-icon',
                iconUrl: 'assets/pink-marker.png',
            });
            var spyDescription = "<dl><dt>Name</dt>" + "<dd>"+ name + "</dd>" + "<dt>Age</dt>"+"<dd>"+ age +"</dd>"
                +"<dt>Gender</dt>" + "<dd>"+ gender + "</dd>" + "<dt>Latitude</dt>" + "<dd>"+ lat + "</dd>"
                +"<dt>Longitude</dt>" + "<dd>" + long + "</dd>"
            if(gender === "Female") {
                var marker = L.marker([lat, long], {icon: femaleIcon}).addTo(mymap)
                    .bindPopup(spyDescription)
                    .openPopup();
            }else{
                var marker = L.marker([lat, long]).addTo(mymap)
                    .bindPopup(spyDescription)
                    .openPopup();
            }
            markers.push(marker)
        },
        fitScreen: function(){
            var group = L.featureGroup(markers)
            mymap.fitBounds(group.getBounds())
        }
    }
})();