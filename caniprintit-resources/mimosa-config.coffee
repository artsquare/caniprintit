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
      exclude: [],
      compiled: true,
      copied: true,
      vendor: false,
      jshintrc: ".jshintrc",
      rules: {}

    bower:
        copy:
            mainOverrides: {}

    require:
        optimize:
            overrides:
                name: "vendor/requirejs/require"
                
    csslint:
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
