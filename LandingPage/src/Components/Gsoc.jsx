import { StaticNavBar } from "./Navbar";
import { Typography, Box, Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Oval as Loader } from 'react-loader-spinner';

export default function Gsoc() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(null);
                setTimeout(async () => {
                    const response = await axios.get('http://localhost:5000/data', {
                        headers: { year: 2022 },
                    });
                    const orgData = response.data;
                    setData(orgData);
                }, 1000);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <StaticNavBar />
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
                {data && data.organizations && data.organizations.length > 0 ? (
                    data.organizations.map((organization) => (
                        <Org key={organization.id} org={organization} />
                    ))
                ) : (
                    <Loader color="#183D3D" height={50} width={50} />
                )}
            </Box>
        </div>
    );
}

function Org(props) {
    const renderTechnologies = () => {
        return props.org.technologies.map((tech, index) => (
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
