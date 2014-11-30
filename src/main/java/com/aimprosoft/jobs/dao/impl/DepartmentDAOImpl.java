package com.aimprosoft.jobs.dao.impl;

import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.dao.DepartmentDAO;
import com.aimprosoft.jobs.model.impl.Department;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public class DepartmentDAOImpl extends DepartmentDAO {

    @SuppressWarnings("unchecked")
    @Override
    public List<Department> getAll() throws DataSourceException {
        try {
            return (List<Department>) sessionFactory.getCurrentSession().createQuery("from Department").list();
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }

    @Override
    public Department selectByUniqueIdentifier(String uniqueIdentifier) throws DataSourceException {
        try {
            Session session = sessionFactory.getCurrentSession();
            return (Department) session.createQuery("from Department  where name = :name ").setString("name", uniqueIdentifier).uniqueResult();
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }

    @Override
    public boolean isExist(Integer id) throws DataSourceException {
        try {
            Session session = sessionFactory.getCurrentSession();
            Long result = (Long) session.createQuery("select count(*) from Department  where id = :id ").setInteger("id", id).uniqueResult();
            return result > 0;
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }

    @Override
    public Department selectById(Integer id) throws DataSourceException {
        try {
            return (Department) sessionFactory.getCurrentSession().get(Department.class, id);
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }

    @Transactional(readOnly = false, rollbackFor = {HibernateException.class})
    @Override
    public void delete(Integer id) throws DataSourceException {
        try {
            Session session = sessionFactory.getCurrentSession();
            session.delete(selectById(id));
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }
}
