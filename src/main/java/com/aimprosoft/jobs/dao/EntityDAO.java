package com.aimprosoft.jobs.dao;

import com.aimprosoft.jobs.model.PersistEntity;
import org.hibernate.HibernateException;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created on 12/23/13.
 */

public abstract class EntityDAO<T extends PersistEntity> implements BasicDAO<T> {

    @Autowired
    protected SessionFactory sessionFactory;


    public abstract T selectByUniqueIdentifier(String uniqueIdentifier) throws DataSourceException;

    public abstract boolean isExist(Integer id) throws DataSourceException;


    @Transactional(readOnly = false, rollbackFor = {HibernateException.class})
    @Override
    public void add(T entity) throws DataSourceException {
        try {
            sessionFactory.getCurrentSession().save(entity);
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }

    @Transactional(readOnly = false, rollbackFor = {HibernateException.class})
    @Override
    public void edit(T entity) throws DataSourceException {
        try {
            sessionFactory.getCurrentSession().merge(entity);
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }

}
