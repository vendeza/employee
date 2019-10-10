'use strict';
function getPersonView() {
    getPersons().then(function (data) {

        $('#headerModal').html("");
        $('#headerModal').append('Сотрудник');
        $('#tableData table').append('<tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Дата рождения</th></tr>');
        data.forEach(function (i) {
            $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="lastName">' + i.lastname +
                '</td><td id="middleName">' + i.middlename + '</td><td id="firstName">' + i.firstname + '</td><td id="birthDay">' + i.birthday + '</td></tr>');
        })
    });
}
function getPositionView() {
    $('#headerModal').html("");
    $('#headerModal').append('Должность');
    getPositions().then(function (data) {
        console.log(data);
        $('#tableData table').append('<tr><th>Должность</th><th>Минимальный возраст</th><th>Максимальный возраст</th></tr>');
        data.forEach(function (i) {
            $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="name">' + i.name + '</td><td id="minAge">' + i.min_age +
                '</td><td id="maxAge">' + i.max_age + '</td></tr>');
        })
    });
}
function getOrgsView() {
    $('#headerModal').html("");
    $('#headerModal').append('Выбор организации');
    getOrgs().then(function (data) {
        $('#tableData table').append('<tr><th>Название</th><th>Страна</th></tr>');
        data.forEach(function (i) {

            $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="name">' +
                i.name + '</td><td id="country">' + i.country + '</td></tr>');
        })
    });
}

function getSubsView() {
    $('#headerModal').html("");
    $('#headerModal').append('Выбор организации');
    getSubs().then(function (subs) {
        getOrgs().then(function (orgs) {
            var subsAndOrgs = getConcatOrgsAndSubs(orgs, subs);
            subsAndOrgs.sort(function (a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            })

            $('#tableData table').append('<tr><th>Название</th><th>Организация</th></tr>');
            subsAndOrgs.forEach(function (i) {

                $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="name">' +
                    i.name + '</td><td id="country">' + i.nameOrg + '</td></tr>');
            })
        });
    });
}