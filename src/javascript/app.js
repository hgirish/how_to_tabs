/* jshint esversion: 6, varstmt: true,  strict:true */
(function () {
    "use strict";

    const tabs = require("./tabs.js");

    document.addEventListener("DOMContentLoaded", function () {
        const tab1 = document.getElementById("tab1");
        const tab2 = document.getElementById("tab2");
        const tab3 = document.getElementById("tab3");

        const content1 = document.getElementById("content1");
        const content2 = document.getElementById("content2");
        const content3 = document.getElementById("content3");

        tabs.initialize({
            tabs: [tab1, tab2, tab3],
            content: [content1, content2, content3],
            defaultTab: tab2,
            activeTabClass: "active",
            hiddenContentClass: "hidden"
        });
    });

}());