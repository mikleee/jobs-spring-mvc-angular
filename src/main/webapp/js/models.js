function Department(id, name, location) {
    this.id = id;
    this.name = name;
    this.location = location;
}


function Employee(id, name, salary, email, birth) {
    this.id = id;
    this.name = name;
    this.salary = salary;
    this.email = email;
    this.birth = birth ? dateFormat(birth) : null;
}