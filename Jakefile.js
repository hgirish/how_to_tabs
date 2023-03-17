(function () {
    "use strict";

    var semver = require('semver');

    desc("Deault build");
    task("default", ["version"], function () {
        console.log("\n\nBUILD OK");
    });

    desc("Check Node version")
    task("version", function () {
        console.log("Checking node version: .");

        var packageJson = require("./package.json");
        var expectedVersion = packageJson.engines.node;

        var actualVersion = process.version;
        if (semver.neq(expectedVersion, actualVersion)) {
            fail("Incorrect Node version: expected " + expectedVersion + ", but was " + actualVersion)
        }
    })

}());