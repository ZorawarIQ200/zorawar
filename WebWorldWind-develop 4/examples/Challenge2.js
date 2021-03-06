/*
         * Copyright 2003-2006, 2009, 2017, 2020 United States Government, as represented
         * by the Administrator of the National Aeronautics and Space Administration.
         * All rights reserved.
         *
         * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License,
         * Version 2.0 (the "License"); you may not use this file except in compliance
         * with the License. You may obtain a copy of the License
         * at http://www.apache.org/licenses/LICENSE-2.0
         *
         * Unless required by applicable law or agreed to in writing, software distributed
         * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
         * CONDITIONS OF ANY KIND, either express or implied. See the License for the
         * specific language governing permissions and limitations under the License.
         *
         * NASAWorldWind/WebWorldWind also contains the following 3rd party Open Source
         * software:
         *
         *    ES6-Promise – under MIT License
         *    libtess.js – SGI Free Software License B
         *    Proj4 – under MIT License
         *    JSZip – under MIT License
         *
         * A complete listing of 3rd Party software notices and licenses included in
         * WebWorldWind can be found in the WebWorldWind 3rd-party notices and licenses
         * PDF found in code  directory.
         */
        /**
         * Illustrates how to display and pick Placemarks.
         */
requirejs(['./WorldWindShim',
    './LayerManager'],
function (WorldWind,
          LayerManager) {
    "use strict";

    // Tell WorldWind to log only warnings and errors.
    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

    // Create the WorldWindow.
    var wwd = new WorldWind.WorldWindow("canvasOne");

    // Create and add layers to the WorldWindow.
    var layers = [
        // Imagery layers.
        {layer: new WorldWind.BMNGLayer(), enabled: true},
        {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
        // Add atmosphere layer on top of all base layers.
        {layer: new WorldWind.AtmosphereLayer(), enabled: true},
        // WorldWindow UI layers.
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var b = 0; b < layers.length; b++) {
        layers[b].layer.enabled = layers[b].enabled;
        wwd.addLayer(layers[b].layer);
    }

    // Define the images we'll use for the placemarks.
    var images = [
        "plain-black.png",
        "plain-blue.png",
        "plain-brown.png",
        "plain-gray.png",
        "plain-green.png",
        "plain-orange.png",
        "plain-purple.png",
        "plain-red.png",
        "plain-teal.png",
        "plain-white.png",
        "plain-yellow.png",
        "castshadow-black.png",
        "castshadow-blue.png",
        "castshadow-brown.png",
        "castshadow-gray.png",
        "castshadow-green.png",
        "castshadow-orange.png",
        "castshadow-purple.png",
        "castshadow-red.png",
        "castshadow-teal.png",
        "castshadow-white.png"

    ];
    var images1 = [
        "Bean.png"
    ]
    var pinLibrary = WorldWind.configuration.baseUrl + "images/pushpins/", // location of the image files
        placemark,
        placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
        highlightAttributes,
        placemarkLayer = new WorldWind.RenderableLayer("Placemarks"),
        latitude = 47.684444,
        longitude = -121.129722;

    var pinLibrary1 = WorldWind.configuration.baseUrl + "images/MrBean/", // location of the image files
        placemark1,
        placemarkAttributes1 = new WorldWind.PlacemarkAttributes(null),
        highlightAttributes1,
        placemarkLayer1 = new WorldWind.RenderableLayer("Placemarks1"),
        latitude1 = 41.52095596174645,
        longitude1 = -74.4487242896694;

    // Set up the common placemark attributes.
    placemarkAttributes.imageScale = 1;
    placemarkAttributes.imageOffset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.3,
        WorldWind.OFFSET_FRACTION, 0.0
        );
    placemarkAttributes.imageColor = WorldWind.Color.WHITE;
    placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
        WorldWind.OFFSET_FRACTION, 0.5,
        WorldWind.OFFSET_FRACTION, 1.0
        );
    placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
    placemarkAttributes.drawLeaderLine = true;
    placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

    // For each placemark image, create a placemark with a label.
    for (var i = 0, len = images.length; i < len; i++) {
        // Create the placemark and its label.
        placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude + i, 1e2), true, null);
        placemark.label = "Placemark " + i.toString() + "\n"
            + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n"
            + "Lon " + placemark.position.longitude.toPrecision(5).toString();
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

        // Create the placemark attributes for this placemark. Note that the attributes differ only by their
        // image URL.
        placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        placemarkAttributes.imageSource = pinLibrary + images[i];
        placemark.attributes = placemarkAttributes;

        // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
        // the default highlight attributes so that all properties are identical except the image scale. You could
        // instead vary the color, image, or other property to control the highlight representation.
        highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        highlightAttributes.imageScale = 1.2;
        placemark.highlightAttributes = highlightAttributes;

        // Add the placemark to the layer.
        placemarkLayer.addRenderable(placemark);
    }
    //Create Bean
    for (var l = 0, len = images1.length; l < len; l++) {
        // Create the placemark and its label.
        placemark1 = new WorldWind.Placemark(new WorldWind.Position(latitude1, longitude1 + l, 1e2), true, null);
        placemark1.label = "Placemark1 " + l.toString() + "\n"
            + "Lat " + placemark1.position.latitude.toPrecision(4).toString() + "\n"
            + "Lon " + placemark1.position.longitude.toPrecision(5).toString();
        placemark1.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

        // Create the placemark attributes for this placemark. Note that the attributes differ only by their
        // image URL.
        placemarkAttributes1= new WorldWind.PlacemarkAttributes(placemarkAttributes1);
        placemarkAttributes1.imageSource = pinLibrary1 + images1[l];
        placemark1.attributes = placemarkAttributes1;

        // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
        // the default highlight attributes so that all properties are identical except the image scale. You could
        // instead vary the color, image, or other property to control the highlight representation.
        highlightAttributes1 = new WorldWind.PlacemarkAttributes(placemarkAttributes1);
        highlightAttributes1.imageScale = 1.2;
        placemark1.highlightAttributes = highlightAttributes1;

        // Add the placemark to the layer.
        placemarkLayer1.addRenderable(placemark1);
    }

