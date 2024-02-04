import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cuisineRecipes: [],
  randomRecipes: [],
  recipeInfo: {},
  similarRecipes: [],
  requestErrors: [],
  requestStatus: {
    fetchCuisineRecipesStatus: "idle",
    fetchRandomRecipesStatus: "idle",
    fetchRecipeInfoStatus: "idle",
    fetchSimilarRecipesStatus: "idle",
  },
};

export const fetchCuisineRecipes = createAsyncThunk(
  "recipe/fetchCuisineRecipes",
  async (payload) => {
    const res = await fetch(
      `${process.env.BASE_URL}/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&cuisine=${payload.cusine}&number=10`
    );

    return await res.json();
  }
);

export const fetchRandomRecipes = createAsyncThunk(
  "recipe/fetchRandomRecipes",
  async () => {
    const res = await fetch(
      `${process.env.BASE_URL}/recipes/random?apiKey=${process.env.SPOONACULAR_API_KEY}&number=15`
    );

    return await res.json();
  }
);

export const fetchRecipeInfo = createAsyncThunk(
  "recipe/fetchRecipeInfo",
  async (payload) => {
    const res = await fetch(
      `${process.env.BASE_URL}/recipes/${payload.recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
    );

    return await res.json();
  }
);

export const fetchSimilarRecipes = createAsyncThunk(
  "recipe/fetchSimilarRecipes",
  async (payload) => {
    const res = await fetch(
      `${process.env.BASE_URL}/recipes/${payload.recipeId}/similar?apiKey=${process.env.SPOONACULAR_API_KEY}&number=15`
    );

    return await res.json();
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCuisineRecipes.pending, (state) => {
      state.requestStatus.fetchCuisineRecipesStatus = "loading";
    });

    builder.addCase(fetchCuisineRecipes.fulfilled, (state, action) => {
      state.requestStatus.fetchCuisineRecipesStatus = "success";
      state.cuisineRecipes = action.payload;
    });

    builder.addCase(fetchCuisineRecipes.rejected, (state, action) => {
      state.requestStatus.fetchCuisineRecipesStatus = "failled";
      state.requestErrors.push({ fetchCuisineRecipes: action.error.message });
    });

    builder.addCase(fetchRandomRecipes.pending, (state) => {
      state.requestStatus.fetchRandomRecipesStatus = "loading";
    });

    builder.addCase(fetchRandomRecipes.fulfilled, (state, action) => {
      state.requestStatus.fetchRandomRecipesStatus = "success";
      state.randomRecipes = action.payload;
    });

    builder.addCase(fetchRandomRecipes.rejected, (state, action) => {
      state.requestStatus.fetchRandomRecipesStatus = "failled";
      state.requestErrors.push({ fetchRandomRecipes: action.error.message });
    });

    builder.addCase(fetchRecipeInfo.pending, (state) => {
      state.requestStatus.fetchRecipeInfoStatus = "loading";
    });

    builder.addCase(fetchRecipeInfo.fulfilled, (state, action) => {
      state.requestStatus.fetchRecipeInfoStatus = "success";
      state.recipeInfo = action.payload;
    });

    builder.addCase(fetchRecipeInfo.rejected, (state, action) => {
      state.requestStatus.fetchRecipeInfoStatus = "failled";
      state.requestErrors.push({ fetchRecipeInfo: action.error.message });
    });

    builder.addCase(fetchSimilarRecipes.pending, (state) => {
      state.requestStatus.fetchSimilarRecipesStatus = "loading";
    });

    builder.addCase(fetchSimilarRecipes.fulfilled, (state, action) => {
      state.requestStatus.fetchSimilarRecipesStatus = "success";
      state.similarRecipes = [action.payload];
    });

    builder.addCase(fetchSimilarRecipes.rejected, (state, action) => {
      state.requestStatus.fetchSimilarRecipesStatus = "failled";
      state.requestErrors.push({ fetchSimilarRecipes: action.error.message });
    });
  },
});

export default recipeSlice.reducer;
