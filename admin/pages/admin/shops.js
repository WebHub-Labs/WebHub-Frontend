import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import {
  Edit,
  Block,
  CheckCircle,
  Store,
  Person,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { adminAPI } from "../../lib/api";
import AdminLayout from "../../components/AdminLayout";
import ProtectedRoute from "../../components/ProtectedRoute";
import toast from "react-hot-toast";

const AdminShops = () => {
  const { isAdmin } = useAuth();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [editForm, setEditForm] = useState({
    isActive: true,
  });

  useEffect(() => {
    fetchShops();
  }, [page, search, statusFilter]);

  const fetchShops = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      };

      const response = await adminAPI.getShops(params);
      const data = response.data.data;
      
      setShops(data.shops);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching shops:", error);
      setError("Failed to load shops");
    } finally {
      setLoading(false);
    }
  };

  const handleEditShop = (shop) => {
    setSelectedShop(shop);
    setEditForm({
      isActive: shop.isActive,
    });
    setEditDialogOpen(true);
  };

  const handleUpdateShop = async () => {
    try {
      await adminAPI.updateShopStatus(selectedShop._id, { isActive: editForm.isActive });
      toast.success("Shop status updated successfully");
      setEditDialogOpen(false);
      fetchShops();
    } catch (error) {
      console.error("Error updating shop:", error);
      toast.error("Failed to update shop");
    }
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
          <Typography variant="h4">Shop Management</Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card>
          <CardContent>
            <Box display="flex" gap={2} mb={3}>
              <TextField
                label="Search shops"
                variant="outlined"
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ minWidth: 200 }}
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Shop</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Theme</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shops.map((shop) => (
                    <TableRow key={shop._id}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Store color="primary" />
                          <Box>
                            <Typography variant="body2" fontWeight="bold">
                              {shop.shopName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {shop.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Person color="action" />
                          <Box>
                            <Typography variant="body2">
                              {shop.owner?.fullName || "N/A"}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {shop.owner?.email || "N/A"}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={shop.theme}
                          color="secondary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={shop.isActive ? "Active" : "Inactive"}
                          color={shop.isActive ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(shop.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleEditShop(shop)}
                        >
                          <Edit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </CardContent>
        </Card>

        {/* Edit Shop Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Edit Shop</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label="Shop Name"
                value={selectedShop?.shopName || ""}
                disabled
                fullWidth
              />
              <TextField
                label="Owner"
                value={selectedShop?.owner?.fullName || ""}
                disabled
                fullWidth
              />
              <TextField
                label="Theme"
                value={selectedShop?.theme || ""}
                disabled
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={editForm.isActive}
                  label="Status"
                  onChange={(e) => setEditForm({ ...editForm, isActive: e.target.value })}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateShop} variant="contained">
              Update Shop
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminLayout>
  );
};

export default function AdminShopsPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminShops />
    </ProtectedRoute>
  );
}
