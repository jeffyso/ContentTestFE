export class UserModel {
    userId?: number;
    username?: string;
    email?: string;
    nickname?: string;
    password?: string;
}
export interface LoginResponse{
    token: string;
    value: string;
}