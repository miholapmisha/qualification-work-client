export enum Role {
    ADMIN = "admin",
    STUDENT = "student",
    TEACHER = "teacher",
    GUEST = "guest"
}

export type User = {
    id: number;
    email: string;
    name: string;
    roles: Role[];
};