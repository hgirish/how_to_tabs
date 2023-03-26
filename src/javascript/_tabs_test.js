/* jshint esversion: 6, varstmt: true,  strict:true */
(function () {
    "use strict";

    const assert = require("./assert.js");
    const tabs = require("./tabs.js");

    describe("Tabs", function () {
        let container;

        const ACTIVE_TAB_CLASS = "activeTab";
        const ACTIVE_TAB = "activeClass";
        const HIDDEN_CONTENT = "hideClass";
        const IRRELEVANT = "irrelevant";

        beforeEach(function () {
            container = document.createElement("div");
            document.body.appendChild(container);
        });

        afterEach(function () {
            removeElement(container);
        });

        it("use a class to hide all content elements except the default upon initialization", function () {


            const defaultTab = createTab();

            const content1 = createTabContent();
            const defaultContent = createTabContent();
            const content3 = createTabContent();

            tabs.initialize({
                tabs: [createTab(), defaultTab, createTab()],
                content: [content1, defaultContent, content3],
                defaultTab: defaultTab,
                activeTabClass: IRRELEVANT,
                hiddenContentClass: HIDDEN_CONTENT
            });

            assertContentHidden(content1, "element 1");
            assertContentVisible(defaultContent, "default content");
            assertContentHidden(content3, "element 3");
        });

        it("switch content when tab is clicked", function () {
            const tab1 = createTab();
            const tab2 = createTab();
            const tab3 = createTab();

            const content1 = createTabContent();
            const content2 = createTabContent();
            const content3 = createTabContent();

            tabs.initialize({
                tabs: [tab1, tab2, tab3],
                content: [content1, content2, content3],
                defaultTab: tab1,
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: HIDDEN_CONTENT
            });

            tab2.click();
            assertContentVisible(content2, "content 2");
            assertContentHidden(content1, "content 1");
            assertContentHidden(content3, "content 3");

            assertTabActive(tab2, "tab2");

            // assert tab 1 is no longer active

            tab3.click();
            assertContentVisible(content3, "content 3");
            assertContentHidden(content1, "content 1");
            assertContentHidden(content2, "content 2");
        });



        it("preserves existing classes when adding new classes", function () {
            const defaultTab = createTab();
            defaultTab.setAttribute("class", "existingTabClass");

            const defaultContent = createTabContent();
            const hiddenContent = createTabContent();
            hiddenContent.setAttribute("class", "existingContentClass");

            tabs.initialize({
                tabs: [defaultTab, createTab()],
                content: [defaultContent, hiddenContent],
                defaultTab: defaultTab,
                activeTabClass: "activeTab",
                hiddenContentClass: "hiddenContent"
            });

            assert.equal(getClasses(defaultTab),
                "existingTabClass activeTab", "tab should preserve existing classes");
            assert.equal(getClasses(hiddenContent),
                "existingContentClass hiddenContent", "content should preserve existing classes");

        });

        it("styles the default tab with a class upon initialization", function () {
            const tab1 = createTab();
            const defaultTab = createTab();
            const tab3 = createTab();

            const defaultContent = createTabContent();

            tabs.initialize({
                tabs: [tab1, defaultTab, tab3],
                content: [createTabContent(), defaultContent, createTabContent()],
                defaultTab: defaultTab,
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: IRRELEVANT
            });

            assertTabInactive(tab1, "tab 1");
            assertTabActive(defaultTab, "default tab");
            assertTabInactive(tab3, "tab 3");
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
        function assertContentHidden(element, elementName) {
            assert.equal(getClasses(element), HIDDEN_CONTENT, elementName + " should be hidden");
        }

        function assertContentVisible(element, elementName) {
            assert.equal(getClasses(element), "", elementName + " should not be hidden");
        }

        function assertTabActive(element, elementName) {
            assert.equal(getClasses(element), ACTIVE_TAB, elementName + " should be active");
        }

        function assertTabInactive(element, elementName) {
            assert.equal(getClasses(element), null, elementName + " should not be styled");
        }
    });



}());