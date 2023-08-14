export default interface ICollection {
    _id: string;
    name: string;
    likes: Number;
    books: string;
    createdUser: Object;
    date: Date;
    [key: string]: any;
}
