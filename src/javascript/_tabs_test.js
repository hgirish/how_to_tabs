(function () {
    "use strict";

    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    describe("Tabs", function () {

        it("hides an element", function () {

            var element = addElement("div");

            tabs.initialize(element);

            assert.equal(getDisplayProperty(element), "none");


        });

    });

    function getDisplayProperty(element) {
        var styles = getComputedStyle(element);
        var display = styles.getPropertyValue("display");
        return display;
    }

    function addElement(tagName) {
        var element = document.createElement(tagName);
        document.body.appendChild(element);
        return element;
    }

}());