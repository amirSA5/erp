// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Hidden,
    Menu,
    MenuItem,
    Fade,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddBoxIcon from '@mui/icons-material/AddBox';

const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
});

const DropdownMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        boxShadow: '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
    },
    '& .MuiMenuItem-root': {
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    },
}));

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Admin Dashboard
                </Typography>

                {/* Responsive Dropdown Menu */}
                <Hidden lgUp>
                    <DropdownMenu
                        id="responsive-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        TransitionComponent={Fade}
                        transitionDuration={500}
                    >
                        <Fade in={Boolean(anchorEl)}>
                            <div>
                                <MenuItem onClick={handleMenuClose}>
                                    <IconButton color="inherit">
                                        <HomeIcon />
                                    </IconButton>
                                    <StyledLink to="/categories">Categories</StyledLink>
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>
                                    <IconButton color="inherit">
                                        <CategoryIcon />
                                    </IconButton>
                                    <StyledLink to="/produits">Produits</StyledLink>
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>
                                    <IconButton color="inherit">
                                        <ShoppingCartIcon />
                                    </IconButton>
                                    <StyledLink to="/factures">Factures</StyledLink>
                                </MenuItem>
                                <MenuItem onClick={handleMenuClose}>
                                    <IconButton color="inherit">
                                        <ReceiptIcon />
                                    </IconButton>
                                    <StyledLink to="/new-factures">New Factures</StyledLink>
                                </MenuItem>
                            </div>
                        </Fade>
                    </DropdownMenu>
                </Hidden>

                {/* Show these links on larger screens */}
                <Hidden mdDown>
                    <Button color="inherit">
                        <IconButton color="inherit">
                            <HomeIcon />
                        </IconButton>
                        <StyledLink to="/categories">Categories</StyledLink>
                    </Button>
                    <Button color="inherit">
                        <IconButton color="inherit">
                            <CategoryIcon />
                        </IconButton>
                        <StyledLink to="/produits">Produits</StyledLink>
                    </Button>
                    <Button color="inherit">
                        <IconButton color="inherit">
                            <ShoppingCartIcon />
                        </IconButton>
                        <StyledLink to="/factures">Factures</StyledLink>
                    </Button>
                    <Button color="inherit">
                        <IconButton color="inherit">
                            <AddBoxIcon />
                        </IconButton>
                        <StyledLink to="/new-factures">New Factures</StyledLink>
                    </Button>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
