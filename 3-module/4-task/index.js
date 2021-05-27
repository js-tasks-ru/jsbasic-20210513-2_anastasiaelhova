function showSalary(users, age) {
    let arr = users.filter(user => user.age <= age);
    let salaries = arr.map(user => `${user.name}, ${user.balance}`);
    return salaries.join('\n');
}
