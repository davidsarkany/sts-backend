export const isNumeric = (n:any):boolean => {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
