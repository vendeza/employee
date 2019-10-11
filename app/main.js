'use strict';

var windowId;
var minAge = '1.1.1990';
var minAgeNumber = 20;
var selectedPersonRow;
var selectedPositionRow;
var selectedOrgsRow;
var selectedSubsRow;

// показываем окно выбора строк со значениями
$('#myModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    if (!button[0]) return;
    var buttonId = button[0].id;
    windowId = buttonId;

    if (buttonId === 'person') {
        getPersonView(selectedPersonRow);
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


//объединяет массив организаций и подразделений по ключу
function getConcatOrgsAndSubs(orgs, subs) {
    var result = orgs.map(function (org) {
        var filteredArr = subs.filter(function (sub) {

            if (sub.org_id === org.id) {
                sub.nameOrg = org.name;
            }
            return sub.org_id === org.id;
        });
        return filteredArr;
    });
    var r = Object.keys(result).reduce(function (arr, key) {
        return arr.concat(result[key]);
    }, []);

    return r;
}



$('#myModal .close').on('click', function (event) {
    $('#tableData table').html("");
});

function getRemoveButtonHTMLById(id) {
    return '<button type="button" class="close" id="' + id + '" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
}


//Выбор строки или закрытие окна
$('#myModal .modal-footer button').on('click', function (event) {
    var $button = $(event.target);

    if ($button[0].id !== 'ok') {
        $('#tableData table').html("");
        return;
    }

    if (windowId === 'person') {
        person();
    }
  
    if (windowId === 'position') {
        position();
    }
    
    if (windowId === 'orgs') {
        orgs();
    }
  
    if (windowId === 'subs') {
        sub();
    }
    $('#tableData table').html("");
});



//выбор строки в окне
$('#tableData').on('click', '.clickable-row', function (event) {
    $(this).addClass('active').siblings().removeClass('active');
   
    if (windowId === 'person') {
        selectedPersonRow = $(this);
    }
    if (windowId === 'position') {
        selectedPositionRow = $(this);
    }
    if (windowId === 'orgs') {
        selectedOrgsRow = $(this);
    }
    if (windowId === 'subs') {
        selectedSubsRow = $(this);
    }
});