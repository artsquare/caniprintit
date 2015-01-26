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
                name: "vendor/requirejs/require"
                
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
