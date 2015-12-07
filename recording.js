'use strict';

domdom.clearRecordingData = function(data) {
    data.recording = [];
};

domdom.startRecording = function() {
    if(domdom.sessionData().state === 'recording') {
        return;
    }

    domdom.sessionData(function() {
        this.state = 'recording';

        domdom.clearRecordingData(this);

        domdom.moment(this, 'now').push(domdom.snapshot());
    });
};

domdom.stopRecording = function() {
    domdom.sessionData(function() {
        this.state = 'idle';
    });
};

domdom.recordingData = function() {
    return domdom.sessionData().recording;
};

(function() {
    var observer = new MutationObserver(handleMutation);

    window.domdom = window.domdom || {};

    function handleMutation(records) {
        if(domdom.sessionData().state !== 'recording') {
            return;
        }

        domdom.sessionData(function() {
            var moment = domdom.moment(this, 'now');

            records.forEach(function(record) {
                moment.push(record);
            });
        });
    }

    observer.observe(document, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
    });
})();