// Get the modal
    var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Now set up to handle picking.



    var highlightedItems = [placemark1];

    // The common pick-handling function.
    var handlePick = function (o) {
        // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
        // the mouse or tap location.
        var x = o.clientX,
            y = o.clientY;

        var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items
    // De-highlight any previously highlighted placemarks.
    for (var h = 0; h < highlightedItems.length; h++) {
        highlightedItems[h].highlighted = false;
    }
    highlightedItems = [];
    // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
    // relative to the upper left corner of the canvas rather than the upper left corner of the page.
    var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
        if (pickList.objects.length > 0) {
            redrawRequired = true;
        }

        // Highlight the items picked by simply setting their highlight flag to true.
        if (pickList.objects.length > 1) {
            modal.style.display = "block";
                modalImg.src = HELLO;
                captionText.innerHTML = HI;
            for (var p = 0; p < pickList.objects.length; p++) {
                pickList.objects[p].userObject.highlighted = true;

                // Keep track of highlighted items in order to de-highlight them later.
                highlightedItems.push(pickList.objects[p].userObject);
                //
                // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                // If instead the user picked the placemark's image, the "labelPicked" property is false.
                // Applications might use this information to determine whether the user wants to edit the label
                // or is merely picking the placemark as a whole.
                // console.log(labelPicked)
                // if (pickList.objects[p].labelPicked) {
                //     modal.style.display = "block";
                //     modalImg.src = this.src;
                //     captionText.innerHTML = this.alt;
                }
            }
        }

        // Update the window if we changed anything.
        if (redrawRequired) {
            wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
        }
    //I am very sorry mr. Computer

    // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
    wwd.addEventListener("mousemove", handlePick);

    // Listen for taps on mobile devices and highlight the placemarks that the user taps.
    var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);

    // Create a layer manager for controlling layer visibility.
    var layerManager = new LayerManager(wwd);
    });
