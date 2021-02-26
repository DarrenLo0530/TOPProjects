export default class Cookie {
    constructor(name, price, description, imagePath) {
        this._name = name;
        this._price = price;
        this._description = description;
        this._imagePath = imagePath;    
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get description() {
        return this._description;
    }

    get imagePath() {
        return this._imagePath;
    }
}

