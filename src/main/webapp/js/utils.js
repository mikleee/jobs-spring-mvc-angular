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
    }

};

var Constants = {

    validationRules: {
        department: {
            name: {pattern: '^[a-zA-Z]{3,20}$', message: 'the name should be alpha [3 - 20]'},
            location: {pattern: '^[a-zA-Z]{0,20}$', message: 'the location should be alpha [0 - 20]'}
        },
        employee: {

        }
    },
    events: {
        depDeleted: 'DEPARTMENT_WAS_DELETED'
    }
};

var Messages = {
    depDeleted: function (department) {
        return angular.toJson(department) + ' department was deleted.'
    }, depListCleared: function () {
        return'All departments were deleted.';
    }, depPersisted: function (department) {
        return angular.toJson(department) + ' department was ' + (department.id ? 'updated' : 'added');
    }
};
