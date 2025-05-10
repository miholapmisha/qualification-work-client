import { Category } from "./category";

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
    group?: Category;
};

export type UserPayload = {
    _id: string;
    email?: string;
    name?: string;
    roles?: Role[];
    password?: string,
    groupId?: string
}