function cleanObject(object, keys) {

    function sanitizeObj(obj, key) {
        for (let i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (i === key) {
                delete obj[key];
            } 
            else if (typeof obj[i] === 'object') {
                sanitizeObj(obj[i], key);
            }
        }    

        return obj;
    }

    for (let k in keys) {
        sanitizeObj(object, keys[k]);
    }

    return object;
}

module.exports = cleanObject;