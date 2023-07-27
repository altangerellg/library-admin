"use client";
import ChartComponent from "@library/components/Chart/chart";
import PieChart from "@library/components/Chart/pieChart";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React, { FC } from "react";

const DashboardPage: FC<any> = () => {
    const chartData = {
        labels: ["06.25.23", "06.26.23", "06.27.23", "06.28.23", "06.29.23", "06.30.23"],
        values: [12, 19, 8, 4, 14, 6],
    };
    const chartData1 = {
        labels: ["06.25.23", "06.26.23", "06.27.23", "06.28.23", "06.29.23", "06.30.23"],
        values: [1, 9, 18, 14, 4, 16],
    };
    const pieData = {
        labels: ["Fiction", "Thriller", "Romance", "Biography", "Humor"],
        values: [50, 79, 100, 232, 550],
    };
    return (
        <Grid container item spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "#61bdc2" }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Хэрэглэгч
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "#82c9e0" }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Админ
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "#a9d8e9" }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Ном
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "#c9eaf8" }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Категори
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid container item spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                    <Box display={"flex"} flexDirection={"row"}>
                        <ChartComponent data={chartData} data1={chartData1} />
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"}>
                    <PieChart data={pieData} />
                </Box>
            </Grid>
        </Grid>
    );
};

export default DashboardPage;
