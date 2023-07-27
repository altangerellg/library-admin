"use client";
import IAuthor from "@library/types/IAuthor";
import { ArrowLeft, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid, Typography, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { toast } from "react-hot-toast";
import * as yup from "yup";

const RegisterPage: FC<any> = () => {
    const router = useRouter();
    const [file, setFile] = useState<File>();
    const onSubmit = async (values: IAuthor) => {
        const formData = new FormData();
        if (file !== undefined) {
            formData.append("files", file);
        }
        try {
            const response = await axios.post("/api/file/upload", formData);
            await axios.post("/api/author", {
                ...values,
                image: response.data.files[0].filename,
            });
            toast.success("YES SIR");
            router.push("/dashboard/author");
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };
    const onFileChange = (event: any) => {
        setFile(event.target.files[0]);
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
    return (
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography>Зохиолч бүртгэх</Typography>
                    <Button variant="contained" onClick={() => router.back} startIcon={<ArrowLeft />}>
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
                    <Grid item xs={12} md={6} lg={3}>
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
