import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Recipe } from "../../app/recipe/recipe";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface RequestError {
  operation: string;
  message?: string;
}

type Status = "idle" | "loading" | "success" | "failled";

type CuisineRecipes = {
  results: Recipe[];
};

type RandomRecipes = {
  recipes: Recipe[];
};

type RequestStatus = {
  fetchCuisineRecipesStatus: Status;
  fetchRandomRecipesStatus: Status;
  fetchRecipeInfoStatus: Status;
  fetchSimilarRecipesStatus: Status;
};

interface RecipeState {
  cuisineRecipes: CuisineRecipes;
  randomRecipes: RandomRecipes;
  recipeInfo: Recipe;
  similarRecipes: Recipe[];
  requestErrors: RequestError[];
  requestStatus: RequestStatus;
}

const initialState: RecipeState = {
  cuisineRecipes: {
    results: [],
  },
  randomRecipes: {
    recipes: [],
  },
  recipeInfo: {
    title: "",
    image: "",
  },
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
  async (cuisine: string | null) => {
    const res = await fetch(
      `${process.env.BASE_URL}/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&cuisine=${cuisine}&number=10`
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
  async (id: string) => {
    const res = await fetch(
      `${process.env.BASE_URL}/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
    );

    return await res.json();
  }
);

export const fetchSimilarRecipes = createAsyncThunk(
  "recipe/fetchSimilarRecipes",
  async (id: string) => {
    const res = await fetch(
      `${process.env.BASE_URL}/recipes/${id}/similar?apiKey=${process.env.SPOONACULAR_API_KEY}&number=15`
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
      state.requestErrors.push({
        operation: "fetchCuisineRecipes",
        message: action.error.message,
      });
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
      state.requestErrors.push({
        operation: "fetchRandomRecipes",
        message: action.error.message,
      });
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
      state.requestErrors.push({
        operation: "fetchRecipeInfo",
        message: action.error.message,
      });
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
      state.requestErrors.push({
        operation: "fetchSimilarRecipes",
        message: action.error.message,
      });
    });
  },
});

export default recipeSlice.reducer;
