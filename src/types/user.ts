export enum Role {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student"
}

export type User = {
    _id: string;
    email: string;
    name: string;
    roles: Role[];
};

export type UserFormPayload = User & {
    password?: string
}