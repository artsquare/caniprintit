exports.config = 
    modules: [
        "copy"
        "jshint"
        "csslint"
        "require"
        "minify-js"
        "minify-css"
        "bower"
        "coffeescript"
        "less"
    ]

    jshint:
        exclude: [
            "public/bootstrap/bootstrap.min.js"
            "public/js/tiff-js/TIFFParser.js"
            "public/js/cipi/mobileCheck.js"
        ],
        compiled: true,
        copied: true,
        vendor: false,
        jshintrc: ".jshintrc",
        rules: {}

    bower:
        copy:
            strategy: "none"
            mainOverrides:
                when: ["when.js", "lib/"]

    require:
        optimize:
            overrides:
                name: null # turns off Almond and uses r.js instead
                paths:
                    jquery: 'empty:'
                    bootstrap: 'empty:'
                    keen: 'empty:'
#                generateSourceMaps: true
#                incompatible with preserveLicenseComments; FIXME
            modules: [
                { name: "main" }
            ]

                
    csslint:
        exclude: ["public/bootstrap/bootstrap.min.css"]
        compiled: false

    watch:
        exclude: [
            /[/\\](\.|~)[^/\\]+$/
        ]
        javascriptDir: "public/js"
        compiledDir: "target/classes"

    vendor:
        javascripts: "public/js/vendor"
        stylesheets: "public/css/vendor"
