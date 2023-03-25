/* jshint esversion: 6 */
(function () {
    "use strict";

    exports.initialize = function initialize(options) {
        const { content: content, defaultElement, contentHideClass: contentHideClass } = options;

        if (content === undefined) throw new Error("expected options.content");
        if (defaultElement === undefined) throw new Error("expected options.defaultElement");
        if (contentHideClass === undefined) throw new Error("expected options.contentHideClass");


        content.forEach(element => {
            element.classList.add(contentHideClass);
        });
        defaultElement.classList.remove(contentHideClass);
    };

})();