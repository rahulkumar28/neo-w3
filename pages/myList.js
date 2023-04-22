import * as React from 'react';
import { useEffect, useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../component/Footer';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

import { myMovies, myAvatars, myGames, myMetaverse } from './index'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {domLoaded && (
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Metaverse" {...a11yProps(0)} />
                        <Tab label="Avatars" {...a11yProps(1)} />
                        <Tab label="Games" {...a11yProps(2)} />
                        <Tab label="Movies" {...a11yProps(3)} />
                        <Tab label="Audio" {...a11yProps(4)} />
                        <Tab label="Sports" {...a11yProps(5)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <ImageList >
                            <ImageListItem key="Subheader" cols={3}>
                                <ListSubheader component="div">Your Metaverses</ListSubheader>
                            </ImageListItem>
                            {myMetaverse && myMetaverse.map((item) => (
                                <ImageListItem key={item.Image}>
                                    <img
                                        src={`${item.Image}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.Image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.Name}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.Name}
                                        subtitle={item.Year}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.Description}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ImageList >
                            <ImageListItem key="Subheader" cols={3}>
                                <ListSubheader component="div">Your Avatars</ListSubheader>
                            </ImageListItem>
                            {myAvatars && myAvatars.map((item) => (
                                <ImageListItem key={item.Image}>
                                    <img
                                        src={`${item.Image}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.Image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.Name}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.Name}
                                        subtitle={item.Year}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.Description}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ImageList >
                            <ImageListItem key="Subheader" cols={3}>
                                <ListSubheader component="div">Your Games</ListSubheader>
                            </ImageListItem>
                            {myGames && myGames.map((item) => (
                                <ImageListItem key={item.Image}>
                                    <img
                                        src={`${item.Image}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.Image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.Name}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.Name}
                                        subtitle={item.Year}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.Description}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <ImageList >
                            <ImageListItem key="Subheader" cols={3}>
                                <ListSubheader component="div">Your Movies</ListSubheader>
                            </ImageListItem>
                            {myMovies && myMovies.map((item) => (
                                <ImageListItem key={item.Image}>
                                    <img
                                        src={`${item.Image}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.Image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={item.Name}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.Name}
                                        subtitle={item.Year}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.Description}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Audio
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        Sports
                    </TabPanel>
                </Box>
            )}
        </>
    );
}
