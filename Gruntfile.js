/*jshint node: true */

"use strict";

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		qunit: {
			all: ["test/index.html"]
		},
		jshint: {
			files: [
				"Gruntfile.js",
				"jquery.djangocsrf.js"
            ],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		uglify: {
			options: {
				banner: "/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */\n"
			},
			build: {
				files: {
					"build/jquery.djangocsrf-<%= pkg.version %>.min.js": "jquery.djangocsrf.js"
				}
			}
		}
	});

	for (var key in grunt.file.readJSON("package.json").devDependencies) {
		if (/^grunt-/.test(key)) {
			grunt.loadNpmTasks(key);
		}
	}

    grunt.registerTask("default", ["jshint", "qunit", "uglify"]);
    grunt.registerTask("ci", ["jshint", "qunit"]);
};
