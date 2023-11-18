// Categories.js
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, CardMedia, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CategoryCard = styled(Card)(({ theme }) => ({
    maxWidth: 345,
    margin: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: '0.3s',
    '&:hover': {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
}));

const CategoryCardContent = styled(CardContent)({
    textAlign: 'center',
});

const CategoryCardMedia = styled(CardMedia)({
    height: 140,
    objectFit: 'cover',
});

const CategoriesContainer = styled('div')({
    textAlign: 'center',
    marginBottom: '20px',
});

const CategoriesTitle = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: '20px',
}));

const AddCategoryForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const FormTitle = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
});

const StyledTextField = styled(TextField)({
    marginBottom: '20px',
});

const ImageInput = styled('input')({
    display: 'none',
});

const ChooseImageButton = styled(Button)({
    marginBottom: '20px',
});

const ImagePreview = styled(CategoryCardMedia)({
    marginTop: '20px',
});

const AddCategoryButton = styled(Button)({
    marginTop: '20px',
});

function Categories() {
    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
        image: '', // Store the image path instead of the actual image
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the backend when the component mounts
        axios.get('http://localhost:5000/api/categories').then((response) => {
            setCategories(response.data);
        });
    }, [categories]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Upload the file to the server and get the path
            const formData = new FormData();
            formData.append('file', file);

            axios.post('http://localhost:5000/api/upload', formData)
                .then((response) => {
                    setNewCategory({ ...newCategory, image: response.data.path });
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        }
    };

    const handleAddCategory = () => {
        // Send a POST request to the backend to add a new category
        axios.post('http://localhost:5000/api/categories', newCategory).then((response) => {
            setCategories([...categories, response.data]);
            setNewCategory({
                name: '',
                description: '',
                image: '', // Clear the imagePath after adding the category
            });
        });
    };

    return (
        <div>
            <CategoriesContainer>
                <CategoriesTitle variant="h4" component="div">
                    Categories
                </CategoriesTitle>
                <AddCategoryForm>
                    <FormTitle variant="h5" component="div">
                        Add a New Category
                    </FormTitle>
                    <StyledTextField
                        label="Name"
                        variant="outlined"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        fullWidth
                    />
                    <StyledTextField
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        fullWidth
                    />
                    <ImageInput accept="image/*" id="image-input" type="file" onChange={handleImageChange} />
                    <label htmlFor="image-input">
                        <ChooseImageButton variant="outlined" component="span">
                            Choose Image
                        </ChooseImageButton>
                    </label>
                    {newCategory.image && (
                        <ImagePreview component="img" alt={newCategory.name} height="140"  />
                    )}
                    <AddCategoryButton
                        variant="contained"
                        color="primary"
                        onClick={handleAddCategory}
                        disabled={!newCategory.name.trim()}
                    >
                        Add Category
                    </AddCategoryButton>
                </AddCategoryForm>
            </CategoriesContainer>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item key={category._id} xs={12} sm={6} md={4}>
                        <Link to={`/category-details/${category._id}`} style={{ textDecoration: 'none' }}>
                            {/* Use the Link component to navigate to the details page */}
                            <CategoryCard>
                                <CategoryCardMedia
                                    component="img"
                                    alt={category.name}
                                    height="140"
                                    src={`http://localhost:5000/${category.image}` || 'https://via.placeholder.com/345x140'}
                                />
                                <CategoryCardContent>
                                    <Typography variant="h6" component="div" sx={{ marginBottom: 1 }}>
                                        {category.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {category.description}
                                    </Typography>
                                </CategoryCardContent>
                            </CategoryCard>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Categories;
