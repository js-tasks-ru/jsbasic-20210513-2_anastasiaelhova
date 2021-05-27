function camelize(str) {
    let arr = str.split('-');

    let arrCamelize = arr.map( (elem, index) => {
        if (index === 0) {
            return elem;
        }
        return (elem[0].toUpperCase() + elem.slice(1));
    });

    return arrCamelize.join('');
}
