import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBarChart, getDashboard, getLineChart, getPieChart } from "../api calls/stats";

const initialState={
    loading: false,
    error:null,
    stats:{},
    barCharts:{},
    pieCharts:{},
    lineCharts:{},
}

export const getBarChartAsync=createAsyncThunk("stats/getBarCharts",async(userId,{rejectWithValue})=>{
  try {
    const response = await getBarChart(userId);
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
})

export const getLineChartAsync=createAsyncThunk("stats/getLineCharts",async(userId,{rejectWithValue})=>{
    try {
      const response = await getLineChart(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  })

 export const getPieChartAsync=createAsyncThunk("stats/getPieCharts",async(userId,{rejectWithValue})=>{
    try {
      const response = await getPieChart(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  })

  export const getStatsAsync=createAsyncThunk("stats/getStats",async(userId,{rejectWithValue})=>{
    try {
      const response = await getDashboard(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  })

export const statSlice= createSlice({
    name: 'stats',
    initialState,
    reducers:{
      
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getBarChartAsync.pending, (state,action)=>{
          state.loading= true;
        })
        .addCase(getBarChartAsync.fulfilled, (state,action)=>{
            state.loading= false;
            state.barCharts= action.payload.charts;
          })
        .addCase(getBarChartAsync.rejected, (state,action)=>{
            state.loading= false;
            state.error= action.payload.response;
          })
          .addCase(getLineChartAsync.pending, (state,action)=>{
            state.loading= true;
          })
          .addCase(getLineChartAsync.fulfilled, (state,action)=>{
              state.loading= false;
              state.lineCharts= action.payload.charts;
          })
          .addCase(getLineChartAsync.rejected, (state,action)=>{
              state.loading= false;
              state.error= action.payload.response;
            })
          .addCase(getPieChartAsync.pending, (state,action)=>{
                state.loading= true;
            })
          .addCase(getPieChartAsync.fulfilled, (state,action)=>{
                  state.loading= false;
                  state.pieCharts= action.payload.charts;
            })
            .addCase(getPieChartAsync.rejected, (state,action)=>{
                  state.loading= false;
                  state.error= action.payload.response;
            })
          .addCase(getStatsAsync.pending, (state,action)=>{
              state.loading= true;
          })
          .addCase(getStatsAsync.fulfilled, (state,action)=>{
                state.loading= false;
                state.stats= action.payload.stats;
          })
           .addCase(getStatsAsync.rejected, (state,action)=>{
                state.loading= false;
                state.error= action.payload.response;
          })
    }
})
