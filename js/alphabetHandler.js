function removeLetter(letter, arr) {
    var obj = {};
    var index = arr.indexOf(letter);
    console.log(index);
    if (index < 0) {
        obj.arr = arr;
        obj.success = false;
        return obj;
    }
    arr.splice(arr.indexOf(letter), 1);
    obj.arr = arr;
    obj.success = false;
    return obj;
}
