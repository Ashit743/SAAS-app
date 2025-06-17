
export interface loginUser {
    email: string;
    password: string;
}

export interface RegisterNewUser extends loginUser {
    firstName: string;
    lastName: string;
}