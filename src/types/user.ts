export enum Role {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student"
}

export type User = {
    id: number;
    email: string;
    name: string;
    roles: Role[];
};