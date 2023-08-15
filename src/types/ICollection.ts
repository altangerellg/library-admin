import { IBook, IUser } from ".";

export default interface ICollection {
    _id: string;
    name: string;
    likes: number;
    books: Array<IBook>;
    createdUser: IUser;
    [key: string]: any;
}
