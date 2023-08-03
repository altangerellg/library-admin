"use client";
import { ArrowLeft, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Grid, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ICategory from "@library/types/ICategory";
import * as yup from "yup";
import { log } from "console";

const RegisterPage: FC<any> = () => {
    const router = useRouter();
    const [categories, setCategory] = useState<Array<ICategory>>([]);

    const fetchCategory = async () => {
        try {
            const response = await axios.post("/api/category/find/", {});
            setCategory(response.data.content);
            console.log(response.data.content);
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };

    useEffect(() => {
        fetchCategory();
        //eslint-disable-next-line
    }, []);

    const onSubmit = async (values: ICategory) => {
        try {
            await axios.post("/api/category/", {
                ...values,
                parent: values.parent.length > 0 ? values.parent : undefined,
            });
            toast.success("Амжилттай");
            router.push("/dashboard/category");
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };
    const form = useFormik({
        initialValues: {
            name: "",
            parent: "",
            description: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Заавал оруулна уу"),
            // parent: yup.string().required("Заавал оруулна уу"),
            description: yup.string().required("Заавал оруулна уу"),
        }),
        onSubmit,
    });

    return (
        <Grid spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>
                        <strong>Ангилал бүртгэх</strong>{" "}
                    </Typography>
                    <Button variant="contained" onClick={() => router.back()} startIcon={<ArrowLeft />}>
                        Буцах
                    </Button>
                </Box>
            </Grid>
            <form onSubmit={form.handleSubmit} style={{ marginTop: "16px" }}>
                <Grid container item spacing={2}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Autocomplete
                            getOptionLabel={(option: ICategory) => option.name}
                            options={categories}
                            onChange={(e, value) => form.setFieldValue("parent", value?._id)}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Толгой Aнгилал" />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Ангилал"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.name)}
                            helperText={form.errors.name}
                            value={form.values.name}
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
