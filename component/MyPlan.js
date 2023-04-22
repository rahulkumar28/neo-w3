
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


export default function MyPlan() {

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
        </>
    )


}
