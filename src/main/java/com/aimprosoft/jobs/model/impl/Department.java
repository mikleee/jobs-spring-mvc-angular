package com.aimprosoft.jobs.model.impl;

import com.aimprosoft.jobs.dao.DataSourceException;
import com.aimprosoft.jobs.model.PersistEntity;
import com.aimprosoft.jobs.service.DepartmentService;
import com.aimprosoft.jobs.service.impl.DepartmentServiceImpl;
import com.aimprosoft.jobs.util.CommonUtils;
import com.aimprosoft.jobs.util.SpringUtils;
import net.sf.oval.constraint.Length;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.constraint.ValidateWithMethod;
import org.codehaus.jackson.map.ObjectMapper;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static com.aimprosoft.jobs.util.CommonUtils.makeJson;

@Entity
@Table(name = "department")
public class Department implements PersistEntity {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @NotNull(message = "*department name should be not null")
    @Length(min = 3, message = "*department name is too short")
//    @MatchPattern(pattern = ".*[]")
    @ValidateWithMethod(message = "department name is not unique", methodName = "isUnique", parameterType = String.class)
    private String name;

    @Column(name = "location")
    @NotNull(message = "*department location should be not null")
    @Length(min = 3, message = "*department location is too short")
    private String location;

    public Department() {
    }

    public Department(Integer id) {
        this.id = id;
    }

    public Department(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public Department(Integer id, String name, String location) {
        this(name, location);
        this.id = id;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    @SuppressWarnings("UnusedDeclaration")
    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return makeJson(this);
    }


    //--------------------------------variable for mapping--------------------------------------------------------------

    @OneToMany(targetEntity = Employee.class, mappedBy = "department", cascade = CascadeType.ALL)
    private List<Employee> employeeList = new ArrayList<>();

    @SuppressWarnings("UnusedDeclaration")
    public List<Employee> getEmployeeList() {
        return employeeList;
    }

    @SuppressWarnings("UnusedDeclaration")
    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }


    //--------------------------------------------VALIDATION------------------------------------------------------------

    @SuppressWarnings("UnusedDeclaration")
    private boolean isUnique(String checkName) throws DataSourceException {

        DepartmentService departmentService = SpringUtils.getBean(DepartmentServiceImpl.class);
        Department thatDepartment = departmentService.selectByUniqueIdentifier(checkName);

        return thatDepartment == null || id != null && id.equals(thatDepartment.getId());

    }

    //-------------------------------------hash-code----equals----------------------------------------------------------

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Department that = (Department) o;

        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
