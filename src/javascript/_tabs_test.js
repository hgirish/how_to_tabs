(function () {
    "use strict";

    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    describe("Tabs", function () {

        it("hides an element", function () {
            // Arrange
            var element = document.createElement("div");

            // Act
            tabs.initialize(element);

            // Assert
            var styles = getComputedStyle(element);
            var display = styles.getPropertyValue("display");

            assert.equal(display, "none");
        });

    });

}());