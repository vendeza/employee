// Формирует надпись под кнопкой Ввод и привзяывает к ней кнопку удалить.
// Проверяет на возраст. Если возраст больше то выдает окно подтверждения.
function person() {
    if (!selectedPersonRow) {
        alert('Выберете значение');
        $('#tableData table').html("");
        return;
    }

    var birthDay = moment(selectedPersonRow.find('#birthDay').text(), "DD/MM/YYYY");
    var minAgeValue = moment(minAge);
    if (minAgeValue > birthDay) {

        //вызов окна преждения о возрасте
        $('#modalConfirm').modal();

        //Если подтвердили ОК строки в окне подтверждения
        $('#modalConfirm .modal-footer #modalConfirmOk').on('click', function (event) {
            setPersonHTML();

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

function setPersonHTML() {

    var firstName = selectedPersonRow.find('#firstName').text();
    var middleName = selectedPersonRow.find('#middleName').text();
    var lastName = selectedPersonRow.find('#lastName').text();
    var id = parseInt(selectedPersonRow.attr("data-id"));

    var buttonRemove = getRemoveButtonHTMLById('removePerson');

    $('#selectedPerson').text(lastName + ' ' + middleName + ' ' + firstName).append(buttonRemove);
    $('#selectedPerson').attr('data-id', id);
    $('#removePerson').on('click', function (event) {

        $('#selectedPerson').html("");
    });
    //selectedPersonRow = null;

}

function position() {
    if (!selectedPositionRow) {
        alert('Выберете значение');
        $('#tableData table').html("");
        return;
    }
    var birthDay = parseInt(selectedPositionRow.find('#minAge').text());

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
    if (!selectedPositionRow) {
        alert('Выберете значение');
        $('#tableData table').html("");
        return;
    }
    var buttonRemove = getRemoveButtonHTMLById('removePosition');
    $('#selectedPosition').text(selectedPositionRow.find('#name').text()).append(buttonRemove);
    $('#removePosition').on('click', function (event) {
        $('#selectedPosition').html("");
    });
    selectedPositionRow = null;
}

function orgs() {
    if (!selectedOrgsRow) {
        alert('Выберете значение');
        $('#tableData table').html("");
        return;
    }
    var buttonRemove = getRemoveButtonHTMLById('removeOrgs');
    $('#selectedOrgs').text(selectedOrgsRow.find('#name').text()).append(buttonRemove);
    $('#removeOrgs').on('click', function (event) {
        $('#selectedOrgs').html("");
    });
    selectedOrgsRow = null;
}

function sub() {
    if (!selectedSubsRow) {
        alert('Выберете значение');

        return;
    }

    var buttonRemove = getRemoveButtonHTMLById('removeSubs');
    $('#selectedSubs').text(selectedSubsRow.find('#name').text()).append(buttonRemove);
    $('#removeSubs').on('click', function (event) {
        $('#selectedSubs').html("");
    });
    selectedSubsRow = null;
}