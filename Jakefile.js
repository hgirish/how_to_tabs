/* globals jake:false, desc:false, task:false, complete:false, fail:false */
/*jshint esversion: 6 */
(function () {
    "use strict";

    var semver = require('semver');
    var jshint = require("simplebuild-jshint");
    var karma = require("simplebuild-karma");
    var shell = require("shelljs");

    const KARMA_CONFIG = "karma.conf.js";
    const DIST_DIR = "generated/dist";

    //***** General-purpose tasks  */

    desc("Start the karma server (run this first)");
    task("karma", function () {
        console.log("Starting Karma Server");
        karma.start({
            configFile: KARMA_CONFIG
        }, complete, fail);
    }, { async: true });




    desc("Deault build");
    task("default", ["version", "lint", "test"], function () {
        console.log("\n\nBUILD OK");
    });

    desc("Run a localhost server");
    task("run", ["build", "runServer"], function () {
        console.log("running server");
    });


    task("runServer", function () {
        console.log("running server");
        jake.exec("node node_modules/http-server/bin/http-server " + DIST_DIR, { interactive: true }, complete, fail);
    }, { async: true });

    desc("Erase all generated files");
    task("clean", function () {
        console.log("Erasing generated files: ");

        shell.rm("-rf", "generated");
    });


    //*** Supporting tasks  */

    desc("Check Node version");
    task("version", function () {
        console.log("Checking node version: .");

        var packageJson = require("./package.json");
        var expectedVersion = packageJson.engines.node;

        var actualVersion = process.version;
        if (semver.neq(expectedVersion, actualVersion)) {
            fail("Incorrect Node version: expected " + expectedVersion + ", but was " + actualVersion);
        }
    });

    desc("Lint Javascript code");
    task("lint", function () {
        process.stdout.write("Linting Javascript: ");

        jshint.checkFiles({
            files: ["Jakefile.js", "src/javascript/*.js"],
            options: lintOptions(),
            globals: lintGlobals()
        }, complete, fail);
    }, { async: true });

    desc("Testing javascript code");
    task("test", function () {
        process.stdout.write("Testing Javascript: ");
        karma.run({
            configFile: KARMA_CONFIG,
            expectedBrowsers: [
                "Chrome 111.0.0.0 (Windows 10)",
                "Edge 111.0.1661.44 (Windows 10)",
                "Firefox 111.0 (Windows 10)",
                "Chrome 112.0.0.0 (Windows 10)",
                "Chrome 111.0.0.0 (Android 12)"
            ],
            strict: !process.env.loose
        }, complete, fail);
    }, { async: true });

    desc("Build distribution directory");
    task("build", [DIST_DIR], function () {
        console.log("Building distribution directory: .");

        shell.rm("-rf", DIST_DIR + "/*");
        shell.cp("src/content/*", DIST_DIR);

        jake.exec(
            "node node_modules/browserify/bin/cmd.js -r ./src/javascript/tabs.js:tabs -o " + DIST_DIR + "/bundle.js",
            { interactive: true },
            complete);
    }, { async: true });

    directory(DIST_DIR);

    function lintOptions() {
        return {
            bitwise: true,
            eqeqeq: true,
            forin: true,
            freeze: true,
            futurehostile: true,
            latedef: "nofunc",
            noarg: true,
            nocomma: true,
            nonbsp: true,
            nonew: true,
            strict: true,
            undef: true,

            node: true,
            browser: true
        };


    }

    function lintGlobals() {
        return {
            // Mocha
            describe: false,
            it: false,
            before: false,
            after: false,
            beforeEach: false,
            afterEach: false,
            directory: false
        };
    }


}());





