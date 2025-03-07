export enum roles {
    ADMIN = "admin",
    STUDENT = "student",
    TEACHER = "teacher",
    GUEST = "guest"
}

export type User = {
    id: number;
    email: string;
    name: string;
    roles: roles[];
};