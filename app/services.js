'use strict';

function getPersons() {
    return $.getJSON("../data/persons.json", function (data) {
        data.sort(function (a, b) {
            if (a.lastname < b.lastname) { return -1; }
            if (a.lastname > b.lastname) { return 1; }
            return 0;
        })
    })
}

function getPositions() {
    return $.getJSON("../data/positions.json", function (data) {
        console.log(data);
        data.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
    })
}
function getOrgs() {
    return $.getJSON("../data/orgs.json", function (data) {
        console.log(data);
        data.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
        return data
    });
}

function getSubs() {
    return $.getJSON("../data/subs.json", function (data) {
        console.log(data);
        data.sort(function (a, b) {
            if (a.lastname < b.lastname) { return -1; }
            if (a.lastname > b.lastname) { return 1; }
            return 0;
        })
        return data;
    });
}