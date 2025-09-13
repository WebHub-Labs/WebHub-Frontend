import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Store,
  ShoppingCart,
  People,
  Analytics,
  Security,
  Speed,
} from "@mui/icons-material";
import Link from "next/link";

export default function Index() {
  const { isAuthenticated, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return <LoadingSpinner message="Loading WebHub Admin..." />;
  }

  if (isAuthenticated) {
    return <LoadingSpinner message="Redirecting to dashboard..." />;
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              WebHub Admin
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, mb: 4 }}>
              Complete E-commerce Platform Management
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600, mx: "auto", mb: 4 }}>
              Manage your multi-shop e-commerce platform with our comprehensive admin dashboard. 
              Built for shop owners, admins, and super administrators.
            </Typography>
            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <Link href="/login">
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": { bgcolor: "grey.100" },
                  }}
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center" gutterBottom fontWeight="bold">
          Powerful Features
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Everything you need to manage your e-commerce platform
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2, width: 64, height: 64 }}>
                  <Store fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Multi-Shop Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Create and manage multiple shops with different themes and configurations. 
                  Perfect for businesses with multiple brands or product lines.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: "secondary.main", mx: "auto", mb: 2, width: 64, height: 64 }}>
                  <ShoppingCart fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Order Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Track orders from placement to delivery. Update status, manage payments, 
                  and provide customers with real-time order tracking.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: "success.main", mx: "auto", mb: 2, width: 64, height: 64 }}>
                  <Analytics fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Advanced Analytics
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Get insights into your business performance with comprehensive analytics, 
                  revenue tracking, and detailed reporting.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: "warning.main", mx: "auto", mb: 2, width: 64, height: 64 }}>
                  <People fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  User Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage users, assign roles, and control access. Support for shop owners, 
                  admins, and super administrators with granular permissions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: "info.main", mx: "auto", mb: 2, width: 64, height: 64 }}>
                  <Security fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Secure & Reliable
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Built with security in mind. JWT authentication, role-based access control, 
                  and secure API communication protect your data.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Avatar sx={{ bgcolor: "error.main", mx: "auto", mb: 2, width: 64, height: 64 }}>
                  <Speed fontSize="large" />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  Fast & Responsive
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Modern React-based interface that's fast, responsive, and works perfectly 
                  on desktop, tablet, and mobile devices.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Role-Based Features */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" gutterBottom fontWeight="bold">
            Role-Based Access
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Different features for different user types
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Typography variant="h5" gutterBottom color="primary">
                  Shop Owner
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Manage your shop and products
                </Typography>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>Product management</li>
                  <li>Order tracking</li>
                  <li>Shop analytics</li>
                  <li>Category management</li>
                  <li>Inventory tracking</li>
                </ul>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Typography variant="h5" gutterBottom color="secondary">
                  Admin
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Oversee the entire platform
                </Typography>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>All shop owner features</li>
                  <li>Shop management</li>
                  <li>Order oversight</li>
                  <li>System analytics</li>
                  <li>Category administration</li>
                </ul>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Typography variant="h5" gutterBottom color="error">
                  Super Admin
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Complete system control
                </Typography>
                <ul style={{ paddingLeft: "1.5rem" }}>
                  <li>All admin features</li>
                  <li>User management</li>
                  <li>Role assignment</li>
                  <li>System configuration</li>
                  <li>Advanced analytics</li>
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Ready to Get Started?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of businesses using WebHub to manage their e-commerce operations
        </Typography>
        <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
          <Link href="/signup">
            <Button variant="contained" size="large">
              Create Account
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outlined" size="large">
              Sign In
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
