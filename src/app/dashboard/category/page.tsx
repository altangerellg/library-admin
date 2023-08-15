"use client";
import { ArrowLeft, Delete, SaveOutlined, AddOutlined, SearchOutlined, Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useCallback, useEffect, useState } from "react";
import ICategory from "@library/types/ICategory";

const CategoryPage: FC<any> = () => {
    const router = useRouter();
    const [categories, setCategory] = useState<Array<ICategory>>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); //user iin idg end avna
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(100);
    const [totalPage, setTotalPage] = useState<number>(1);
    //eslint-disable-next-line
    const fetchCategory = useCallback(
        async (values: any) => {
            try {
                const response = await axios.post("/api/category/find", values, { params: { page, size } });
                setCategory(response.data.content);
                setTotalPage(response.data.totalPage);
            } catch (error) {}
        },
        [page, size]
    );
    useEffect(() => {
        fetchCategory({});
        //eslint-disable-next-line
    }, [page, size]);

    const onSubmit = async (values: ICategory) => {};
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setOpen(true);
    };
    const handleClose = () => {
        setSelectedCategory(null); // Clear the selected category when the dialog is closed
        setOpen(false);
    };

    const form = useFormik({
        initialValues: {
            _id: "",
            name: "",
            parent: undefined,
            description: "",
        },

        onSubmit,
    });
    const deleteCategory = useCallback(
        async (userId: string) => {
            console.log(userId);
            try {
                await axios.delete(`/api/category/${selectedCategory}`); //temdeglegdsen idg selected duudaj avna
                fetchCategory({});
                handleClose();
            } catch (error) {
                console.log(error);
            }
        },
        //eslint-disable-next-line
        [fetchCategory, selectedCategory]
    );
    return (
        <Grid spacing={2} item xs={12}>
            <Grid container item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                    <Typography>
                        <strong>Ангилалын жагсаалт</strong>
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => router.push("/dashboard/category/register")}
                        startIcon={<AddOutlined />}
                    >
                        Ангилал бүртгэх
                    </Button>
                </Box>
            </Grid>
            <Grid>
                <form onSubmit={form.handleSubmit} style={{ marginTop: "16px" }}>
                    <Grid container item display="flex" justifyContent="flex-end" xs={12}>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="Ангилал хайх"
                                size="small"
                                name="categories"
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
                                <TableCell>
                                    <strong>ID</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Толгой Ангилал</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Ангилалууд</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Ангилал устгах, засах</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category: ICategory, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{category._id}</TableCell>
                                    <TableCell>{category.parent ? JSON.stringify(category.parent) : ""}</TableCell>
                                    <TableCell>{category.name}</TableCell>

                                    <TableCell>
                                        <IconButton color="error" onClick={() => handleClickOpen(category._id)}>
                                            <Delete />
                                        </IconButton>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Ангилал устгах"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Та дараах ангилалыг устгахыг зөвшөөрч байна уу?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Үгүй</Button>
                                                <Button onClick={() => deleteCategory(category._id)}>Тийм</Button>
                                            </DialogActions>
                                        </Dialog>
                                        <IconButton>
                                            <Edit
                                                onClick={() =>
                                                    router.push("/dashboard/category/update/" + category._id)
                                                }
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

export default CategoryPage;
function setSelectedCategory(categoryId: string) {
    throw new Error("Function not implemented.");
}
