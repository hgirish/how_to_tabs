(function () {
    "use strict";

    var assert = require("./assert.js");

    describe("Something", function () {

        it("something", function () {
            var div = document.createElement("div");

            div.innerHTML = "This is an example div.";

            document.body.appendChild(div);

            var p = document.createElement("p");

            p.innerHTML = "This is an embedded paragraph";

            div.appendChild(p);

            div.parentNode.removeChild(div);
        });

    });

}());