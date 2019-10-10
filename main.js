'use strict';
// пофиксить подтверждние строки
var windowId;
var minAge = '1.1.1990';
var minAgeNumber = 20;
var selectedRow = {
    selectPersonalRow:null,
    selectPositionRow:null
};
var selectPersonalRow;
var selectPositionRow;
var rowsId = {
    person: null,
    position: null,
    orgs: null,
    subs: null
};

// показываем окно выбора
$('#myModal').on('show.bs.modal', function (event) {

    var button = $(event.relatedTarget);
    if (!button[0]) return;
    var buttonId = button[0].id;
    windowId = buttonId;

    if (buttonId === 'person') {
        getPersonView();
    }
    if (buttonId === 'position') {
        getPositionView();
    }
    if (buttonId === 'orgs') {

        getOrgsView();
    }
    if (buttonId === 'subs') {
        getSubsView();
    }
});

// функции формирования представления
function getPersonView() {
    getPersons().then(function (data) {
        console.log(data[3].birthday);

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

//объединяет массива организаций и подразделений по ключу
function getConcatOrgsAndSubs(orgs, subs) {
    var result = orgs.map(function (org) {
        var filteredArr = subs.filter(function (sub) {

            if (sub.org_id === org.id) {
                sub.nameOrg = org.name;
            }
            return sub.org_id === org.id;
        });
        console.log(filteredArr, "filteredArr");
        return filteredArr;
    });
    var r = Object.keys(result).reduce(function (arr, key) {
        return arr.concat(result[key]);
    }, []);

    return r;
}



var selectedRow;
$('#myModal .close').on('click', function (event) {
    $('#tableData table').html("");
});

function getRemoveButtonHTMLById(id) {
    return '<button type="button" class="close" id="' + id + '" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
}


//подтверждение выбора строки или закрытия окна
$('#myModal .modal-footer button').on('click', function (event) {
    var $button = $(event.target);
    if ($button[0].id !== 'ok') {
        $('#tableData table').html("");
        return;
    }

    if (windowId === 'person') {
        var birthDay = moment(selectPersonalRow.find('#birthDay').text(), "DD/MM/YYYY");
        var minAgeValue = moment(minAge);
        if (minAgeValue > birthDay) {

            //вызов окна преждения о возрасте
            $('#modalConfirm').modal();

            //Если подтвердили ОК строки в окне подтверждения
            $('#modalConfirm .modal-footer #modalConfirmOk').on('click', function (event) {
                setPersonHTML();
                console.log("FUCK!!!!");
                $('#modalConfirm .modal-footer #modalConfirmOk').unbind();
                
            })
            
            //Если нажали отмена в окне прдепрждения
            $('#modalConfirm .modal-footer #modalConfirmCancel').on('click', function (event) {
                $('#modalConfirm').modal('toggle');
                $('#myModal').modal();
                getPersonView();
            })

        } else {
            //Если подтвердили ОК строки в окне подтверждения
            setPersonHTML();
        }
    }
    //Формирование предстваления для персонала под кнопкой выбор
    function setPersonHTML() {
        console.log("setPersonHTML");
        console.log(selectPersonalRow.find('#firstName').text(),"selectPersonalRow");

        var firstName = selectPersonalRow.find('#firstName').text();
        var middleName = selectPersonalRow.find('#middleName').text();
        var lastName = selectPersonalRow.find('#lastName').text();

        var buttonRemove = getRemoveButtonHTMLById('removePerson');

        $('#selectedPerson').text(lastName + ' ' + middleName + ' ' + firstName).append(buttonRemove);

        $('#removePerson').on('click', function (event) {
            $('#selectedPerson').html("");
        });
    }


    if (windowId === 'position') {
        var birthDay = parseInt(selectPositionRow.find('#minAge').text());

        if (minAgeNumber < birthDay) {
            $('#modalConfirm').modal();

            $('#modalConfirm .modal-footer #modalConfirmOk').on('click', function (event) {
                setPositionalHTML();
                $('#modalConfirm .modal-footer #modalConfirmOk').unbind();
            })

        } else {
            setPositionalHTML();
        }
    }

    function setPositionalHTML() {
        console.log(selectPositionRow.find('#name'), "setPositionalHTML!!!!!!!!!!");
        var buttonRemove = getRemoveButtonHTMLById('removePosition');
        $('#selectedPosition').text(selectPositionRow.find('#name').text()).append(buttonRemove);
        $('#removePosition').on('click', function (event) {
            $('#selectedPosition').html("");
        });
    }

    if (windowId === 'orgs') {
        var buttonRemove = getRemoveButtonHTMLById('removeOrgs');
        $('#selectedOrgs').text(selectedRow.find('#name').text()).append(buttonRemove);
        $('#removeOrgs').on('click', function (event) {
            $('#selectedOrgs').html("");
        });
    }
    if (windowId === 'subs') {
        var buttonRemove = getRemoveButtonHTMLById('removeSubs');
        $('#selectedSubs').text(selectedRow.find('#name').text()).append(buttonRemove);
        $('#removeSubs').on('click', function (event) {
            $('#selectedSubs').html("");
        });
    }
    $('#tableData table').html("");
});



//выбор строки
$('#tableData').on('click', '.clickable-row', function (event) {
    $(this).addClass('active').siblings().removeClass('active');

    // switch (windowId){
    //     case 'personal':
    //         selected
    // }
    selectPersonalRow = $(this);
    selectPositionRow = $(this);
    selectedRow = $(this);
    console.log(selectedRow.find('#name').text());
});