import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { farmerService } from '../../services/farmerService';

// Async thunks
export const fetchFarmers = createAsyncThunk(
  'farmers/fetchFarmers',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await farmerService.getFarmers(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFarmerById = createAsyncThunk(
  'farmers/fetchFarmerById',
  async (farmerId, { rejectWithValue }) => {
    try {
      const response = await farmerService.getFarmerById(farmerId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFarmerProfile = createAsyncThunk(
  'farmers/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await farmerService.updateProfile(profileData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFarmerProducts = createAsyncThunk(
  'farmers/fetchProducts',
  async (farmerId, { rejectWithValue }) => {
    try {
      const response = await farmerService.getFarmerProducts(farmerId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFarmerProduct = createAsyncThunk(
  'farmers/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await farmerService.addProduct(productData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateFarmerProduct = createAsyncThunk(
  'farmers/updateProduct',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await farmerService.updateProduct(productId, productData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFarmerProduct = createAsyncThunk(
  'farmers/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await farmerService.deleteProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFarmerAnalytics = createAsyncThunk(
  'farmers/fetchAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await farmerService.getAnalytics();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  farmers: [],
  currentFarmer: null,
  farmerProducts: [],
  analytics: {
    totalSales: 0,
    totalOrders: 0,
    popularProducts: [],
    monthlyRevenue: [],
    recentOrders: [],
  },
  isLoading: false,
  error: null,
  profileUpdateLoading: false,
  productActionLoading: false,
};

const farmerSlice = createSlice({
  name: 'farmers',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentFarmer: (state) => {
      state.currentFarmer = null;
    },
    clearFarmerProducts: (state) => {
      state.farmerProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch farmers
      .addCase(fetchFarmers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFarmers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.farmers = action.payload;
      })
      .addCase(fetchFarmers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch farmer by ID
      .addCase(fetchFarmerById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFarmerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentFarmer = action.payload;
      })
      .addCase(fetchFarmerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update farmer profile
      .addCase(updateFarmerProfile.pending, (state) => {
        state.profileUpdateLoading = true;
        state.error = null;
      })
      .addCase(updateFarmerProfile.fulfilled, (state, action) => {
        state.profileUpdateLoading = false;
        state.currentFarmer = action.payload;
      })
      .addCase(updateFarmerProfile.rejected, (state, action) => {
        state.profileUpdateLoading = false;
        state.error = action.payload;
      })
      // Fetch farmer products
      .addCase(fetchFarmerProducts.fulfilled, (state, action) => {
        state.farmerProducts = action.payload;
      })
      // Add farmer product
      .addCase(addFarmerProduct.pending, (state) => {
        state.productActionLoading = true;
        state.error = null;
      })
      .addCase(addFarmerProduct.fulfilled, (state, action) => {
        state.productActionLoading = false;
        state.farmerProducts.unshift(action.payload);
      })
      .addCase(addFarmerProduct.rejected, (state, action) => {
        state.productActionLoading = false;
        state.error = action.payload;
      })
      // Update farmer product
      .addCase(updateFarmerProduct.pending, (state) => {
        state.productActionLoading = true;
        state.error = null;
      })
      .addCase(updateFarmerProduct.fulfilled, (state, action) => {
        state.productActionLoading = false;
        const index = state.farmerProducts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.farmerProducts[index] = action.payload;
        }
      })
      .addCase(updateFarmerProduct.rejected, (state, action) => {
        state.productActionLoading = false;
        state.error = action.payload;
      })
      // Delete farmer product
      .addCase(deleteFarmerProduct.fulfilled, (state, action) => {
        state.farmerProducts = state.farmerProducts.filter(p => p.id !== action.payload);
      })
      // Fetch farmer analytics
      .addCase(fetchFarmerAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { clearError, clearCurrentFarmer, clearFarmerProducts } = farmerSlice.actions;
export default farmerSlice.reducer;