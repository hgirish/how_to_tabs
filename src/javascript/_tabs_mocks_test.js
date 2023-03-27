/* jshint esversion: 6, varstmt: true,  strict:true */
/* globals sinon:false */
(function () {
    "use strict";

    const assert = require("./assert.js");
    const tabs = require("./tabs.js");
    const sinon = require("../vendor/sinon-15.0.3.js");
    describe("Tabs", function () {

        const ACTIVE_TAB = "activeClass";
        const HIDDEN_CONTENT = "hideClass";
        const IRRELEVANT = "irrelevant";

        function createFakeElement() {
            return {
                addEventListener: function () { },
                classList: {
                    add: function () { },
                    remove: function () { }
                },
                click: function () { },
                setAttribute: function () { }
            };
        }




        it("use a class to hide all content elements except the default upon initialization", function () {


            const defaultTab = createFakeElement();

            const content1 = createFakeElement();
            const defaultContent = createFakeElement();
            const content3 = createFakeElement();



            sinon.mock(content1.classList).expects("add").once().withExactArgs(HIDDEN_CONTENT);
            sinon.mock(defaultContent.classList).expects("add").once().withExactArgs(HIDDEN_CONTENT);
            sinon.mock(content3.classList).expects("add").once().withExactArgs(HIDDEN_CONTENT);

            sinon.mock(defaultContent.classList).expects("remove").once().withExactArgs(HIDDEN_CONTENT);

            sinon.mock(content1.classList).expects("remove").never();
            sinon.mock(content3.classList).expects("remove").never();

            tabs.initialize({
                tabs: [createFakeElement(), defaultTab, createFakeElement()],
                content: [content1, defaultContent, content3],
                defaultTab: defaultTab,
                activeTabClass: IRRELEVANT,
                hiddenContentClass: HIDDEN_CONTENT
            });
        });

        it("switch content when tab is clicked", function () {
            const tab1 = createFakeElement();
            const tab2 = createFakeElement();
            const tab3 = createFakeElement();

            const content1 = createFakeElement();
            const content2 = createFakeElement();
            const content3 = createFakeElement();

            sinon.mock(content1.classList).expects("add").once().withExactArgs(HIDDEN_CONTENT);
            sinon.mock(content2.classList).expects("add").once().withExactArgs(HIDDEN_CONTENT);
            sinon.mock(content3.classList).expects("add").once().withExactArgs(HIDDEN_CONTENT);

            sinon.mock(content1.classList).expects("remove").once().withExactArgs(HIDDEN_CONTENT);

            sinon.mock(content2.classList).expects("remove").never();
            sinon.mock(content3.classList).expects("remove").never();

            tabs.initialize({
                tabs: [tab1, tab2, tab3],
                content: [content1, content2, content3],
                defaultTab: tab1,
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: HIDDEN_CONTENT
            });

            tab2.click();


            tab3.click();



        });



        it("preserves existing classes when adding new classes", function () {
            const defaultTab = createFakeElement();
            defaultTab.setAttribute("class", "existingTabClass");

            const defaultContent = createFakeElement();
            const hiddenContent = createFakeElement();
            hiddenContent.setAttribute("class", "existingContentClass");

            tabs.initialize({
                tabs: [defaultTab, createFakeElement()],
                content: [defaultContent, hiddenContent],
                defaultTab: defaultTab,
                activeTabClass: "activeTab",
                hiddenContentClass: "hiddenContent"
            });



        });

        it("styles the default tab with a class upon initialization", function () {
            const tab1 = createFakeElement();
            const defaultTab = createFakeElement();
            const tab3 = createFakeElement();

            const defaultContent = createFakeElement();

            tabs.initialize({
                tabs: [tab1, defaultTab, tab3],
                content: [createFakeElement(), defaultContent, createFakeElement()],
                defaultTab: defaultTab,
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: IRRELEVANT
            });


        });

        it("handles clicks on sub-element within tab element", function () {
            const defaultTab = createFakeElement();
            const complexTab = createFakeElement();
            complexTab.innerHTML = "<a id='link'>link</a>";
            //  const link = document.getElementById('link');


            tabs.initialize({
                tabs: [defaultTab, complexTab],
                content: [createFakeElement(), createFakeElement()],
                defaultTab: defaultTab,
                activeTabClass: ACTIVE_TAB,
                hiddenContentClass: IRRELEVANT
            });

            //  link.click();


        });







    });



}());