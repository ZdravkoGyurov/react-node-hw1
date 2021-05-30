import generateId from "./random";

export default class Recipe {
    constructor(userId, name, shortDescription, prepTimeMinutes, products, pictureUrl, longDescription, tags) {
        this.id = generateId(20)
        this.userId = userId;
        this.name = name;
        this.shortDescription = shortDescription;
        this.prepTimeMinutes = prepTimeMinutes;
        this.products = products;
        this.pictureUrl = pictureUrl;
        this.longDescription = longDescription;
        this.tags = tags;
        this.sharedOn = new Date();
        this.lastModifiedOn = this.sharedOn;
    }
}

