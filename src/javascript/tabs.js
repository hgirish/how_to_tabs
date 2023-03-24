(function () {
    "use strict";

    exports.initialize = function initialize(element, className) {
        var existingClasses = element.getAttribute("class");
        if (existingClasses === null) existingClasses = className;
        else existingClasses += " " + className;

        element.setAttribute("class", existingClasses);
    };
})();