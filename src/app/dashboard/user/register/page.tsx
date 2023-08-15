"use client";
import IUSer from "@library/types/IUser";
import { ArrowLeft, SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import * as yup from "yup";

const RegisterPage: FC<any> = () => {
    const router = useRouter();
    const [users, setUsers] = useState();

    const onSubmit = async (values: IUSer) => {
        try {
            await axios.post("/api/user", values);
            toast.success("YES SIR");
            router.push("/dashboard/user");
        } catch (error: any) {
            toast.error(error.response ? error.response.data.message : "Алдаа гарлаа");
        }
    };

    const form = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            gender: "F",
            email: "",
            password: "",
            phone: "",
            registrationNumber: "",
            birthDate: new Date(),
        },
        validationSchema: yup.object({
            firstname: yup.string().required("Заавал оруулна уу"),
            lastname: yup.string().required("Заавал оруулна уу"),
            gender: yup.string().required("Хүйс сонгоно уу"),
            email: yup.string().email("Зөв и-мэйл оруулна уу").required("Заавал оруулна уу"),
            registrationNumber: yup
                .string()
                //.matches(/r'^[\p{Script=Mongolian}]{2}\d{8}$/, "Зөв РД оруул")

                .required("Заавал оруулна уу"),
            phone: yup
                .number()
                .min(10000000, "8 урттай байна")
                .max(99999999, "8 урттай байна")
                .required("Заавал оруулна уу"),
        }),
        onSubmit,
    });

    return (
        <Grid container spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>Хэрэглэгч бүртгэх </Typography>
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
                            name="registrationNumber"
                            label="РД"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.registrationNumber)}
                            helperText={
                                form.errors.registrationNumber ? JSON.stringify(form.errors.registrationNumber) : ""
                            }
                            value={form.values.registrationNumber}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={2}>
                        <TextField fullWidth select name="gender" onChange={form.handleChange}>
                            <MenuItem value="M">Эрэгтэй</MenuItem>
                            <MenuItem value="F">Эмэгтэй</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            fullWidth
                            name="phone"
                            label="Утасны дугаар"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.phone)}
                            helperText={form.errors.phone}
                            value={form.values.phone}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <TextField
                            fullWidth
                            type="email"
                            name="email"
                            label="И-мэйл"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.email)}
                            helperText={form.errors.email}
                            value={form.values.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={2}>
                        <DatePicker
                            label="Төрсөн огноо"
                            value={form.values.birthDate}
                            onChange={(newValue) => form.setFieldValue("birthDate", newValue)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={2}>
                        <TextField
                            fullWidth
                            type="password"
                            name="password"
                            label="Нууц үг"
                            onChange={form.handleChange}
                            error={Boolean(form.errors.password)}
                            helperText={form.errors.password ? JSON.stringify(form.errors.password) : ""}
                            value={form.values.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
