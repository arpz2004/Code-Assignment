var map = (function() {
    //Holds every marker and the spy properties each corresponds to
    var markers = [];
    //Holds the visible markers and the spy properties each corresponds to
    var filteredMarkers = [];
    //Create new layer groups for changing properties of each group
    var allMarkers = new L.LayerGroup();
    var visibleMarkers = new L.LayerGroup();

    //Create layer showing streets on the map
    var layer = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJwejIwMDQiLCJhIjoiY2oyMWsyeWR5MDAybzJ2cDIwMGg3dXY4eiJ9.7xlHSnQ2tf9H_ZRKFokBNg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    });

    //Add the streets and markers to the map
    var mymap = L.map('mapid', {
        //Map starts centered on the US
        center: [39.82, -98.58],
        layers: [layer, allMarkers],
        zoom: 5
    });

    //Two possible layers that can be shown, either all markers or the filtered markers
    var baseLayerMarkers = {
        "All Markers": allMarkers,
        "Filtered by Age": visibleMarkers
    };

    //Add the base layers to the map
    var layerControl = L.control.layers(baseLayerMarkers).addTo(mymap);

    //Add click event to reset button
    var resetButton = document.getElementsByClassName("button");
    resetButton[0].addEventListener("click", function(){
        //Switch to allMarkers layer
        document.getElementsByClassName("leaflet-control-layers-selector")[0].click();
        //Switch all markers back to original opacity
        markers.forEach(function(markerWithProps) {
            var marker = markerWithProps.marker;
            marker.setOpacity(1)
        });
        //Reset the filtered markers to the original markers
        filteredMarkers = markers.slice();
        //Remove the filtered markers layer
        layerControl.removeLayer(visibleMarkers);
        //Add all markers to filtered markers layer
        visibleMarkers = new L.LayerGroup();
        filteredMarkers.forEach(function(markerWithProps){
            var marker = markerWithProps.marker;
            marker.addTo(visibleMarkers);
        });
        //Add the filtered markers layer back
        layerControl.addBaseLayer(visibleMarkers, "Filtered by Age");
        //Reset the input fields
        document.getElementById("maxAge").value = "";
        document.getElementById("findName").value = "";
    });

    //Add change event to max age field
    document.getElementById("maxAge").addEventListener("change", function(){
        //Remove the filtered markers layer
        layerControl.removeLayer(visibleMarkers);
        filteredMarkers = [];
        //Create a new layer group for filtered markers
        visibleMarkers = new L.LayerGroup();
        //Check each spy's age and compare it to the input
        markers.forEach(function(markerWithProps){
            var marker = markerWithProps.marker;
            var props = markerWithProps.props;
            var ageInput = document.getElementById("maxAge");
            //The max age is equal to the inputted value if there is input or 999 if the input field is empty
            var maxAge = 999
            if(ageInput.value.length != 0){
                maxAge = ageInput.value
            }
            //Add the marker to filtered markers layer if the spy age is less than or equal to the max age
            if(props.age <= maxAge){
                marker.addTo(visibleMarkers);
                filteredMarkers.push(markerWithProps);
            }
        });
        //Add the filtered markers layer back
        layerControl.addBaseLayer(visibleMarkers, "Filtered by Age");
        document.getElementsByClassName("leaflet-control-layers-selector")[0].click();
        document.getElementsByClassName("leaflet-control-layers-selector")[1].click();
    });

    //Add change event to search by name field
    document.getElementById("findName").addEventListener("change", function(){
        //Remove the filtered markers layer
        layerControl.removeLayer(visibleMarkers);
        //Create a new layer group for filtered markers
        visibleMarkers = new L.LayerGroup();
        //Check each spy's name and compare it to the input
        markers.forEach(function(markerWithProps) {
            var marker = markerWithProps.marker;
            var props = markerWithProps.props;
            //If the input is a substring of the spy's name (not case sensitive), highlight the marker (dim all other markers)
            if (props.name.toLowerCase().includes(document.getElementById("findName").value.toLowerCase())) {
                marker.setOpacity(1)
            } else {
                marker.setOpacity(0.1)
            }
        });
        //Add the filtered markers to the visible markers so only the ones still filtered by age show
        filteredMarkers.forEach(function(markerWithProps){
            var marker = markerWithProps.marker;
            marker.addTo(visibleMarkers);
        });
        //Add the filtered markers layer back
        layerControl.addBaseLayer(visibleMarkers, "Filtered by Age");
        document.getElementsByClassName("leaflet-control-layers-selector")[0].click();
        document.getElementsByClassName("leaflet-control-layers-selector")[1].click();
    });

    //Create a legend showing what each colored marker means
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function(){
        //Create a div used for the legend and add the html to show icons and text
        var div = L.DomUtil.create('div', 'legend'),
            markerIcons =['assets/blue-marker.png', 'assets/pink-marker.png'],
            labels = ['Male', 'Female'];
        for(var i = 0; i < markerIcons.length; i++){
            div.innerHTML += '<img class = "marker" src = ' + markerIcons[i] + ' alt = "marker" />' +labels[i]+'<br />';
        }
        return div;
    };
    //Add the legend to the map
    legend.addTo(mymap);

    //Return addMarker and fitScreen functions to be used by html
    return {
        addMarker: function (name, age, gender, lat, long) {
            //Create the pink icon
            var femaleIcon = L.icon({
                className: 'fem-icon',
                iconUrl: 'assets/pink-marker.png',
                iconSize: [25,41],
                shadowUrl: 'assets/marker-shadow.png',
                shadowAnchor: [14,20]
            });
            //Create an object to store spy properties
            var markerProps = {
                name: name,
                age: age,
                gender: gender
            };
            //Display the properties of the spy in the popup
            var spyDescription = "<dl><dt>Name</dt>" + "<dd>"+ name + "</dd>" + "<dt>Age</dt>"+"<dd>"+ age +"</dd>"
                +"<dt>Gender</dt>" + "<dd>"+ gender + "</dd>" + "<dt>Latitude</dt>" + "<dd>"+ lat + "</dd>"
                +"<dt>Longitude</dt>" + "<dd>" + long + "</dd>";
            //Create marker with pink icon if gender is female
            if(gender.toLowerCase() === "female") {
                var marker = L.marker([lat, long], {icon: femaleIcon, opacity: 1}).addTo(mymap)
                    .bindPopup(spyDescription)
                    .openPopup()
                    .addTo(allMarkers);
            }else{
                //Create marker with blue icon if gender is male
                var marker = L.marker([lat, long], {opacity: 1}).addTo(mymap)
                    .bindPopup(spyDescription)
                    .openPopup()
                    .addTo(allMarkers);
            }
            //Create object containing the marker and the spy properties object
            var markerWithProps = {
                marker: marker,
                props: markerProps
            };
            //Add this new object to the markers and filtered markers array
            markers.push(markerWithProps);
            filteredMarkers.push(markerWithProps)
        },
        //Zoom in or out so all of the markers fit on the map
        fitScreen: function(){
            var onlyMarkers = [];
            markers.forEach(function(marker){
                onlyMarkers.push(marker.marker);
            });
            var group = L.featureGroup(onlyMarkers);
            mymap.fitBounds(group.getBounds());
        }
    }
})();