'use strict';

window.domdom = window.domdom || {};

function defaultSessionData() {
    return JSON.stringify({
        recording: [],
    });
}

domdom.sessionData = function(fn) {
    var data = JSON.parse(
        sessionStorage.getItem('domdom.metadata') || defaultMetadata()
    );

    if(!fn) {
        return data;
    }
    else {
        fn.call(data);
        sessionStorage.setItem('domdom.metadata', JSON.stringify(data));
    }
};
