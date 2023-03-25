/* jshint esversion: 6 */
(function () {
    "use strict";

    exports.initialize = function initialize(elementList, className) {
        elementList.forEach(element => {
            element.classList.add(className);
        });
    };

})();