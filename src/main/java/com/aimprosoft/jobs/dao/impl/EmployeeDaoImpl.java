package com.aimprosoft.jobs.dao.impl;

import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.dao.EmployeeDAO;
import com.aimprosoft.jobs.model.impl.Department;
import com.aimprosoft.jobs.model.impl.Employee;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional(readOnly = true)
@Repository
public class EmployeeDaoImpl extends EmployeeDAO {

    @SuppressWarnings("unchecked")
    @Override
    public List<Employee> getAllInDepartment(Integer id) throws DataSourceException {
        Department department = new Department(id);
        try {
            Session session = sessionFactory.getCurrentSession();
            return (List<Employee>) session.createQuery("from Employee where department = :department").setParameter("department", department).list();
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public Employee selectByUniqueIdentifier(String uniqueIdentifier) throws DataSourceException {
        try {
            Session session = sessionFactory.getCurrentSession();
            return (Employee) session.createQuery("from Employee where email = :email").setString("email", uniqueIdentifier).uniqueResult();
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }

    @Override
    public boolean isExist(Integer id) throws DataSourceException {
        try {
            Session session = sessionFactory.getCurrentSession();
            Long result = (Long) session.createQuery("select count(*) from Employee  where id = :id ").setInteger("id", id).uniqueResult();
            return result > 0;
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }


    @Override
    public Employee selectById(Integer id) throws DataSourceException {
        try {
            Session session = sessionFactory.getCurrentSession();
            return (Employee) session.createQuery("from Employee where id = :id").setInteger("id", id).uniqueResult();
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }

    @Transactional(readOnly = false, rollbackFor = {HibernateException.class})
    @Override
    public void delete(Integer id) throws DataSourceException {
        try {
            Session session = sessionFactory.getCurrentSession();
            session.delete(session.get(Employee.class, id));
        } catch (HibernateException e) {
            throw new DataSourceException();
        }
    }
}
