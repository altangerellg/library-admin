import {
    Card,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import React, { FC, useCallback, useState } from "react";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/navigation";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { IBook } from "@library/types";

interface BookProps {
    isbn: string;
    name: string;
    description: string;
    coverUrl: string;
    _id: string;
    fetchBooks: any;
}

const Book: FC<BookProps> = ({ isbn, name, coverUrl, description, _id, fetchBooks }) => {
    const [showMore, setShowMore] = useState(false);
    const router = useRouter();
    const [selectedBook, setSelectedBook] = useState<string | null>(null); //nomiin id avna

    const handleClickOpen = (bookId: string) => {
        setSelectedBook(bookId);
        setOpen(true);
    };
    const [books, setbooks] = useState<Array<IBook>>([]);

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const deleteBook = useCallback(
        async (bookId: string) => {
            console.log(bookId);
            try {
                await axios.delete(`/api/book/${selectedBook}`); //temdeglegdsen idg selected duudaj avna
                fetchBooks({});
                handleClose();
            } catch (error) {
                console.log(error);
            }
        },
        [fetchBooks, selectedBook]
    );

    return (
        <Card elevation={5} sx={{ padding: 0, borderRadius: 5 }} style={{ height: "100%" }}>
            <CardContent style={{ backgroundColor: "black" }}>
                <Typography align="center" color="common.white">
                    {isbn}
                </Typography>
            </CardContent>
            {
                // eslint-disable-next-line
            }
            <CardContent style={{ width: "120px", height: "240px", justifyContent: "center", alignItems: "center" }}>
                <img alt={name} src={"/public/uploads/" + coverUrl} style={{ width: "150px" }} />
            </CardContent>
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                {showMore ? (
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                ) : (
                    <Typography variant="body2" color="text.secondary">
                        {description.slice(0, 100)}...
                    </Typography>
                )}
                <Button variant="outlined" onClick={() => router.push("/dashboard/book/detail/" + _id)}>
                    Show More
                </Button>
                <IconButton>
                    <Edit onClick={() => router.push("/dashboard/book/update/" + _id)} />
                </IconButton>
                <IconButton color="error" onClick={() => handleClickOpen(_id)}>
                    <Delete />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Ном устгах"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Та дараах ном устгахыг зөвшөөрч байна уу?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Үгүй</Button>
                        <Button onClick={() => deleteBook(_id)}>Тийм</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default Book;
function setBooks(content: any) {
    throw new Error("Function not implemented.");
}

function setOpen(arg0: boolean) {
    throw new Error("Function not implemented.");
}
