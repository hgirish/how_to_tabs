/* jshint esversion: 6, varstmt: true,  strict:true */
(function () {
    "use strict";

    exports.initialize = function initialize(options) {
        const { tabs, content, defaultTab, hiddenContentClass, activeTabClass } = options;

        checkOption(tabs, "options.tabs");
        checkOption(activeTabClass, "options.activeTabClass");
        checkOption(content, "options.content");
        checkOption(defaultTab, "options.defaultTab");
        checkOption(hiddenContentClass, "options.hiddenContentClass");

        showTab(options.defaultTab, options);

    };

    function showTab(tabToShow, options) {
        const activeIndex = findIndexOfDefaultElement(options.tabs, tabToShow);
        const contentToShow = options.content[activeIndex];

        options.content.forEach(element => {
            element.classList.add(options.hiddenContentClass);
        });
        contentToShow.classList.remove(options.hiddenContentClass);

        tabToShow.classList.add(options.activeTabClass);
    }

    function checkOption(option, name) {
        if (option === undefined) throw new Error("Expected " + name);
    }

    function findIndexOfDefaultElement(contentTabs, defaultContentTab) {
        for (let i = 0; i < contentTabs.length; i++) {
            if (contentTabs[i] === defaultContentTab) return i;
        }
        throw new Error("Could not find default in list");
    }

})();