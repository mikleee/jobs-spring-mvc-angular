package com.aimprosoft.jobs.service;

import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.PersistEntity;

/**
 * Created on 1/10/14.
 */
public interface ModelValidator {

    public void validate(PersistEntity entity) throws DataSourceException, ValidationException;

}
