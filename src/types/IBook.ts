export default interface IUSer {
    isbn: string;
    name: string;
    author: string;
    publicationDate: Date;
    coverUrl: String;
    description: String;
    filePath: String;
    summary: String;
    isFeatured: "YES" | "NO";
    format: "PDF" | "EPUB";
    categories: String;
    [key: string]: any;
}
