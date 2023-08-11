"use client";
import IAuthor from "@library/types/IAuthor";
import { Delete, Edit, SearchOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    Grid,
    TableBody,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    TableCell,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TableFooter,
    MenuItem,
    Pagination,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useEffect, useState } from "react";

const AuthorPage: FC<any> = () => {
    const router = useRouter();
    const [authors, setAuthors] = useState<Array<IAuthor>>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(100);
    const [totalPage, setTotalPage] = useState<number>(1);

    const fetchAuthors = useCallback(
        async (values: any) => {
            try {
                const response = await axios.post("/api/author/find", values, { params: { page, size } });
                setAuthors(response.data.content);
                setTotalPage(response.data.totalPage);
            } catch (error) {}
        },
        [page, size]
    );

    const form = useFormik({
        initialValues: {},
        onSubmit: fetchAuthors,
    });

    useEffect(() => {
        fetchAuthors({});
        //eslint-disable-next-line
    }, [page, size]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (authorId: string) => {
        setSelectedAuthor(authorId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteAuthor = useCallback(
        async (authorId: string) => {
            try {
                await axios.delete(`/api/author/${selectedAuthor}`); //temdeglegdsen idg selected duudaj avna
                fetchAuthors({});
                handleClose();
            } catch (error) {
                console.log(error);
            }
        },
        [fetchAuthors, selectedAuthor]
    );

    return (
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Зохиолчийн жагсаалт</Typography>
                    <Button variant="contained" onClick={() => router.push("/dashboard/author/register/")}>
                        Зохиолч бүртгэх
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={form.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="Нэр"
                                size="small"
                                name="firstname"
                                onChange={form.handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="Овог"
                                size="small"
                                name="lastname"
                                onChange={form.handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="Тайлбар"
                                size="small"
                                name="description"
                                onChange={form.handleChange}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button size="large" startIcon={<SearchOutlined />} type="submit">
                                Хайх
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Нэр</TableCell>
                                <TableCell>Овог</TableCell>
                                <TableCell>Тайлбар</TableCell>
                                <TableCell>Зураг</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {authors.map((author: IAuthor, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{author._id}</TableCell>
                                    <TableCell>{author.firstname}</TableCell>
                                    <TableCell>{author.lastname}</TableCell>
                                    <TableCell>{author.description}</TableCell>
                                    <TableCell>
                                        {author.image && (
                                            //eslint-disable-next-line
                                            <img
                                                src={`/public/uploads/${author.image}`}
                                                alt="Author"
                                                style={{ width: "50px", height: "50px" }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="error" onClick={() => handleClickOpen(author._id)}>
                                            <Delete />
                                        </IconButton>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Хэрэглэгч устгах"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Та дараах зохиолчийг устгахыг зөвшөөрч байна уу?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Үгүй</Button>
                                                <Button onClick={() => deleteAuthor(author._id)}>Тийм</Button>
                                            </DialogActions>
                                        </Dialog>
                                        <IconButton>
                                            <Edit
                                                onClick={() => router.push("/dashboard/author/update/" + author._id)}
                                            />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <TextField
                                            size="small"
                                            select
                                            value={size}
                                            onChange={(e: any) => setSize(e.target.value)}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={25}>25</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                        </TextField>
                                        <Pagination
                                            count={totalPage}
                                            page={page + 1}
                                            onChange={(e: any, val: number) => setPage(val - 1)}
                                            color="primary"
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};
export default AuthorPage;
