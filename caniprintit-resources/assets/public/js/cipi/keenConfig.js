define(['keen'], function(keen) {
    if (window.keenProjectKey && window.keenWriteKey) {
        var client = new Keen({
            projectId: keenProjectKey,
            writeKey: keenWriteKey,
            protocol: "https"
        });
        return client;
    } else {
        return {
            addEvent: function(collection, data) {
                console.log("Keen event to " + collection + ": " + JSON.stringify(data));
            }
        };
    }
});