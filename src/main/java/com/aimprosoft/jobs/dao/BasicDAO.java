package com.aimprosoft.jobs.dao;

/**
 * Created on 12/23/13.
 */
public interface BasicDAO<T> {

    T selectById(Integer id) throws DataSourceException;

    void add(T entity) throws DataSourceException;

    void edit(T entity) throws DataSourceException;

    void delete(Integer id) throws DataSourceException;

}
