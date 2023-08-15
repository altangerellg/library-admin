"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useState } from "react";
import ICollection from "@library/types/ICollection";
import axios from "axios";
import {
    Box,
    Button,
    Grid,
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
import { ArrowLeft } from "@mui/icons-material";
import { IBook } from "@library/types";

const CollectionPage: FC<any> = () => {
    const router = useRouter();
    const [collections, setCollections] = useState<Array<ICollection>>([]);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(100);
    const [totalPage, setTotalPage] = useState<number>(1);
    const fetchCollection = useCallback(
        async (values: any) => {
            try {
                const response = await axios.post("/api/collection/find", values, { params: { page, size } });
                setCollections(response.data.content);
                setTotalPage(response.data.totalPage);
            } catch (error) {}
        },
        [page, size]
    );
    useEffect(() => {
        fetchCollection({});
        //eslint-disable-next-line
    }, [page, size]);
    return (
        <Grid spacing={2} item xs={12}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>
                        <strong>Цуглуулгын жагсаaлт</strong>
                    </Typography>
                    <Button variant="contained" onClick={() => router.push("/dashboard")} startIcon={<ArrowLeft />}>
                        Буцах
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Нэр</TableCell>
                                <TableCell>Номнууд</TableCell>
                                <TableCell>Үүсгэсэн хэрэглэгч</TableCell>
                                <TableCell>Таалагдсан хэрэглэгчид</TableCell>
                                <TableCell>Үүсгэсэн огноо</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {collections.map((collection: ICollection, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{collection._id}</TableCell>
                                    <TableCell>{collection.name}</TableCell>
                                    <TableCell>{collection.books.map((book: IBook) => book.name).join(", ")}</TableCell>
                                    <TableCell>{JSON.stringify(collection.createdUser.lastname)}</TableCell>
                                    <TableCell>{collection.likes}</TableCell>
                                    <TableCell>{collection.date}</TableCell>
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
export default CollectionPage;
