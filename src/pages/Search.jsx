import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { searchVeterans } from '../api/veterans';

// Define background colors for different types
const typeColors = {
  Veteran: '#e3f2fd',  // light blue
  Guardian: '#ffebee'  // light red
};

const Search = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [searchParams, setSearchParams] = useState({
    lastname: '',
    status: 'Active',
    flight: 'All',
    limit: 25
  });
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!token) return;
    try {
      const data = await searchVeterans(searchParams, token);
      setResults(data.rows);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Last Name"
            value={searchParams.lastname}
            onChange={(e) => setSearchParams({ ...searchParams, lastname: e.target.value })}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={searchParams.status}
              label="Status"
              onChange={(e) => setSearchParams({ ...searchParams, status: e.target.value })}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Flown">Flown</MenuItem>
              <MenuItem value="Deceased">Deceased</MenuItem>
              <MenuItem value="Removed">Removed</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Flight</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row) => (
              <TableRow 
                key={row.id}
                sx={{ backgroundColor: typeColors[row.value.type] }}
              >
                <TableCell>{row.value.name}</TableCell>
                <TableCell>{row.value.city}</TableCell>
                <TableCell>{row.value.flight}</TableCell>
                <TableCell>{row.value.status}</TableCell>
                <TableCell>
                  <Button 
                    variant="outlined"
                    onClick={() => navigate(`/veteran/${row.id}`)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Search; 