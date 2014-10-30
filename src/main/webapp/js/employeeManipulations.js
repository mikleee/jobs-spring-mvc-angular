var buttonManager = new ButtonManager();


function showEmployeeList(event) {

    var body = $('body');

    var executeButton = document.getElementById('goToEmpListAfterUpdateOrAdd');

    if (executeButton) {
        var depId = $(executeButton).attr('dep_id');
    } else {
        var departmentRow = $(this);
        depId = +($(departmentRow).attr('id')).substring(4); //(dep_id).substring(4) = id
    }

    $.ajax({
        dataType: "json",
        url: "/depEmpList",
        type: "GET",
        data: {'depId': depId}
    })
        .done(function (response) {
            var department = response.department;
            var empList = response.employees;

            var config = {
                list: empList,
                prefix: 'emp',
                titleButtonSection: buttonManager.titleEmployeeButtonSection,
                titleButtonSectionClass: 'withButtonsShort',
                contentButtonSection: buttonManager.contentDepartmentButtonSection,
                onClickContentTRHandler: null,
                tableName: "Employee list of Department: " + department.name + " (" + department.location + ")"
            };

            var table = listTableFromData(config);
            $(table).attr('dep_id', depId);
            $(body).empty().append(table);
        })
        .fail(function () {
            alert("fail");
        });

}


function renderAddOrEditEmployeeForm(event) {

    var body = $('body');
    event.stopPropagation();

    var employee = new Employee();
    var updating = ($(this).attr('name') == 'empEdit'); //is updating or adding?
    var depId = $('#empList').attr('dep_id');

    if (updating) {
        var employeeRow = $(this).parent().parent().parent(); //<tr id=dep_id><td><span><this></span></td></tr>
        var empId = +$(employeeRow).attr('id').substring(4);
        employee = new Employee(empId, $('#emp_name_' + empId).html(), $('#emp_salary_' + empId).html(), $('#emp_email_' + empId).html(), $('#emp_birth_' + empId).html());
    }

    var form = createAddOrEditForm(employee, "Employee", buttonManager.addOrUpdateEmployeeButtonSection);
    $(form).attr('dep_id', depId);

    $(body).empty().append(form);

    //$('#emp_birth').attr('type', 'date');
    $('#goToEmpList').attr('dep_id', depId);
    $('#goToEmpListAfterUpdateOrAdd').attr('dep_id', depId);

}


function deleteEmployee(event) {

    event.stopPropagation();

    var employeeRow = $(this).parent().parent().parent(); //<tr id=emp_id><td><span><this></span></td></tr>
    var empId = +$(employeeRow).attr('id').substring(4);

    $.ajax({
        url: "/empDelete",
        type: "POST",
        data: {'empId': empId}
    })
        .done(function (response) {
            $(employeeRow).remove();
        })
        .fail(function () {
            alert("delete failed");
        });
}


function addEmployee() {

    var depId = $('#emp_addOrUpdate').attr('dep_id');

    var empId = $('#emp_addOrUpdate').attr('emp_id');
    var name = $('#emp_name').val();
    var salary = $('#emp_salary').val();
    var email = $('#emp_e-mail').val();
    var birth = $('#emp_birth').val();

    $.ajax({
        //dataType: "json",
        url: "/doEmpAddOrUpdate",
        type: "POST",
        data: {'id': empId, 'name': name, 'salary': salary, 'email': email, 'birth': birth, 'departmentId': depId}
    })
        .done(showEmployeeList)
        .fail(function (response) {
            alert("Department # " + response + " delete failed");
        });

}