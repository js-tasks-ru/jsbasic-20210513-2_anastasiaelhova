function truncate(str, maxlength) {
    if (str.length <= maxlength) {
        return str;
    }
    let strTruncate = str.substring(0, maxlength-1);
    strTruncate += '…';
    return strTruncate;
}
