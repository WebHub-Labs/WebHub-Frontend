import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Category,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { categoryAPI } from "../../lib/api";
import AdminLayout from "../../components/AdminLayout";
import ProtectedRoute from "../../components/ProtectedRoute";
import toast from "react-hot-toast";

const CategoryManagement = () => {
  const { isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    parent: "",
    sortOrder: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getCategoryTree();
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || "",
        image: category.image || "",
        parent: category.parent?._id || "",
        sortOrder: category.sortOrder || 0,
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        description: "",
        image: "",
        parent: "",
        sortOrder: 0,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      parent: "",
      sortOrder: 0,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        await categoryAPI.updateCategory(editingCategory._id, formData);
        toast.success("Category updated successfully");
      } else {
        await categoryAPI.createCategory(formData);
        toast.success("Category created successfully");
      }
      handleCloseDialog();
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Failed to save category");
    }
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await categoryAPI.deleteCategory(categoryId);
        toast.success("Category deleted successfully");
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category");
      }
    }
  };

  const renderCategoryTree = (categories, level = 0) => {
    return categories.map((category) => (
      <Box key={category._id} sx={{ ml: level * 2 }}>
        <Card sx={{ mb: 1 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex" alignItems="center" gap={1}>
                <Category color="primary" />
                <Box>
                  <Typography variant="h6">{category.name}</Typography>
                  {category.description && (
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  )}
                  <Box display="flex" gap={1} mt={1}>
                    <Chip label={`Sort: ${category.sortOrder}`} size="small" />
                    {category.children && category.children.length > 0 && (
                      <Chip 
                        label={`${category.children.length} subcategories`} 
                        size="small" 
                        color="secondary" 
                      />
                    )}
                  </Box>
                </Box>
              </Box>
              <Box>
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(category)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
                {isAdmin() && (
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(category._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
        {category.children && category.children.length > 0 && (
          <Box sx={{ ml: 2 }}>
            {renderCategoryTree(category.children, level + 1)}
          </Box>
        )}
      </Box>
    ));
  };

  if (loading) {
    return (
      <AdminLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Category Management</Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
          >
            Add Category
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Category Tree
            </Typography>
            {categories.length > 0 ? (
              renderCategoryTree(categories)
            ) : (
              <Typography color="text.secondary">
                No categories found. Create your first category to get started.
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Category Dialog */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editingCategory ? "Edit Category" : "Create Category"}
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Category Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                fullWidth
                placeholder="https://example.com/image.jpg"
              />
              <FormControl fullWidth>
                <InputLabel>Parent Category</InputLabel>
                <Select
                  value={formData.parent}
                  label="Parent Category"
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                >
                  <MenuItem value="">No Parent (Root Category)</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Sort Order"
                type="number"
                value={formData.sortOrder}
                onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                fullWidth
                inputProps={{ min: 0 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingCategory ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default function CategoryManagementPage() {
  return (
    <ProtectedRoute>
      <CategoryManagement />
    </ProtectedRoute>
  );
}