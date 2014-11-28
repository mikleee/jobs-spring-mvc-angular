package com.aimprosoft.jobs.model.impl;

import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.PersistEntity;
import com.aimprosoft.jobs.service.EmployeeService;
import com.aimprosoft.jobs.service.impl.EmployeeServiceImpl;
import com.aimprosoft.jobs.util.CommonUtils;
import com.aimprosoft.jobs.util.SpringUtils;
import net.sf.oval.constraint.Email;
import net.sf.oval.constraint.Length;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.constraint.ValidateWithMethod;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

import static com.aimprosoft.jobs.util.CommonUtils.makeJson;

@javax.persistence.Entity
@Table(name = "employee")
public class Employee implements PersistEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NotNull(message = "*employee name should be not null")
    @Length(min = 2, message = "*employee name is too short")
    private String name;

    @Column(name = "salary")
    @NotNull(message = "*incorrect value of employee salary")
    private Integer salary;

    @Column(name = "email")
    @NotNull(message = "*employee email should be not null")
    @Email(message = "*incorrect email")
    @ValidateWithMethod(methodName = "isUnique", parameterType = String.class, message = "*email is not unique")
    private String email;

    @Column(name = "birth")
    @NotNull(message = "*date is incorrect")
    private Date birth;

    @Transient
    private Integer departmentId;


    public Employee() {
    }

    public Employee(Integer id) {
        this.id = id;
    }

    public Employee(Integer id, String name, Integer salary, Date birth, String email, Integer departmentId) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.birth = birth;
        this.email = email;
        this.department = new Department(departmentId);
        this.departmentId = departmentId;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getDepartmentId() {
        return department.getId();
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    @Override
    public String toString() {
        return makeJson(this);
    }


    //--------------------------------variable for mapping--------------------------------------------------------------

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department")
    @JsonIgnore
    private Department department;

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }


    //----------------------------------------------VALIDATION----------------------------------------------------------


    @SuppressWarnings("UnusedDeclaration")
    private boolean isUnique(String checkEmail) throws DataSourceException {

        EmployeeService employeeService = SpringUtils.getBean(EmployeeServiceImpl.class);
        Employee thatEmployee = employeeService.selectByUniqueIdentifier(checkEmail);

        return thatEmployee == null || id != null && id.equals(thatEmployee.getId());

    }


    //-------------------------------------hash code----equals----------------------------------------------------------


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Employee employee = (Employee) o;

        return id.equals(employee.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

}
