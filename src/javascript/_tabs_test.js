(function () {
    "use strict";

    var assert = require("./assert.js");
    var tabs = require("./tabs.js");

    describe("Tabs", function () {
        var container;

        beforeEach(function () {
            container = document.createElement("div");
            document.body.appendChild(container);
        });

        afterEach(function () {
            removeElement(container);
        });


        it("sets a class on an element when that elment  has no exisisting classes", function () {

            var element = addElement("div");

            tabs.initialize(element, "someClass");

            assert.equal(getClass(element), "someClass");

        });

        it("sets a class on an element without erasing exisisting class", function () {
            var element = addElement("div");
            element.setAttribute("class", "existingClass");

            tabs.initialize(element, "newClass");

            assert.equal(getClass(element), "existingClass newClass");

        });

        function getClass(element) {
            return element.getAttribute("class");
        }

        function removeElement(element) {
            element.parentNode.removeChild(element);
        }

        function addElement(tagName) {
            var element = document.createElement(tagName);
            container.appendChild(element);
            return element;
        }
    });



}());