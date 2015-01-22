require.config({
    baseUrl: '/js',
    paths: {
        'jquery': '//code.jquery.com/jquery-2.1.3.min',
        'bootstrap': '//netdna.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});