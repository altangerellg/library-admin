"use client";
import { IAuthor } from "@library/types";
import { ArrowLeft, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import * as yup from "yup";

const UpdatePage: FC<any> = ({ params }: { params: { authorId: string } }) => {
    const router = useRouter();

    const [author, setAuthor] = useState();
    const authorId = params.authorId;
    const [file, setFile] = useState<File>();
    const onFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const onSubmit = async (values: IAuthor) => {
        const formData = new FormData();
        if (file !== undefined) {
            formData.append("files", file);
        }
        try {
            const response = await axios.post("/api/file/upload", formData);
            await axios.put("/api/author/" + authorId, {
                ...values,
                image: response.data.files[0].filename,
            });
            toast.success("Author updated");
            router.push("/dashboard/author");
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };
    const form = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            description: "",
            image: "",
        },
        validationSchema: yup.object({
            firstname: yup.string().required("Заавал оруулна уу"),
            lastname: yup.string().required("Заавал оруулна уу"),
            description: yup.string().required("Заавал оруулна уу"),
        }),
        onSubmit,
    });
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/author/find/" + authorId);
            if (response.status === 200) {
                form.setValues({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    description: response.data.description,
                    image: response.data.image,
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
                    <Typography>Зохиолчийн мэдээлэл шинэчлэх</Typography>
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
                            name="firstname"
                            label="Нэр"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.firstname)}
                            helperText={form.errors.firstname}
                            value={form.values.firstname}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <TextField
                            fullWidth
                            name="lastname"
                            label="Овог"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.lastname)}
                            helperText={form.errors.lastname}
                            value={form.values.lastname}
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
                        <input type="file" name="image" accept="image/*" onChange={onFileChange} />
                    </Grid>
                    <Grid item align="right" xs={12}>
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
