export interface User {

    id: number,
    name: string,
    email: string,
    address?: {
        streat: string,
        suite: string,
        city: string
    }
}


export class UserCL {
    id: number;
    name: string;

}
