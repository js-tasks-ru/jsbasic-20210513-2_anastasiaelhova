function getMinMax(str) {
    let numbers = [];
    let arrSplitDots = str.split(',');
    arrSplitDots.forEach(elem => {
        let arrSplitSpaces = elem.split(' ');
        arrSplitSpaces.forEach(item => {
            if ( parseFloat(item) ) {
                numbers.push(parseFloat(item));
            }
        })
    });

    let result = {
        min: Math.min(...numbers),
        max: Math.max(...numbers)
    };

    return result;
}
