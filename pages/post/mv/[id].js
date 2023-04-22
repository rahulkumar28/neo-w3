import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Footer from '../../../component/Footer';
import { useRouter } from 'next/router'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';



import { movies } from "../../../helpers/moviesH";

import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    CardActionArea,
    CardActions,
    Typography,
    Container,
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
//global variable my lists importing from index
import { myMovies } from '../../index';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Ethereum', '10/10/22', 6.0, 24, 4.0),
    createData('Polygon', '10/10/22', 9.0, 37, 4.3),
    createData('Arbitrum', '10/10/22', 16.0, 24, 6.0),
    createData('Avalanche', '10/10/22', 3.7, 67, 4.3),
    createData('Klaytn', '10/10/22', 16.0, 49, 3.9),
];

export default function BuyMovies({ postData }) {
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

    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const router = useRouter();

    PriceContent[0].pricetag = `ETH ${postData.Price}`;
    PriceContent[1].pricetag = `Flow Rate(${postData.Price})`;

    function buyToken(idx) {
        myMovies.push(postData);
        router.push('/myList');
    }

    return (
        <>
            {domLoaded && (
                <div className="w-full items-center">
                    <h1 className="text-black  text-4xl font-bold text-center mt-10 mb-10">Subscribe
                    </h1>
                    <ImageList sx={{ width: 1700, height: 800 }}>

                        <ImageListItem key={postData.Image}>
                            <img
                                src={`${postData.Image}?w=248&fit=crop&auto=format`}
                                srcSet={`${postData.Image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={postData.Name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={postData.Name}
                                subtitle={postData.Year}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${postData.Description}`}
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />


                        </ImageListItem>
                        <ImageListItem key="Subheader" cols={1}>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
                                        Details
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {postData.Description}
                                    </Typography>
                                    <br />
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Chain</TableCell>
                                                    <TableCell align="right">Date</TableCell>
                                                    <TableCell align="right">Floor Price</TableCell>
                                                    <TableCell align="right">Volume</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="right">{row.calories}</TableCell>
                                                        <TableCell align="right">{row.fat}</TableCell>
                                                        <TableCell align="right">{row.carbs}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </CardContent>
                            </Card>
                            <ImageListItemBar
                                title={`Tag: ${postData.Tag1} ${postData.Tag2} ${postData.Tag3}`}
                                subtitle={postData.Description}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${postData.Likes}`}
                                    >
                                        <ThumbUpIcon />
                                    </IconButton>
                                }
                            />

                        </ImageListItem>
                    </ImageList>
                    <div className="flex flex-col gap-3 overflow-scroll mt-3">
                        <Grid container spacing={5}>
                            {PriceContent.map((data, index) => {
                                return (
                                    <Grid item xs={12} md={3} key={index}>
                                        <CardActionArea href={data.href}>
                                            <Card
                                                square
                                                elevation={3}
                                                sx={{ background: "lightblue", height: "220px" }}>
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
                                                        onClick={() => buyToken(index)}
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

                </div>
            )}
        </>
    )
}

export async function getStaticPaths() {
    /*
        const paths = [{
            params: {
                id: '0'
            }
        },
        {
            params: {
                id: '1'
            }
        }
        ];
        return {
            paths,
            fallback: false
        }
    */

    const paths = movies.map((mv, index) => ({
        params: { id: index.toString() },
    }))
    console.log(paths);
    return {
        paths,
        fallback: false
    }

}

export async function getStaticProps({ params }) {
    const postData = movies[params.id];
    return {
        props: {
            postData
        }
    }
}