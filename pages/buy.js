import * as React from 'react';
import Head from 'next/head';
import Footer from '../component/Footer';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import { useEffect, useState } from 'react';

import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActionArea,
    Typography,
    Container,
    Button,
} from "@mui/material";

export default function BuySub() {
    const PriceContent = [
        {
            //href: "",
            image: "images/2.jpg",
            heading: "OneTime NFT",
            pricetag: "ETH 0.001",
            content: `One time NFT for annual subscription`,

        },
        {
            //href: "/video",
            image: "images/4.jpg",
            heading: "Money Stream",
            pricetag: "Flow Rate(100 wei/sec)",
            content: `Realtime Money Stream for instant access`,
        },
    ];

    return (
        <>
            <Head>
                <title>Buy</title>
                <link
                    rel="icon"
                    href="/n1ce-2.png"
                    type="image/x-icon">
                </link>
            </Head>
            <div className="w-full items-center">
                <h1 className="text-black  text-4xl font-bold text-center mt-10">Select Your subscription
                </h1>
                <div className="flex flex-col gap-3 overflow-scroll mt-3">
                    <Grid container spacing={5}>
                        {PriceContent.map((data, index) => {
                            return (
                                <Grid item xs={12} md={4} key={index}>
                                    <CardActionArea href={data.href}>
                                        <Card
                                            square
                                            elevation={3}
                                            sx={{ background: "lightblue", height: "300px" }}>
                                            <CardHeader title={data.heading}></CardHeader>
                                            <CardContent>
                                                <Typography
                                                    align="justify"
                                                    variant="h5"
                                                    color="primary"
                                                    gutterBottom>
                                                    {data.pricetag}
                                                </Typography>
                                                <Typography align="justify" variant="subtitle2">
                                                    {data.content}
                                                </Typography>
                                                <Button
                                                    onClick={console.log("buy")}
                                                    variant="contained"
                                                    color="secondary"
                                                    sx={{ marginTop: 3 }}>
                                                    Buy
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </CardActionArea>
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
                <Footer />
            </div>
        </>
    )
}

