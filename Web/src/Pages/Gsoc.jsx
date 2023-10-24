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
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { mainListItems } from './listItems.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Oval as Loader } from 'react-loader-spinner';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    MenuItem,
    Select,
} from '@mui/material';
import '../CSS/Gsoc.css';

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
    })
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
    const [searchQuery, setSearchQuery] = useState('');

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        let year = selectedYear;
        const fetchData = async () => {
            try {
                setData(null);
                setTimeout(async () => {
                    const response = await axios.get('http://localhost:5000/data', {
                        headers: { year: year },
                    });
                    const orgData = response.data;
                    setData(orgData);
                }, 1000);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedYear]);

    const filteredData =
        data &&
        data.organizations &&
        data.organizations.filter((organization) =>
            organization.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    overflow: 'hidden',
                    width: '100vw',
                    height: '100vh',
                }}
            >
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
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        marginTop: 0,
                                        borderRadius: 8,
                                        backgroundColor: '#183D3D',
                                        color: 'white',
                                    },
                                },
                            }}
                        >
                            <MenuItem
                                value=""
                                sx={{
                                    color: 'White',
                                    backgroundColor: '#183D3D',
                                    padding: 0,
                                    margin: 0,
                                    '&.Mui-selected, &:hover': {
                                        backgroundColor: '#183D3D',
                                        border: 'none',
                                    },
                                }}
                            >
                                Select Year
                            </MenuItem>
                            {[2016, 2017, 2018, 2019, 2020, 2021, 2022].map((year) => (
                                <MenuItem
                                    key={year}
                                    value={year}
                                    sx={{
                                        color: 'white',
                                        backgroundColor: '#183D3D',
                                        '&.Mui-selected': {
                                            backgroundColor: '#1E4D4D',
                                            border: 'none',
                                        },
                                        '&:hover': {
                                            backgroundColor: '#183D3D',
                                            border: 'none',
                                        },
                                    }}
                                >
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                        <div
                            className="search-container"
                            sx={{ position: 'relative', marginLeft: 'auto' }}
                        >
                            <SearchIcon sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', marginLeft: '8px', color: '#93B1A6' }} />
                            <InputBase
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                sx={{
                                    color: 'white',
                                    paddingLeft: '32px',
                                }}
                            />
                        </div>
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
                    <List component="nav">{mainListItems}</List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        overflow: 'auto',
                        background: 'linear-gradient(to right, #7FB3B3, #183D3D)',
                        padding: '30px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        paddingTop: '50px',
                    }}
                >
                    {filteredData && filteredData.length > 0 ? (
                        filteredData.map((organization) => (
                            <Org key={organization.id} org={organization} />
                        ))
                    ) : (
                        <Loader color="#183D3D" height={50} width={50} />
                    )}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function Org(props) {
    const renderTechnologies = () => {
        return props.org.technologies.slice(0, 2).map((tech, index) => (
            <div key={index} style={{ display: 'inline-flex', alignItems: 'center', marginRight: '16px' }}>
                <div
                    style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: getTechnologyColor(tech),
                        marginRight: '8px',
                    }}
                />
                <Typography variant="body2" color="#c9d1d9">
                    {tech}
                </Typography>
            </div>
        ));
    };

    const getTechnologyColor = (technology) => {
        switch (technology.toLowerCase()) {
            case 'javascript':
                return '#f1e05a';
            case 'typescript':
                return '#3178c6';
            case 'c':
                return '#555555';
            case 'c++':
                return '#f34b7d';
            case 'kotlin':
                return '#7f97d6';
            case 'dart':
                return '#00b4ab';
            case 'python':
                return '#3572A5';
            case 'jupyter':
                return '#f37626';
            case 'ruby':
                return '#701516';
            case 'ruby on rails':
                return '#cc0000';
            case 'kubernetes':
                return '#326ce5';
            case 'opengl':
                return '#5586a2';
            case 'rust':
                return '#dea584';
            case 'golang':
                return '#00acd7';
            case 'react':
                return '#61dafb';
            case 'nextjs':
                return '#000000';
            case 'qt':
                return '#41cd52';
            // Add more cases as needed
            default:
                return '#2ea44f'; // Default color
        }
    };


    return (
        <Card
            style={{
                margin: 25,
                width: 300,
                minHeight: 300,
                borderRadius: 12,
                overflow: 'hidden',
                backgroundColor: '#0d1117',
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
            }}
            onClick={() => {
                window.location.href = props.org.url;
            }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '150px',
                    }}
                    image={props.org.image_url}
                    alt="Organization Image"
                />
                <CardContent style={{ padding: '16px' }}>
                    <Typography
                        variant="h6"
                        component="div"
                        color={'#58a6ff'}
                        style={{ fontWeight: '600', marginBottom: '8px' }}
                    >
                        {props.org.name}
                    </Typography>
                    <Typography variant="body2" color="#c9d1d9" style={{ marginBottom: '8px' }}>
                        {props.org.description}
                    </Typography>
                    {renderTechnologies()}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}