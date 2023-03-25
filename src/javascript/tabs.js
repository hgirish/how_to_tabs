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

        const activeIndex = findIndexOfDefaultElement(tabs, defaultTab);
        const defaultContent = content[activeIndex];

        content.forEach(element => {
            element.classList.add(hiddenContentClass);
        });
        defaultContent.classList.remove(hiddenContentClass);

        defaultTab.classList.add(activeTabClass);

    };

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