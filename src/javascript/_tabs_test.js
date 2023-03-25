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




        it("hides all content elements except the default content", function () {
            var element1 = addElement("div");
            var defaultElement = addElement("div");
            var element3 = addElement("div");

            tabs.initialize({
                content: [element1, defaultElement, element3],
                defaultElement: defaultElement,
                contentHideClass: "hideClass"
            });

            //tabs.initialize(defaultElement, [element1, defaultElement, element3], "hideClass");

            assert.equal(getClasses(element1), "hideClass", "element 1 should be hidden");
            assert.equal(getClasses(defaultElement), "", "default element should not be hidden");
            assert.equal(getClasses(element3), "hideClass", "element 3 should be hidden");

        });


        it("preserves existing classes when hiding an element", function () {
            var defaultElement = addElement("div");
            var hiddenElement = addElement("div");
            hiddenElement.setAttribute("class", "existingClass");

            tabs.initialize({
                content: [defaultElement, hiddenElement],
                defaultElement: defaultElement,
                contentHideClass: "newClass"
            });

            // tabs.initialize(defaultElement, [defaultElement, hiddenElement], "newClass");

            assert.equal(getClasses(hiddenElement), "existingClass newClass");

        });


        function getClasses(element) {
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