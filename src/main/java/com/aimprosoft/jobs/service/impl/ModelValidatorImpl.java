package com.aimprosoft.jobs.service.impl;

import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.PersistEntity;
import com.aimprosoft.jobs.service.ModelValidator;
import com.aimprosoft.jobs.service.ValidationException;
import net.sf.oval.ConstraintViolation;
import net.sf.oval.Validator;
import net.sf.oval.context.FieldContext;
import net.sf.oval.context.OValContext;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created on 12/13/13.
 */
@Component
public class ModelValidatorImpl implements ModelValidator{


    public void validate(PersistEntity entity) throws DataSourceException, ValidationException {
        Map<String, String> messenger = new HashMap<>();
        List<ConstraintViolation> violations = new Validator().validate(entity);
        if (violations.size() > 0) {
            for (ConstraintViolation item : violations) {
                String message = item.getMessage();
                String key = null;
                OValContext context = item.getContext();
                if (context instanceof FieldContext) {
                    FieldContext fieldContext = (FieldContext) context;
                    key = fieldContext.getField().getName();
                }
                messenger.put(key, message);
            }
            throw new ValidationException(messenger, entity);
        }
    }

}



