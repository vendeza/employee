'use strict';
function getPersonView(selectedPersonRow) {
    getPersons().then(function (data) {
        $('#tableData table').html("");
        $('#headerModal').html("");
        $('#headerModal').append('Сотрудник');
        $('#tableData table').append('<tr><th>Фамилия</th><th>Имя</th><th>Отчество</th><th>Дата рождения</th></tr>');
        data.forEach(function (i) {
            if (selectedPersonRow) {

                var id = parseInt(i.id);
                var selectedPersonRowId = parseInt($('#selectedPerson').attr("data-id"));

                if (id === selectedPersonRowId) {
                    $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row active"><td id="lastName">' + i.lastname +
                        '</td><td id="middleName">' + i.middlename + '</td><td id="firstName">' + i.firstname + '</td><td id="birthDay">' + i.birthday + '</td></tr>');
                } else {
                    $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="lastName">' + i.lastname +
                        '</td><td id="middleName">' + i.middlename + '</td><td id="firstName">' + i.firstname + '</td><td id="birthDay">' + i.birthday + '</td></tr>');
                }
            } else {
                $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="lastName">' + i.lastname +
                    '</td><td id="middleName">' + i.middlename + '</td><td id="firstName">' + i.firstname + '</td><td id="birthDay">' + i.birthday + '</td></tr>');
            }


        })
    });
}


function getPositionView() {

    $('#headerModal').html("");
    $('#tableData table').html("");
    $('#headerModal').append('Должность');
    $('#tableData table').append('<tr><th>Название</th><th>Минимальный возраст</th><th>Максимальный возраст</th></tr>');
    getPositions().then(function (data) {
        data.forEach(function (i) {

            //выводим строки и формириуем выделение строки
            if (selectedPositionRow) {
                var id = parseInt(i.id);
                var selectedPositionRowId = parseInt($('#selectedPosition').attr("data-id"));
                if (id === selectedPositionRowId) {
                    $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row active"><td id="name">' + i.name + '</td><td id="minAge">' + i.min_age +
                        '</td><td id="maxAge">' + i.max_age + '</td></tr>');
                } else {
                    $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="name">' + i.name + '</td><td id="minAge">' + i.min_age +
                        '</td><td id="maxAge">' + i.max_age + '</td></tr>');
                }
            } else {
                $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="name">' + i.name + '</td><td id="minAge">' + i.min_age +
                    '</td><td id="maxAge">' + i.max_age + '</td></tr>');
            }

        })
    })
}
function getOrgsView() {
    $('#headerModal').html("");
    $('#tableData table').html("");
    $('#headerModal').append('Выбор организации');
    getOrgs().then(function (data) {
        $('#tableData table').append('<tr><th>Название</th><th>Страна</th></tr>');
        data.forEach(function (i) {
            if (selectedOrgsRow) {
                var id = parseInt(i.id);
                var selectedOrgsRowId = parseInt($('#selectedOrgs').attr("data-id"));
                if (id === selectedOrgsRowId) {
                    $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row active"><td id="name">' +
                        i.name + '</td><td id="country">' + i.country + '</td></tr>');
                } else {
                    $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="name">' +
                        i.name + '</td><td id="country">' + i.country + '</td></tr>');
                }
            } else {
                $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="name">' +
                        i.name + '</td><td id="country">' + i.country + '</td></tr>');
            }
        })
    });
}

function getSubsView() {
    $('#headerModal').html("");
    $('#tableData table').html("");
    $('#headerModal').append('Выбор подразделения');
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

                if (selectedSubsRow) {

                    var id = parseInt(i.id);
                    var selectedSubsRowwId = parseInt($('#selectedSubs').attr("data-id"));
                    if (id === selectedSubsRowwId) {
                        $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row active"><td id="name">' +
                            i.name + '</td><td id="country">' + i.nameOrg + '</td></tr>');
                    } else {
                        $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="name">' +
                            i.name + '</td><td id="country">' + i.nameOrg + '</td></tr>');
                    }
                } else {
                    $('#tableData table').append('<tr data-id=' + i.id + '" class="clickable-row"><td id="name">' +
                        i.name + '</td><td id="country">' + i.nameOrg + '</td></tr>');
                }
            })
        });
    });
}