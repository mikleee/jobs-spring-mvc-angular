//======================================================================================================================
//==================================================BUTTONS=============================================================
//======================================================================================================================

function ButtonManager() {

    /* $('#table').on('click', 'button.delete', function(e) {
     var button = $(e.target);

     var tr = button.parents('tr');

     var user = tr.data('user');

     user.id
     });
     $('#table').on('click', 'button.edit', function(e) {
     var button = $(e.target);

     var tr = button.parents('tr');

     var user = tr.data('user');

     user.id
     });

     var tr = $('<tr/>')
     .append($('<td/>').html('qweqwe'))
     .append($('<td/>').html('qweqwe'))
     .append($('<td/>').html('qweqwe'))
     .append($('<td/>').html('qweqwe'))
     .data('user', {id:1, name: 'qweqwe'});

     $('#table').append(tr);*/


    //general buttons
    this.goToStartPageButton = createButton('Go Home', reRenderStartPage);
    this.goToDepListButton = createButton('Department list', goToDepList);

    //department buttons

    this.showAddDepartmentFormButton = createButton('Add', renderUpdateDepartmentForm);

    this.contentDepartmentButtonSection = $('<span>')
        .append(createButton('Edit', renderUpdateDepartmentForm, 'depEdit'))
        .append('\n')
        .append(createButton('Delete', deleteDepartment));


    this.addOrUpdateDepartmentButtonSection = $('<span>')
        .append(createButton('Execute', addDepartment))
        .append('\n')
        .append(createButton('Department list', goToDepList));

    //employee buttons

    this.titleEmployeeButtonSection = $('<span>')
        .append(createButton('Add Employee', renderAddOrEditEmployeeForm))
        .append('\n')
        .append(createButton('Department list', goToDepList));

    this.contentEmployeeButtonSection = $('<span>')
        .append(createButton('Edit', renderAddOrEditEmployeeForm, 'empEdit'))
        .append('\n')
        .append(createButton('Delete', deleteEmployee));

    this.addOrUpdateEmployeeButtonSection = $('<span>')
        .append(createButton('Execute', addEmployee, null, 'goToEmpListAfterUpdateOrAdd'))
        .append('\n')
        .append(createButton('Employee list', showEmployeeList, null, 'goToEmpList'));

//-----------------------

    function createButton(value, onclickHandler, name, id) {
        var button = $('<button>').html(value).on('click', onclickHandler);
        button.attr('name', name ? name : null);
        button.attr('id', id ? id : null);
        return button;
    }

}


//======================================================================================================================
//================================================LIST TABLE============================================================
//======================================================================================================================

function titleTRFromData(dataItem, buttonSection, buttonSectionClass) {

    var tr = $('<tr>');

    for (var key in dataItem) {
        $(tr)
            .append($('<th>')
                .append(key.toUpperCase())
            );
    }

    $(tr)
        .append($('<th>').addClass(buttonSectionClass)
            .append($(buttonSection).clone(true))
        );

    return tr;
}


function contentTRFromData(dataItem, prefix, buttonSection) {

    var itemId = dataItem.id;

    var tr = $('<tr>').attr({'id': prefix + '_' + itemId, 'class': 'contentTR'});

    for (var key in dataItem) {
        $(tr)
            .append($('<td>').attr({'id': prefix + '_' + key + '_' + itemId, 'name': itemId  })
                .append(key == 'birth' ? dateFormat(dataItem[key]) : dataItem[key])
            );
    }

    $(tr)
        .append($('<td>')
            .append($(buttonSection).clone(true))
        );

    return tr;

}


function listTableFromData(config) {

    var table = $('<table>').attr({'id': config.prefix + 'List'});

    var titleTR = titleTRFromData(config.list[0], config.titleButtonSection, config.titleButtonSectionClass);

    $(table).append(titleTR);

    var childs = $(titleTR).children();

    var numberOfColumns = childs.length;

    $(titleTR)
        .before($('<tr>').addClass("tableName")
            .append($('<th>').attr('colspan', numberOfColumns)
                .append(config.tableName.toUpperCase()
                )
            )
        );


    for (var i = 0; i < config.list.length; i++) {
        var contentTR = contentTRFromData(config.list[i], config.prefix, config.contentButtonSection);
        $(table).append(contentTR);

        var classOfPreviewElement = ($(contentTR).prev()).attr('class');
        var classOfCurrentElement = (classOfPreviewElement != 'contentTR anotherColorTr') ? 'contentTR anotherColorTr' : 'contentTR';
        $(contentTR).attr({'class': classOfCurrentElement});
        $(contentTR).on('click', config.onClickContentTRHandler);
    }

    return table;

}


//======================================================================================================================
//============================================ADD & UPDATE TABLE========================================================
//======================================================================================================================


function createAddOrEditForm(item, entityTypeName, addOfUpdateButtonSection) {

    var prefix = entityTypeName.substring(0, 3).toLowerCase();

    var table = $('<table>').attr({'id': prefix + '_addOrUpdate', 'class': 'editForm'});

    var itemId = item.id;
    $(table).attr(prefix + '_id', itemId);

    $(table) //append head
        .append($('<tr>')
            .append($('<th>').attr({'colspan': '2'})
                .append('Add or update ' + entityTypeName)
            )
        );

    for (var key in item) { //append mapped inputs
        if (key == 'id') continue;
        $(table)
            .append($('<tr>')
                .append($('<td>')
                    .append(key.toUpperCase())
                )
                .append($('<td>').
                    append($('<input>').attr({'id': prefix + "_" + key, 'type': 'text', 'value': item[key]}))
                )
            );
    }

    $(table) //append button
        .append($('<tr>')
            .append($('<th>').attr({'colspan': '2'})
                .append($(addOfUpdateButtonSection).clone(true))
            )
        );

    return table;

}

function dateFormat(birth) {
    var date = new Date(birth);
    var year = date.getFullYear();
    var month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    var dayOfMonth = date.getDate();
    return year + "-" + month + "-" + dayOfMonth;
}

/*
 new Dialog({elements: {
 BIRTH: {formatter: function (date) {
 return 'asdasdasd';
 }}
 }});

 Dialog = function (opt) {
 this.opt = opt;


 };*/
