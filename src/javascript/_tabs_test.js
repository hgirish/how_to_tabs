/* jshint esversion: 6, varstmt: true,  strict:true */
(function () {
    "use strict";

    const assert = require("./assert.js");
    const tabs = require("./tabs.js");

    describe("Tabs", function () {
        let container;

        const ACTIVE_TAB_CLASS = "activeTab";

        beforeEach(function () {
            container = document.createElement("div");
            document.body.appendChild(container);
        });

        afterEach(function () {
            removeElement(container);
        });

        it("hides all content elements except the default upon initialization", function () {


            const defaultTab = createTab();

            const content1 = createTabContent();
            const defaultContent = createTabContent();
            const content3 = createTabContent();

            tabs.initialize({
                tabs: [createTab(), defaultTab, createTab()],
                content: [content1, defaultContent, content3],
                defaultTab: defaultTab,
                activeTabClass: ACTIVE_TAB_CLASS,
                hiddenContentClass: "hideClass"
            });

            assert.equal(getClasses(content1), "hideClass", "element 1 should be hidden");
            assert.equal(getClasses(defaultContent), "", "default element should not be hidden");
            assert.equal(getClasses(content3), "hideClass", "element 3 should be hidden");

        });


        it("preserves existing classes when hiding an element", function () {
            const defaultTab = createTab();

            const defaultContent = createTabContent();
            const hiddenContent = createTabContent();
            hiddenContent.setAttribute("class", "existingClass");

            tabs.initialize({
                tabs: [defaultTab, createTab()],
                content: [defaultContent, hiddenContent],
                defaultTab: defaultTab,
                activeTabClass: ACTIVE_TAB_CLASS,
                hiddenContentClass: "newClass"
            });

            assert.equal(getClasses(hiddenContent), "existingClass newClass");
        });

        it("styles the default tab with a class", function () {
            const tab1 = createTab();
            const defaultTab = createTab();
            const tab3 = createTab();
            const defaultContent = createTabContent();

            tabs.initialize({
                tabs: [tab1, defaultTab, tab3],
                content: [createTabContent(), defaultContent, createTabContent()],
                defaultTab: defaultTab,
                activeTabClass: ACTIVE_TAB_CLASS,
                hiddenContentClass: "ignored"
            });

            assert.equal(getClasses(tab1), null, "tab 1 should not be styled");
            assert.equal(getClasses(defaultTab), ACTIVE_TAB_CLASS, "default element should be styled");
            assert.equal(getClasses(tab3), null, "tab 3 should not be styled");
        });


        function getClasses(element) {
            return element.getAttribute("class");
        }

        function removeElement(element) {
            element.parentNode.removeChild(element);
        }

        function addElement(tagName) {
            const element = document.createElement(tagName);
            container.appendChild(element);
            return element;
        }

        function createTab() {
            const element = addElement("div");
            element.innerHTML = "Tab";
            return element;
        }
        function createTabContent() {
            const element = addElement("div");
            element.innerHTML = "Content";
            return element;
        }
    });



}());