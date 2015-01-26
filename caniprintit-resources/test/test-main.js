var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
    var ret = path.replace(/^\/base\//, '').replace(/\.js$/, '');
    //  console.log("pathToModule for: " + path + " is " + ret);
    return ret
};

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(pathToModule(file));
    }
});



require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/target/classes/public/js',

    paths: {
        vow: 'vendor/vow/lib/vow',
        test: '/base/test'
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});
