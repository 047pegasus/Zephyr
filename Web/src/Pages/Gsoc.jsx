import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './listItems.jsx';
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardActionArea, CardContent, CardMedia, MenuItem, Select} from "@mui/material";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                GitBit
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: 'rgba(4, 13, 18, 0.8)',
    backdropFilter: 'blur(8px)',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
            backgroundColor: 'rgba(24, 61, 61, 0.8)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0px 0px 10px 0px rgba(255, 255, 255, 0.5)',
            transition: 'box-shadow 0.3s ease-in-out, backdrop-filter 0.3s ease-in-out',
        },
    }),
);


const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#5C8374',
        },
        secondary: {
            main: '#93B1A6',
        },
        text: {
            primary: '#fff',
        },
    },
});

export default function Gsoc() {
    const [open, setOpen] = React.useState(true);
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2022);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/data")
            .then((res) => {
                const orgData = res.data;
                setData(orgData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                overflow: 'hidden',
                width: '100vw',
                height: '100vh',
            }}>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px',
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            GSOC ORGS
                        </Typography>
                        <Select
                            value={selectedYear}
                            onChange={handleYearChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Select year' }}
                            sx={{
                                color: '#93B1A6',
                                '&:before': {
                                    borderBottomColor: 'black',
                                },
                                '&:after': {
                                    borderBottomColor: 'black',
                                },
                                padding: 0,
                                margin: 0,
                            }}
                            renderValue={(selected) => (
                                <span
                                    sx={{
                                        color: '#183D3D',
                                        backgroundColor: '#183D3D',
                                    }}
                                >
            {selected}
        </span>
                            )}
                        >
                            <MenuItem value="" sx={{
                                color: 'White',
                                backgroundColor: '#183D3D',
                                padding: 0,
                                margin: 0,
                                '&.Mui-selected, &:hover': {
                                    backgroundColor: '#183D3D',
                                },
                            }}>
                                Select Year
                            </MenuItem>
                            {[2016, 2017, 2018, 2019, 2020, 2021, 2022].map((year) => (
                                <MenuItem key={year} value={year} sx={{
                                    color: 'white',
                                    backgroundColor: '#183D3D',
                                    '&.Mui-selected': {
                                        backgroundColor: '#1E4D4D',
                                    },
                                    '&:hover': {
                                        backgroundColor: '#183D3D',
                                    },
                                }}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                        backgroundColor: '#183D3D',
                        padding: '30px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        paddingTop: '70px',
                    }}
                >
                    {data && data.organizations && data.organizations.length > 0 ? (
                        data.organizations.map((organization) => (
                            <Org key={organization.id} org={organization} />
                        ))
                    ) : (
                        <p>Loading ......</p>
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function Org(props) {
    return (
        <Card
            style={{
                margin: 25,
                width: 300,
                minHeight: 200,
                marginTop: 45,
                backgroundColor: 'rgba(4, 13, 18, 0.7)',
                color: '#93B1A6',
                cursor: 'pointer',
            }}
            onClick={() => {
                window.location.href = props.org.url;
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    style={{ objectFit: 'contain', width: '100%', height: '200px' }}
                    image={props.org.image_url}
                    alt="Organization Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" color={"white"}>
                        {props.org.name}
                    </Typography>
                    <Typography variant="body2" color="white">
                        {props.org.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}