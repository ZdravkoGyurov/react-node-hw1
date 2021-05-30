import generateId from "./random";

export const ACTIVE = 0;
export const SUSPENDED = 1;
export const DEACTIVATED = 2;
export const UserStatus = ['ACTIVE', 'SUSPENDED', 'DEACTIVATED'];

export class User {
    constructor(name, username, password, gender, role, avatarUrl, description, status=ACTIVE) {
        this.id = generateId(20)
        this.name = name;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.role = role;
        this.avatarUrl = avatarUrl;
        this.description = description;
        this.status = status;
        this.createdOn = new Date();
        this.lastModifiedOn = this.createdOn;
    }
}
