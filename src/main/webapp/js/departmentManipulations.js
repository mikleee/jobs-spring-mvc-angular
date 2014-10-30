var buttonManager = new ButtonManager();
var body = $('body');


function goToDepList() {

    $.ajax({
        dataType: "json",
        url: "/depList",
        type: "GET"
    })
        .done(function renderDepartmentList(departments) {
            var body = $('body');

            var config = {
                list: departments,
                prefix: 'dep',
                titleButtonSection: buttonManager.showAddDepartmentFormButton,
                titleButtonSectionClass: 'withButtonsShort',
                contentButtonSection: buttonManager.contentDepartmentButtonSection,
                onClickContentTRHandler: showEmployeeList,
                tableName: "Department list"
            };

            var table = listTableFromData(config);
            $(body).empty().append(table);
        })
        .fail(function () {
            alert("fail");
        });

}


function deleteDepartment(event) {

    event.stopPropagation();

    var departmentRow = $(this).parent().parent().parent(); //<tr id=dep_id><td><span><this></span></td></tr>
    var depId = +$(departmentRow).attr('id').substring(4);

    $.ajax({
        //dataType: "json",
        url: "/depDelete",
        type: "POST",
        data: {'depId': depId}
    })
        .done(function (response) {
            var addOrUpdateForm = $('#dep_addOrUpdate');
            if ($(addOrUpdateForm).attr('dep_id') == depId) {
                $(addOrUpdateForm).remove();
            }
            $(departmentRow).remove();
        })
        .fail(function () {
            alert("delete failed");
        });
}


function renderUpdateDepartmentForm(evenet) {
    var body = $('body');
    evenet.stopPropagation();

    var department = new Department();
    var updating = ($(this).attr('name') == 'depEdit'); //is updating or adding?

    if (updating) {
        var departmentRow = $(this).parent().parent().parent(); //<tr id=dep_id><td><span><this></span></td></tr>
        var depId = +$(departmentRow).attr('id').substring(4);
        department = new Department(depId, $('#dep_name_' + depId).html(), $('#dep_location_' + depId).html());
    }

    $(body).empty()
        .append(createAddOrEditForm(department, "Department", buttonManager.addOrUpdateDepartmentButtonSection));

}


function addDepartment() {

    var id = $('#dep_addOrUpdate').attr('dep_id');
    var depName = $('#dep_name').val();
    var depLocation = $('#dep_location').val();

    $.ajax({
        //dataType: "json",
        url: "/doDepAddOrUpdate",
        type: "POST",
        data: {'id': id, 'name': depName, 'location': depLocation}
    })
        .done(goToDepList)
        .fail(function (response) {
            alert("Department # " + response + " delete failed");
        });

}

