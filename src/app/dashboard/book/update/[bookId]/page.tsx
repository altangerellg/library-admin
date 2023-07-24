"use client";
import { ArrowLeft, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { IBook } from "@library/types";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";

const UpdatePage: FC<any> = ({ params }: { params: { bookId: string } }) => {
    const router = useRouter();
    const [book, setBook] = useState<IBook>();
    const [file, setFile] = useState<File>();
    const bookId = params.bookId;

    const onFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const onSubmit = async (values: IBook) => {
        const formData = new FormData();
        if (file !== undefined) {
            formData.append("files", file);
        }
        try {
            const response = await axios.post("/api/file/upload", formData);
            if (file === undefined) {
                values.coverUrl = book ? book.coverUrl : "";
                values.filePath = book ? book.filePath : "";
            } else {
                values.coverUrl = response.data.files[0].filename;
                values.filePath = response.data.files[0].filename;
            }
            await axios.put("/api/book/" + bookId, {
                ...values,
            });
            toast.success("YES SIR Updated");
            router.push("/dashboard/book");
        } catch (error: any) {
            console.log("Error:", error);
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };
    const form = useFormik({
        initialValues: {
            isbn: "",
            name: "",
            author: "",
            publicationDate: new Date(),
            categories: "",
            description: "",
            coverUrl: "",
            filePath: "",
            summary: "",
            isFeatured: "YES",
            format: "PDF",
        },
        validationSchema: yup.object({
            isbn: yup.string().required("Заавал оруулна уу"),
            name: yup.string().required("Заавал оруулна уу"),
            author: yup.string().required("Заавал оруулна уу"),
            description: yup.string().required("Заавал оруулна уу"),
        }),
        onSubmit,
    });
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/book/find/" + bookId);
            if (response.status === 200) {
                const data = response.data ? response.data._doc : {};
                setBook(data);
                console.log(data);
                form.setValues({
                    isbn: data.isbn,
                    name: data.name,
                    author: data.author,
                    publicationDate: data.publicationDate,
                    categories: data.categories,
                    description: data.description,
                    coverUrl: data.coverUrl,
                    filePath: data.filePath,
                    summary: data.summary,
                    isFeatured: data.isFeatured,
                    format: data.format,
                });
            }
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };
    useEffect(() => {
        fetchData();
        //eslint-disable-next-line
    }, []);
    return (
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Хэрэглэгчийн мэдээлэл шинэчлэх</Typography>
                    <Button variant="contained" onClick={() => router.back()} startIcon={<ArrowLeft />}>
                        Буцах
                    </Button>
                </Box>
            </Grid>
            <form onSubmit={form.handleSubmit} style={{ marginTop: "16px" }}>
                <Grid container item spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            name="isbn"
                            label="isbn"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.isbn)}
                            helperText={form.errors.isbn}
                            value={form.values.isbn}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            name="name"
                            label="нэр"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.name)}
                            helperText={form.errors.name}
                            value={form.values.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            fullWidth
                            name="author"
                            label="Зохиолч"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.author)}
                            helperText={form.errors.author}
                            value={form.values.author}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            fullWidth
                            name="category"
                            label="category"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.category)}
                            helperText={form.errors.category}
                            value={form.values.category}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            fullWidth
                            name="description"
                            label="Тайлбар"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.description)}
                            helperText={form.errors.description}
                            value={form.values.description}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <form action="/api/file/upload" method="post" encType="multipart/form-data">
                            <input type="file" name="files" onChange={onFileChange} />
                        </form>{" "}
                    </Grid>
                    <CardContent
                        style={{
                            width: "120px",
                            height: "240px",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            width="150"
                            height="100"
                            alt={form.values.name}
                            src={"/public/uploads/" + form.values.coverUrl}
                        />
                    </CardContent>
                    <Grid item display="flex" justifyContent="flex-end" xs={12}>
                        <LoadingButton
                            loading={form.isSubmitting}
                            variant="contained"
                            type="submit"
                            startIcon={<SaveOutlined />}
                        >
                            Хадгалах
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};
export default UpdatePage;
