function ucFirst(str) {
    let strUpper = str;
    if (str.length) {
        strUpper = str[0].toUpperCase() + str.slice(1);
    }
    return strUpper;
}
