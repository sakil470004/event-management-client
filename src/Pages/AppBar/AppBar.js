import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { removeFromDb } from '../fakedb/fakedb';

// const pages = ['Products', 'Pricing', 'Blog'];

const ResponsiveAppBar = ({ user, setUser }) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const navigation = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleLogOUt = () => {
        handleCloseNavMenu();
        removeFromDb();
        setUser('')
    }


    return (
        <AppBar position="sticky" style={{ background: '#2E3B55' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex', cursor: 'pointer' } }}

                        onClick={() => navigation('/')}
                    >
                        MI
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >

                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link style={{ textDecoration: 'none' }} to='/myEvents'>My Events</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link style={{ textDecoration: 'none' }} to='/addEvent'>Add Event</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    <Link style={{ textDecoration: 'none' }} to='/invite'>Invitation List</Link>
                                </Typography>
                            </MenuItem>
                            {user ? <Box>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link style={{ textDecoration: 'none' }} to='/userDetails'>{user}</Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={handleLogOUt}>
                                    LogOUt
                                </MenuItem>
                            </Box>
                                : <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link style={{ textDecoration: 'none' }} to='/login'>Log In</Link>
                                    </Typography>
                                </MenuItem>

                            }
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', cursor: 'pointer' } }}
                        onClick={() => navigation('/')}
                    >
                        MI
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => navigation('/')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={() => navigation('/myEvents')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >My Events
                        </Button>
                        <Button
                            onClick={() => navigation('/addEvent')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Add Event
                        </Button>
                        <Button
                            onClick={() => navigation('/invite')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >Invitation List
                        </Button>
                        {!user ?
                            <Button
                                onClick={() => navigation('/login')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >Log In
                            </Button> :
                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Button
                                    onClick={() => navigation('/userDetails')}

                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {user}
                                </Button>
                                <Button
                                    onClick={handleLogOUt}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Log OUt
                                </Button>
                            </Box>
                        }
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
