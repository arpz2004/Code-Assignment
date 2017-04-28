<!doctype html>
<html>
<head>
    <meta name="layout" content="main"/>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css"
          integrity="sha512-07I2e+7D8p6he1SIM+1twR5TIrhUQn9+I6yjqD53JQjFiMf8EtC93ty0/5vJTZGF8aAocvHYNEDJajGdNx1IsQ=="
          crossorigin=""/>
    <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"
            integrity="sha512-A7vV8IFfih/D732iSSKi20u/ooOfj/AGehOKq0f4vLT1Zr2Y+RX7C+w8A1gaSasGtRUZpF/NZgzSAu4/Gc41Lg=="
            crossorigin=""></script>
    <g:javascript src="map.js" />
    <title>Double Agent Locator</title>
</head>
<body>
    <div id="mapid"></div>
    <g:javascript>
        window.onload=function(){
        <g:each in="${spys}" var="spy">
            (MyApp.func(${spy.latitude}, ${spy.longitude}))();
        </g:each>
        }
    </g:javascript>
</body>
</html>
