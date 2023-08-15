"use client";
import Book from "@library/components/common/Book";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import {
    Grid,
    MenuItem,
    Pagination,
    Box,
    Button,
    TextField,
    Typography,
    TextFieldVariants,
    OutlinedTextFieldProps,
    FilledTextFieldProps,
    StandardTextFieldProps,
} from "@mui/material";
import { AddOutlined, SearchOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { IBook } from "@library/types";
import { DatePicker, DatePicker as MuiDatePicker } from "@mui/lab";

interface ExtendedDatePickerProps {
    renderInput: (
        params: React.JSX.IntrinsicAttributes & {
            variant?: TextFieldVariants | undefined;
        } & Omit<OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps, "variant">
    ) => JSX.Element;
}

const BookPage: FC<any> = () => {
    const [books, setBooks] = useState<Array<IBook>>([]);
    const router = useRouter();
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(40);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [pubStartDate, setPubStartDate] = useState<Date | null>();
    const [pubEndDate, setPubEndDate] = useState<Date | null>();

    // const DatePicker: React.FC<ExtendedDatePickerProps> = ({
    //     renderInput,
    //     ...otherProps
    //   }) => {
    //     return (
    //       <MuiDatePicker
    //         {...otherProps}
    //         renderInput={renderInput}
    //       />
    //     );
    //   };

    const fetchBooks = async (values: any) => {
        try {
            const response = await axios.post("/api/book/find", values, {
                params: { page, size, pubStartDate, pubEndDate },
            });
            setBooks(response.data.content);
            setTotalPage(response.data.totalPage);
        } catch (error) {}
        [page, size];
    };

    useEffect(() => {
        fetchBooks({ pubStartDate, pubEndDate });
        //eslint-disable-next-line
    }, [page, size, pubStartDate, pubEndDate]);

    const form = useFormik({
        initialValues: {},
        onSubmit: fetchBooks,
    });

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} marginTop={"20px"}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Номын жагсаалт</Typography>
                    <Button
                        variant="contained"
                        onClick={() => router.push("/dashboard/book/register")}
                        startIcon={<AddOutlined />}
                    >
                        Ном бүртгэх
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={form.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={4} lg={3}>
                            <TextField fullWidth label="Нэр" size="small" name="name" onChange={form.handleChange} />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <TextField
                                fullWidth
                                label="Зохиолч"
                                size="small"
                                name="author"
                                onChange={form.handleChange}
                            />
                        </Grid>
                        {/* <Grid item xs={6} lg={3}>
                            <DatePicker
                                label="Эхлэх огноо"
                                value={pubStartDate}
                                onChange={(date: React.SetStateAction<Date | null | undefined>) =>
                                    setPubStartDate(date)
                                }
                                renderInput={(
                                    params: React.JSX.IntrinsicAttributes & {
                                        variant?: TextFieldVariants | undefined;
                                    } & Omit<
                                            OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps,
                                            "variant"
                                        >
                                ) => <TextField {...params} size="small" />}
                            />
                        </Grid>
                        <Grid item xs={6} lg={3}>
                            <DatePicker
                                label="Дуусах огноо"
                                value={pubEndDate}
                                onChange={(date: React.SetStateAction<Date | null | undefined>) => setPubEndDate(date)}
                                renderInput={(
                                    params: React.JSX.IntrinsicAttributes & {
                                        variant?: TextFieldVariants | undefined;
                                    } & Omit<
                                            OutlinedTextFieldProps | FilledTextFieldProps | StandardTextFieldProps,
                                            "variant"
                                        >
                                ) => <TextField {...params} size="small" />}
                            />
                        </Grid> */}
                        <Grid item xs={4} lg={3} container spacing={3}>
                            <Button size="small" startIcon={<SearchOutlined />} type="submit">
                                Хайх
                            </Button>
                        </Grid>
                        <Box display="flex" justifyContent="space-between" alignItems="center" marginLeft={"40px"}>
                            <TextField size="small" select value={size} onChange={(e: any) => setSize(e.target.value)}>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                                <MenuItem value={40}>40</MenuItem>
                            </TextField>
                            <Pagination
                                count={totalPage}
                                page={page + 1}
                                onChange={(e: any, val: number) => setPage(val - 1)}
                                color="primary"
                            />
                        </Box>
                    </Grid>
                </form>
            </Grid>
            {books.map((book: any, index: number) => {
                return (
                    <Grid item xs={6} lg={3} key={index}>
                        <Book {...book} fetchBooks={fetchBooks} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default BookPage;
