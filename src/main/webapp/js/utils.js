var Utils = {

    isModelEmpty: function (model) {
        for (var key in model) {
            var value = model[key];
            if (key == 'id') {
                if (value) {
                    return false;
                }
            } else if (value.length != 0) {
                return false;
            }
        }
        return true;
    },
    clearModel: function (model) {
        for (var key in model) {
            if (key == 'id') {
                model[key] = null;
            } else if (model[key] instanceof Array) {
                model[key] = [];
            } else {
                model[key] = '';
            }
        }
    },
    createEmptyModel: function (fields) {
        var result = {};
        fields.forEach(function (field) {
            result[field] = '';
        });
        return result;
    },
    isPresent: function (collection, model) {
        if (model == null || model.id == null) {
            return false;
        }
        for (var i = 0; i < collection.length; i++) {
            if (collection[i].id == model.id) {
                return true;
            }
        }
        return false;
    }, isAbsent: function (collection, model) {
        return !this.isPresent(collection, model);
    },

    parseDate: function (stringDate) {
        var array = stringDate.split('/');
        var day = array[0], month = array[1], year = array[2];
        return new Date(year, month - 1, day).getTime();
    }

};


var Constants = {

    tabs: {depList: 'dep-list', depForm: 'dep-form', empList: 'emp-list', empForm: 'emp-form'},
    popupStatuses: {add: 'ADD', edit: 'EDIT'},
    notificationStatuses: {success: 'SUCCESS', fail: 'FAIL', waiting: 'WAITING'},

    validationRules: {
        department: {
            name: {pattern: '^[a-zA-Z]{3,20}$', message: 'the name should be alpha [3 - 20]'},
            location: {pattern: '^[a-zA-Z]{0,20}$', message: 'the location should be alpha [0 - 20]'}
        },
        employee: {
            name: {pattern: '^[a-zA-Z]{3,20}$', message: 'the name should be alpha [3 - 20]'},
            salary: {pattern: '^[\\d]{1,10}$', message: 'the name should be numeric'}
        }
    },
    events: {
        depDeleted: 'DEPARTMENT_WAS_DELETED',
        containerShouldBeResized: 'CONTAINER_SHOULD_BE_RESIZED'
    }

};


var Messages = {
    depDeleted: function (department) {
        return angular.toJson(department) + ' department was deleted.'
    }, depListCleared: function () {
        return 'All departments were deleted.';
    }, depPersisted: function (department) {
        return angular.toJson(department) + ' department was ' + (department.id ? 'updated' : 'added');
    },
    depPersistingFailed: function (department, serverMessages) {
        return angular.toJson(department) + ' persisting failed, reason: ' + angular.toJson(serverMessages);
    },
    empDeleted: function (employee) {
        return angular.toJson(employee) + ' employee was deleted.'
    }
};


var DocumentModifier = {

    getElementHeightValue: function (elem) {
        var stringResult = $(elem).css('height').split('px')[0];
        return parseFloat(stringResult);
    },

    appendDatePicker: function (rootScope, eventName) {
        var dateInputs = jQuery('.datePicker');
        var options = {
            onSelect: function (dateText, inst) {
                rootScope.$broadcast(eventName, dateText);
            },
            dateFormat: "dd/mm/yy"
        };
        console.log('found ' + dateInputs.length + ' datePickers');
        jQuery.each(dateInputs, function (index, value) {
            jQuery(value).datepicker(options);
        });
    },

    fitContainer: function (parentContainerId, contentContainerId) {
        var parentContainer = $('#' + parentContainerId),
            parentContainerHeight = this.getElementHeightValue(parentContainer),
            contentHeight = this.getElementHeightValue('#' + contentContainerId);

        while (contentHeight == 0) {
            contentHeight = this.getElementHeightValue('#' + contentContainerId);
            console.log(parentContainerHeight + '         ' + contentHeight);
            if (parentContainerHeight < contentHeight) {
                $(parentContainer).innerHeight(contentHeight);
            }
        }


    },

    unfitContainer: function (parentContainerId) {
        $('#' + parentContainerId).removeAttr('style');
    }


};
