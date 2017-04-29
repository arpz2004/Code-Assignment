var map = (function() {
    var markers = [];
    var filteredMarkers = [];
    var allMarkers = new L.LayerGroup();
    var visibleMarkers = new L.LayerGroup();

    var layer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJwejIwMDQiLCJhIjoiY2oyMWsyeWR5MDAybzJ2cDIwMGg3dXY4eiJ9.7xlHSnQ2tf9H_ZRKFokBNg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    });

    var mymap = L.map('mapid', {
        center: [39.82, -98.58],
        layers: [layer, allMarkers],
        zoom: 5
    });
    var baseLayerMarkers = {
        "All Markers": allMarkers,
        "Filtered by Age": visibleMarkers
    };

    var resetButton = document.getElementsByClassName("button");
    resetButton[0].addEventListener("click", function(){
        document.getElementsByClassName("leaflet-control-layers-selector")[0].click();
        markers.forEach(function(markerWithProps) {
            var marker = markerWithProps.marker;
            marker.setOpacity(1)
        });
        filteredMarkers = markers.slice();
        layerControl.removeLayer(visibleMarkers);
        visibleMarkers = new L.LayerGroup();
        filteredMarkers.forEach(function(markerWithProps){
            var marker = markerWithProps.marker;
            marker.addTo(visibleMarkers);
        });
        layerControl.addBaseLayer(visibleMarkers, "Filtered by Age");
        document.getElementById("maxAge").value = "";
        document.getElementById("findName").value = "";
    });

    var layerControl = L.control.layers(baseLayerMarkers).addTo(mymap);

    document.getElementById("maxAge").addEventListener("change", function(){
        layerControl.removeLayer(visibleMarkers);
        filteredMarkers = [];
        visibleMarkers = new L.LayerGroup();
        markers.forEach(function(markerWithProps){
            var marker = markerWithProps.marker;
            var props = markerWithProps.props;
            var ageInput = document.getElementById("maxAge");
            var maxAge = 999
            if(ageInput.value.length != 0){
                maxAge = ageInput.value
            }
            if(props.age <= maxAge){
                marker.addTo(visibleMarkers);
                filteredMarkers.push(markerWithProps);
            }
        });
        layerControl.addBaseLayer(visibleMarkers, "Filtered by Age");
        document.getElementsByClassName("leaflet-control-layers-selector")[0].click();
        document.getElementsByClassName("leaflet-control-layers-selector")[1].click();
    });

    document.getElementById("findName").addEventListener("change", function(){
        layerControl.removeLayer(visibleMarkers);
        visibleMarkers = new L.LayerGroup();
        markers.forEach(function(markerWithProps) {
            var marker = markerWithProps.marker;
            var props = markerWithProps.props;
            if (props.name.toLowerCase().includes(document.getElementById("findName").value.toLowerCase())) {
                marker.setOpacity(1)
            } else {
                marker.setOpacity(0.1)
            }
        });
        filteredMarkers.forEach(function(markerWithProps){
            var marker = markerWithProps.marker;
            marker.addTo(visibleMarkers);
        });
        layerControl.addBaseLayer(visibleMarkers, "Filtered by Age");
        document.getElementsByClassName("leaflet-control-layers-selector")[0].click();
        document.getElementsByClassName("leaflet-control-layers-selector")[1].click();
    });

    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function(mymap){
        var div = L.DomUtil.create('div', 'legend'),
            markerIcons =['blue', 'pink'],
            labels = [];
        for(var i = 0; i < markerIcons.length; i++){
            div.innerHTML += 'test<br />';
        }
        return div;
    };
    legend.addTo(mymap);

    return {
        addMarker: function (name, age, gender, lat, long) {
            var femaleIcon = L.icon({
                className: 'fem-icon',
                iconUrl: 'assets/pink-marker.png',
                iconSize: [25,41],
                shadowUrl: 'assets/marker-shadow.png',
                shadowAnchor: [14,20]
            });
            var markerProps = {
                name: name,
                age: age,
                gender: gender
            };
            var spyDescription = "<dl><dt>Name</dt>" + "<dd>"+ name + "</dd>" + "<dt>Age</dt>"+"<dd>"+ age +"</dd>"
                +"<dt>Gender</dt>" + "<dd>"+ gender + "</dd>" + "<dt>Latitude</dt>" + "<dd>"+ lat + "</dd>"
                +"<dt>Longitude</dt>" + "<dd>" + long + "</dd>";
            if(gender === "Female") {
                var marker = L.marker([lat, long], {icon: femaleIcon, opacity: 1}).addTo(mymap)
                    .bindPopup(spyDescription)
                    .openPopup()
                    .addTo(allMarkers);
            }else{
                var marker = L.marker([lat, long], {opacity: 1}).addTo(mymap)
                    .bindPopup(spyDescription)
                    .openPopup()
                    .addTo(allMarkers);
            }
            var markerWithProps = {
                marker: marker,
                props: markerProps
            };
            markers.push(markerWithProps)
            filteredMarkers.push(markerWithProps)
        },
        fitScreen: function(){
            var onlyMarkers = []
            markers.forEach(function(marker){
                onlyMarkers.push(marker.marker);
            });
            var group = L.featureGroup(onlyMarkers);
            mymap.fitBounds(group.getBounds());
        }
    }
})();