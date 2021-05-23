function sumSalary(salaries) {
    let sumSalaries = 0;
    for (let key in salaries) {
        let prop = salaries[key];
        if ( typeof prop === 'number' && (prop % 1) >= 0 ) { // если есть остаток при деление на 1, это число
            sumSalaries += prop;
        }
    }
    return sumSalaries;
}
