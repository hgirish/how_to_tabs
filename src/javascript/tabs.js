/* jshint esversion: 6, varstmt: true,  strict:true */
(function () {
    "use strict";

    exports.initialize = function initialize(options) {
        checkOptions(options);

        handleClicks(options);
        showTab(options.defaultTab, options);


    };

    function checkOptions(options) {
        const { tabs, content, defaultTab, hiddenContentClass, activeTabClass } = options;

        checkOption(tabs, "options.tabs");
        checkOption(activeTabClass, "options.activeTabClass");
        checkOption(content, "options.content");
        checkOption(defaultTab, "options.defaultTab");
        checkOption(hiddenContentClass, "options.hiddenContentClass");
    }
    function handleClicks(options) {
        options.tabs.forEach(function (tabElement) {
            tabElement.addEventListener("click", function (event) {
                showTab(tabElement, options);
            });
        });
    }

    function showTab(tabToShow, options) {
        const activeIndex = options.tabs.findIndex((element => element === tabToShow));
        if (activeIndex === -1) throw new Error("Could not find default in list");

        const contentToShow = options.content[activeIndex];

        options.content.forEach(element => {
            element.classList.add(options.hiddenContentClass);
        });

        options.tabs.forEach(function (element) {
            element.classList.remove(options.activeTabClass);
        });

        contentToShow.classList.remove(options.hiddenContentClass);

        tabToShow.classList.add(options.activeTabClass);
    }

    function checkOption(option, name) {
        if (option === undefined) throw new Error("Expected " + name);
    }



})();