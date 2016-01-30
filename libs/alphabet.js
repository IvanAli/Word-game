exports.letters = ['a', 'a', 'a', 'b', 'b', 'c', 'c', 'd', 'd', 'e', 'e', 'e',
'f', 'f', 'g', 'g', 'h', 'h', 'i', 'i', 'i', 'j', 'j', 'k', 'k', 'l', 'l',
'm', 'm', 'n', 'n', 'o', 'o', 'o', 'p', 'p', 'p', 'q', 'q', 'r', 'r', 's',
's', 't', 't', 'u', 'u', 'u', 'v', 'v', 'w', 'w', 'x', 'x', 'y', 'y', 'z', 'z'];

exports.removeLetter = function(letter, arr) {
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
