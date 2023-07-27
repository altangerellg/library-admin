"use client";
import { ArrowLeft, SaveOutlined } from "@mui/icons-material";
import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IBook } from "@library/types";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import * as React from "react";

const UpdatePage: FC<any> = ({ params }: { params: { bookId: string } }) => {
    const router = useRouter();
    const [book, setBook] = useState<IBook>();
    const [file, setFile] = useState<File>();
    const bookId = params.bookId;

    const onSubmit = async (values: IBook) => {
        const formData = new FormData();
        if (file !== undefined) {
            formData.append("files", file);
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
        onSubmit,
    });
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/book/find/" + bookId);
            if (response.status === 200) {
                const data = response.data ? response.data._doc : {};
                setBook(data);
                console.log(data);
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
                    <>
                        <Typography>
                            <strong>Номын дэлгэрэнгүй</strong>
                        </Typography>
                        <Button variant="contained" onClick={() => router.back()} startIcon={<ArrowLeft />}>
                            Буцах
                        </Button>
                    </>
                </Box>
            </Grid>
            <Grid container item spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <CardContent
                        style={{
                            width: "150px",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            width="200"
                            height="350"
                            alt={form.values.name}
                            src={"/public/uploads/" + form.values.coverUrl}
                        />
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <div>
                        <p>
                            <strong>isbn: </strong>
                            {form.values.isbn}
                        </p>

                        <p>
                            <strong>Name: </strong>
                            {form.values.name}
                        </p>
                        <p>
                            <strong>Author: </strong>
                            {form.values.author}
                        </p>
                        <p>
                            <strong>Category: </strong>
                            {form.values.category}
                        </p>
                        <p>
                            <strong>Description: </strong>
                            {form.values.description}
                        </p>
                        <p>
                            <strong>Summary: </strong>
                            {form.values.summary}
                        </p>
                        <p>
                            <strong>isFeatured: </strong>
                            {form.values.isFeatured}
                        </p>
                        <p>
                            <strong>format: </strong>
                            {form.values.format}
                        </p>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default UpdatePage;
