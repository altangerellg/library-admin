"use client";
import ICategory from "@library/types/ICategory";
import { ArrowLeft, Category, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const UpdatePage: FC<any> = ({ params }: { params: { categoryId: string } }) => {
    const router = useRouter();
    const [categories, setCategory] = useState<Array<ICategory>>([]);
    const categoryId = params.categoryId;
    const onSubmit = async (values: ICategory) => {
        try {
            await axios.put("/api/category/" + categoryId, { ...values, parent: values.parent?._id });
            toast.success("Category updated");
            router.push("/dashboard/category");
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
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

    const form = useFormik({
        initialValues: {
            _id: "",
            name: "",
            parent: {
                name: "",
                _id: "",
                // parent: undefined,
                description: "",
            },
            description: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Заавал оруулна уу"),
            description: yup.string().required("Заавал оруулна уу"),
        }),
        onSubmit,
    });

    const fetchData = async () => {
        try {
            const response = await axios.get("/api/category/find/" + categoryId);
            if (response.status === 200) {
                let parent = {};
                if (response.data.parent) {
                    const responseParent = await axios.get("/api/category/find/" + response.data.parent);
                    parent = responseParent.data;
                }

                form.setValues({
                    ...response.data,
                    parent,
                });
            }
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };

    useEffect(() => {
        fetchData();
        fetchCategory();
        //eslint-disable-next-line
    }, []);
    return (
        <Grid spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>
                        <strong>Ангилал засах</strong>{" "}
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
                            value={form.values.parent}
                            getOptionLabel={(option: ICategory) => option.name || ""}
                            options={categories}
                            onChange={(e, value) => form.setFieldValue("parent", value)}
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

export default UpdatePage;
