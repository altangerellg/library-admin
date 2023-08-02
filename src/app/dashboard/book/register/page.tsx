"use client";
import { ArrowLeft, DonutLarge, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Button, Chip, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";
import IBook from "@library/types/IBook";
import ICategory from "@library/types/ICategory";
import IAuthor from "@library/types/IAuthor";

const RegisterPage: FC<any> = () => {
    const router = useRouter();
    const [books, setBooks] = useState();
    const [file, setFile] = useState<File>();
    const [cover, setCover] = useState<File>();
    const [categories, setCategory] = useState<Array<ICategory>>([]);
    const [authors,setAuthors] = useState<Array<IAuthor>>([])

    const onFileChange = (event: any, type: string) => {
        if (type === "file") setFile(event.target.files[0]);
        else setCover(event.target.files[0]);
    };
    const fetchCategory = async () => {
        try {
            const response = await axios.post("/api/category/find/", {});
            setCategory(response.data.content);
            console.log(response.data.content);
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };

    const fetchAuthor = async () =>{
        try{
            const response = await axios.post("/api/author/find/",{});
            setAuthors(response.data.content);
            console.log(response.data.content);
        }catch(error:any){
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа")
        }
    }

    useEffect(() => {
        fetchCategory();
        fetchAuthor();
        //eslint-disable-next-line
    }, []);

    const onSubmit = async (values: IBook) => {
        if (file !== undefined || cover !== undefined) {
            try {
                let formData = new FormData();
                formData.append("files", file);
                // formData.append("files", cover);
                let responseFile = await axios.post("/api/file/upload", formData);
                const filePath = responseFile.data.files[0].filename;

                let formDataCover = new FormData();
                formDataCover.append("files", cover);
                let responseCover = await axios.post("/api/file/upload", formDataCover);

                const coverUrl = responseCover.data.files[0].filename;

                await axios.post("/api/book", {
                    ...values,
                    coverUrl,
                    filePath,
                });
                toast.success("YES SIR");
                router.push("/dashboard/book");
            } catch (error: any) {
                toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
            }
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
            description: yup.string().required("Заавал оруулна уу"),
            isFeatured: yup.string().required("Заавал сонгоно уу"),
            format: yup.string().required("Төрөл сонгоно уу"),
        }),
        onSubmit,
    });

    return (
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Hoм бүртгэх </Typography>
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
                            label="ISBN"
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
                            label="Нэр"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.name)}
                            helperText={form.errors.name}
                            value={form.values.name}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Autocomplete
                            
                            getOptionLabel={(option: IAuthor) => option.firstname}
                            options={authors}
                            onChange={(e, value) =>{
                                form.setFieldValue(
                                    "author",
                                    value ? value._id : "")
                                }
                            }
                            
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Зохиолч"
                                    // placeholder="Favorites"
                                />
                            )}
                        />
                    
                    </Grid>
                    <Grid item xs={12} md={6} lg={2}>
                        <DatePicker
                            label="Хэвлэгдсэн огноо"
                            value={form.values.publicationDate}
                            onChange={(newValue) => form.setFieldValue("publicationDate", newValue)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Autocomplete
                            multiple
                            getOptionLabel={(option: ICategory) => option.name}
                            options={categories}
                            onChange={(e, value) =>
                                form.setFieldValue(
                                    "categories",
                                    value.map((e) => e._id)
                                )
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Ангилал"
                                    // placeholder="Favorites"
                                />
                            )}
                        />
                    </Grid>

                   

                    <Grid item xs={12} md={6} lg={2}>
                        <TextField
                            fullWidth
                            select
                            name="isFeatured"
                            label="Is this Featured?"
                            onChange={form.handleChange}
                        >
                            <MenuItem value="YES">Тийм</MenuItem>
                            <MenuItem value="NO">Үгүй</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6} lg={2}>
                        <TextField fullWidth select name="format" label="Format" onChange={form.handleChange}>
                            <MenuItem value="PDF">PDF</MenuItem>
                            <MenuItem value="EPUB">EPUB</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <Typography>Зураг</Typography>
                        <input type="file" name="file" onChange={(e: any) => onFileChange(e, "cover")} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <Typography>Файл</Typography>
                        <input type="file" name="file" onChange={(e: any) => onFileChange(e, "file")} />
                        {/* <input type="file" name="file" onChange={onFileChange} /> */}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            fullWidth
                            name="summary"
                            label="Товч"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.summary)}
                            helperText={form.errors.summary}
                            value={form.values.summary}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            fullWidth
                            rows={6}
                            name="description"
                            label="Тайлбар"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.description)}
                            helperText={form.errors.description}
                            value={form.values.description}
                        />
                    </Grid>
                    <Grid container item display="flex" justifyContent="flex-end" xs={12}>
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

export default RegisterPage;
