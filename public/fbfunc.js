import { child, get, off, ref as dbref, remove, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as strgref, uploadBytes } from 'firebase/storage';

import { realDB } from "./fbconfig";

const Fb = (fn, path = null, data = null) => {

    switch (fn) {
        case 'dbref': return dbref(realDB);
        case 'dbget':
            if (path) { return get(child(dbref(realDB), path)) }
            else { return console.log('push path') }
        case 'dbset':
            if (path && data) { return set(dbref(realDB, path), data) }
            else { return console.log('push path and data') }
        case 'dbremove':
            if (path) { return remove(dbref(realDB, path)) }
            else { console.log('push path') }
        case 'dboff': return off(dbref(realDB))

        case 'getDownloadURL':
            if (data === null) data = path
            if (data) { return getDownloadURL(strgref(getStorage(), data)) }
            else { console.log('push data') }
        case 'upload':
            if (data === null) data = path
            if (data) { return uploadBytes(strgref(getStorage(), 'image'), data) }
            else { console.log('push data') }

        default: return console.log('command : dbref, dbget, dbset, dbremove, dboff, getDownloadURL, upload')
    }
}

export default Fb