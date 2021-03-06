require.config({
    baseUrl: '/js',
    paths: {
        'jquery': '//code.jquery.com/jquery-2.1.3.min',
        'bootstrap': '//netdna.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min',
        'vow': 'vendor/vow/lib/vow',
        'bacon': 'vendor/bacon/dist/Bacon',
        'bacon.jquery': 'vendor/bacon.jquery/dist/bacon.jquery',
        'bacon.model': 'vendor/bacon.model/dist/bacon.model',
        'keen': 'https://d26b395fwzu5fz.cloudfront.net/3.2.2/keen.min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});