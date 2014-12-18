function appendDatePicker() {
    var dateInputs = jQuery('.datePicker');
    console.log('found ' + dateInputs.length + ' datePickers');
    jQuery.each(dateInputs, function (index, value) {
        jQuery(value).datepicker();
    });
}