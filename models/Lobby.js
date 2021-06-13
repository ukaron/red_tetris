const { nanoid } = require('nanoid');

class Lobby {
    users = [];
    constructor(name, firstUser) {
        this.id = nanoid();
        this.name = name;
        this.users[0] = firstUser;
        this.isActive = false
    };

    addUser(name) {
        this.users.push(name);
    };

    deleteUser(name) {
        this.users = this.users.filter(user => user === name);
    };

    start() {
        this.isActive = true;
    }

    getName() {
        return this.name;
    }
};

module.exports = Lobby;
