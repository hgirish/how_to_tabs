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

            tabs.initialize([element], "someClass");

            assert.equal(getClass(element), "someClass");

        });

        it("sets a class on an element without erasing exisisting class", function () {
            var element = addElement("div");
            element.setAttribute("class", "existingClass");

            tabs.initialize([element], "newClass");

            assert.equal(getClass(element), "existingClass newClass");

        });

        it("hides multiple elements", function () {
            var element1 = addElement("div");
            var element2 = addElement("div");
            var element3 = addElement("div");

            tabs.initialize([element1, element2, element3], "hideClass");

            assert.equal(getClass(element1), "hideClass", "element 1");
            assert.equal(getClass(element2), "hideClass", "element 2");
            assert.equal(getClass(element3), "hideClass", "element 3");

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