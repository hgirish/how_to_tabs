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

            var tab1 = createTab();
            var defaultTab = createTab();
            var tab3 = createTab();

            var element1 = createTabContent();
            var defaultElement = createTabContent();
            var element3 = createTabContent();

            tabs.initialize({
                tabs: [tab1, defaultTab, tab3],
                content: [element1, defaultElement, element3],
                defaultElement: defaultElement,
                activeTabClass: "activeTab",
                contentHideClass: "hideClass"
            });

            //tabs.initialize(defaultElement, [element1, defaultElement, element3], "hideClass");

            assert.equal(getClasses(element1), "hideClass", "element 1 should be hidden");
            assert.equal(getClasses(defaultElement), "", "default element should not be hidden");
            assert.equal(getClasses(element3), "hideClass", "element 3 should be hidden");

        });


        it("preserves existing classes when hiding an element", function () {
            var defaultTab = createTab();
            var hiddenTab = createTab();

            var defaultElement = createTabContent();
            var hiddenElement = createTabContent();
            hiddenElement.setAttribute("class", "existingClass");

            tabs.initialize({
                tabs: [defaultTab, hiddenTab],
                content: [defaultElement, hiddenElement],
                defaultElement: defaultElement,
                activeTabClass: "activeTab",
                contentHideClass: "newClass"
            });

            assert.equal(getClasses(hiddenElement), "existingClass newClass");
        });

        it("styles the default tab with a class", function () {
            var defaultTab = createTab();
            var defaultElement = createTabContent();

            tabs.initialize({
                tabs: [defaultTab],
                content: [defaultElement],
                defaultElement: defaultElement,
                activeTabClass: "activeTab",
                contentHideClass: "ignored"
            });

            assert.equal(getClasses(defaultTab), "activeTab");
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

        function createTab() {
            var element = addElement("div");
            element.innerHTML = "Tab";
            return element;
        }
        function createTabContent() {
            var element = addElement("div");
            element.innerHTML = "Content";
            return element;
        }
    });



}());