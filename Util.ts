class Util {

    public static cloneObject(obj: Object) {
        var clone = Object.create(Object.getPrototypeOf(obj));

        for (var i in obj) {
            if ((obj[i] != null) && (typeof (obj[i]) === "object"))
                clone[i] = Util.cloneObject(obj[i]);
            else
                clone[i] = obj[i];
        }
        return clone;
    }
}





export { Util };