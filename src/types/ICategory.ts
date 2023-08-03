export default interface ICategory {
    _id: string;
    name?: string;
    parent?: ICategory;
    description?: string;
    [key: string]: any;
}
