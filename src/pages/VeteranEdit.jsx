import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getVeteran, updateVeteran } from '../api/veterans';

const VeteranEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [veteran, setVeteran] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVeteran = async () => {
      try {
        const data = await getVeteran(id, token);
        setVeteran(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load veteran data');
        setLoading(false);
      }
    };

    if (token) {
      fetchVeteran();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateVeteran(id, veteran, token);
      navigate('/');
    } catch (err) {
      setError('Failed to update veteran');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!veteran) return <Typography>No veteran found</Typography>;

  return (
    <Box component={Paper} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Edit Veteran
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Personal Information Section */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Personal Information</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              required
              label="First Name"
              value={veteran.name?.first || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                name: { ...veteran.name, first: e.target.value }
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Middle Name"
              value={veteran.name?.middle || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                name: { ...veteran.name, middle: e.target.value }
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              required
              label="Last Name"
              value={veteran.name?.last || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                name: { ...veteran.name, last: e.target.value }
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Nickname"
              value={veteran.name?.nickname || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                name: { ...veteran.name, nickname: e.target.value }
              })}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Birth Date"
              InputLabelProps={{ shrink: true }}
              value={veteran.birth_date || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                birth_date: e.target.value
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={veteran.gender || ''}
                label="Gender"
                onChange={(e) => setVeteran({
                  ...veteran,
                  gender: e.target.value
                })}
              >
                <MenuItem value="M">Male</MenuItem>
                <MenuItem value="F">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Address Section */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Address</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Street Address"
              value={veteran.address?.street || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                address: { ...veteran.address, street: e.target.value }
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              required
              label="City"
              value={veteran.address?.city || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                address: { ...veteran.address, city: e.target.value }
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              required
              label="State"
              value={veteran.address?.state || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                address: { ...veteran.address, state: e.target.value }
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              required
              label="ZIP Code"
              value={veteran.address?.zip || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                address: { ...veteran.address, zip: e.target.value }
              })}
            />
          </Grid>

          {/* Service Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Service Information</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Branch of Service</InputLabel>
              <Select
                value={veteran.service?.branch || 'Unknown'}
                label="Branch of Service"
                onChange={(e) => setVeteran({
                  ...veteran,
                  service: { ...veteran.service, branch: e.target.value }
                })}
              >
                <MenuItem value="Unknown">Unknown</MenuItem>
                <MenuItem value="Army">Army</MenuItem>
                <MenuItem value="Air Force">Air Force</MenuItem>
                <MenuItem value="Navy">Navy</MenuItem>
                <MenuItem value="Marines">Marines</MenuItem>
                <MenuItem value="Coast Guard">Coast Guard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Veteran Type</InputLabel>
              <Select
                value={veteran.vet_type || ''}
                label="Veteran Type"
                onChange={(e) => setVeteran({
                  ...veteran,
                  vet_type: e.target.value
                })}
              >
                <MenuItem value="WWII">WWII</MenuItem>
                <MenuItem value="Korea">Korea</MenuItem>
                <MenuItem value="Vietnam">Vietnam</MenuItem>
                <MenuItem value="Afghanistan">Afghanistan</MenuItem>
                <MenuItem value="Iraq">Iraq</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Flight Status */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Flight Information</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Flight ID"
              value={veteran.flight?.id || ''}
              onChange={(e) => setVeteran({
                ...veteran,
                flight: { ...veteran.flight, id: e.target.value }
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={veteran.flight?.status || 'Active'}
                label="Status"
                onChange={(e) => setVeteran({
                  ...veteran,
                  flight: { ...veteran.flight, status: e.target.value }
                })}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Flown">Flown</MenuItem>
                <MenuItem value="Deceased">Deceased</MenuItem>
                <MenuItem value="Removed">Removed</MenuItem>
                <MenuItem value="Future-Spring">Future-Spring</MenuItem>
                <MenuItem value="Future-Fall">Future-Fall</MenuItem>
                <MenuItem value="Future-PostRestriction">Future-PostRestriction</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Medical Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Medical Information</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Medical Level</InputLabel>
              <Select
                value={veteran.medical?.level || ''}
                label="Medical Level"
                onChange={(e) => setVeteran({
                  ...veteran,
                  medical: { ...veteran.medical, level: e.target.value }
                })}
              >
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="3.5">3.5</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Food Restrictions</InputLabel>
              <Select
                value={veteran.medical?.food_restriction || 'None'}
                label="Food Restrictions"
                onChange={(e) => setVeteran({
                  ...veteran,
                  medical: { ...veteran.medical, food_restriction: e.target.value }
                })}
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Gluten Free">Gluten Free</MenuItem>
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Vegan">Vegan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={veteran.medical?.usesCane || false}
                      onChange={(e) => setVeteran({
                        ...veteran,
                        medical: { ...veteran.medical, usesCane: e.target.checked }
                      })}
                    />
                  }
                  label="Uses Cane"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={veteran.medical?.usesWalker || false}
                      onChange={(e) => setVeteran({
                        ...veteran,
                        medical: { ...veteran.medical, usesWalker: e.target.checked }
                      })}
                    />
                  }
                  label="Uses Walker"
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={veteran.medical?.usesWheelchair || false}
                      onChange={(e) => setVeteran({
                        ...veteran,
                        medical: { ...veteran.medical, usesWheelchair: e.target.checked }
                      })}
                    />
                  }
                  label="Uses Wheelchair"
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Form Actions */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={() => navigate('/')}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default VeteranEdit; 