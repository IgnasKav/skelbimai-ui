export interface User{
    username: string;
    displayName: string;
    token: string;
    image?: string;
    userRoles: string[];
}
export interface UserFormValues{
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}
export enum UserRoles {
    User= "User",
    Admin= "Admin",
    Support= "Support"
}