define(['keen'], function(keen) {
    if (window.keenProjectId && window.keenWriteKey && window.keenCollection) {
        var client = new Keen({
            projectId: keenProjectId,
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