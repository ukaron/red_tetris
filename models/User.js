const { nanoid } = require('nanoid');

class User {
    constructor(name) {
        this.id = nanoid();
        if (! this.checkExist(name))
            this.name = name;
    };

    checkExist(name) {
        if (name)
            return false;
    };

    getName() {
        return this.name;
    }
}

module.exports = User;
