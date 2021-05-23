function isEmpty(obj) {
    let countProps = 0;
    for (let key in obj) {
        countProps++;
    }
    return !Boolean(countProps);
}
