package com.aimprosoft.jobs.service;

import com.aimprosoft.jobs.controller.EvilUserDetectedException;
import com.aimprosoft.jobs.dao.DataSourceException;

/**
 * Created on 12/23/13.
 */
public interface BasicService<T> {

    void add(T entity) throws DataSourceException, ValidationException;

    T getOne(Integer id) throws DataSourceException, EvilUserDetectedException;

    void update(T entity) throws DataSourceException, ValidationException, EvilUserDetectedException;

    void delete(Integer id) throws DataSourceException, EvilUserDetectedException;

}
