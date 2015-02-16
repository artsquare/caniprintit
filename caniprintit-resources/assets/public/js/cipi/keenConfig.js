define(['keen'], function(Keen) {
    if (window.keenProjectId && window.keenWriteKey && window.keenCollection) {
        var client = new Keen({
            projectId: window.keenProjectId,
            writeKey: window.keenWriteKey,
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