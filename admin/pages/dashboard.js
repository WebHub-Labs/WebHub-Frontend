import { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  TrendingUp,
  ShoppingCart,
  Store,
  People,
  Inventory,
  AttachMoney,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { shopAPI, orderAPI, productAPI } from "../lib/api";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Link from "next/link";

const Dashboard = () => {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalShops: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      if (isAdmin()) {
        // Admin dashboard - get all data
        const [shopsResponse, ordersResponse, productsResponse] = await Promise.all([
          shopAPI.getShops(),
          orderAPI.getOrders({ limit: 5 }),
          productAPI.getProducts({ limit: 1000 }),
        ]);

        const shops = shopsResponse.data.data.shops || [];
        const orders = ordersResponse.data.data.orders || [];
        const products = productsResponse.data.data.products || [];

        const totalRevenue = orders.reduce((sum, order) => {
          return order.paymentStatus === 'paid' ? sum + order.total : sum;
        }, 0);

        setStats({
          totalShops: shops.length,
          totalProducts: products.length,
          totalOrders: orders.length,
          totalRevenue,
          recentOrders: orders.slice(0, 5),
        });
      } else {
        // Shop owner dashboard - get user's data
        const [shopsResponse, productsResponse] = await Promise.all([
          shopAPI.getShops(),
          productAPI.getProducts({ limit: 1000 }),
        ]);

        const shops = shopsResponse.data.data || [];
        const products = productsResponse.data.data.products || [];

        // Get orders for all user's shops
        let totalOrders = 0;
        let totalRevenue = 0;
        let recentOrders = [];

        for (const shop of shops) {
          try {
            const ordersResponse = await orderAPI.getOrdersByShop(shop._id, { limit: 5 });
            const shopOrders = ordersResponse.data.data.orders || [];
            totalOrders += shopOrders.length;
            totalRevenue += shopOrders.reduce((sum, order) => {
              return order.paymentStatus === 'paid' ? sum + order.total : sum;
            }, 0);
            recentOrders = [...recentOrders, ...shopOrders];
          } catch (error) {
            console.error(`Error fetching orders for shop ${shop._id}:`, error);
          }
        }

        // Sort recent orders by date and take top 5
        recentOrders = recentOrders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setStats({
          totalShops: shops.length,
          totalProducts: products.length,
          totalOrders,
          totalRevenue,
          recentOrders,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color = "primary" }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="h2">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: `${color}.light`,
              borderRadius: "50%",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

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
        <Typography variant="h4" gutterBottom>
          {isAdmin() ? "Admin Dashboard" : "Shop Dashboard"}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Welcome back, {user?.fullName}!
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Shops"
              value={stats.totalShops}
              icon={<Store />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              icon={<Inventory />}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Orders"
              value={stats.totalOrders}
              icon={<ShoppingCart />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Revenue"
              value={`$${stats.totalRevenue.toFixed(2)}`}
              icon={<AttachMoney />}
              color="warning"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Recent Orders</Typography>
                  <Link href="/dashboard/orders">
                    <Button variant="outlined" size="small">
                      View All
                    </Button>
                  </Link>
                </Box>
                {stats.recentOrders.length > 0 ? (
                  <Box>
                    {stats.recentOrders.map((order) => (
                      <Box
                        key={order._id}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        py={1}
                        borderBottom="1px solid #eee"
                      >
                        <Box>
                          <Typography variant="body1">
                            Order #{order.orderNumber}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {order.customer.name} - {order.customer.email}
                          </Typography>
                        </Box>
                        <Box textAlign="right">
                          <Typography variant="body1" fontWeight="bold">
                            ${order.total}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={
                              order.status === "delivered"
                                ? "success.main"
                                : order.status === "pending"
                                ? "warning.main"
                                : "primary.main"
                            }
                          >
                            {order.status}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography color="text.secondary">
                    No recent orders found.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Link href="/dashboard/products">
                    <Button variant="contained" fullWidth>
                      Manage Products
                    </Button>
                  </Link>
                  <Link href="/dashboard/orders">
                    <Button variant="outlined" fullWidth>
                      View Orders
                    </Button>
                  </Link>
                  <Link href="/dashboard/shops">
                    <Button variant="outlined" fullWidth>
                      Manage Shops
                    </Button>
                  </Link>
                  {isAdmin() && (
                    <Link href="/admin/users">
                      <Button variant="outlined" fullWidth>
                        Manage Users
                      </Button>
                    </Link>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}