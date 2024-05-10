import { createAsyncThunk } from '@reduxjs/toolkit';
import * as tasksApi from '../../api/tasks-api';

export const fetchBoards = createAsyncThunk(
  'boards/fetcBoards',
  async (_, { rejectWithValue }) => {
    try {
      const data = await tasksApi.getBoards();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBoardById = createAsyncThunk(
  'boards/fetcBoardById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await tasksApi.getBoardById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (body, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { items },
        },
      } = getState();
      const data = await tasksApi.addBoard(body);
      const newItems = [...items, data];

      return newItems;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { items, active },
        },
      } = getState();
      const response = await tasksApi.removeBoard(id);
      const newItems = items.filter((card) => card._id !== response);
      if (active._id === response) {
        const newActiveId =
          response === items[0]._id ? items[1]._id : items[0]._id;
        const newActive = await tasksApi.getBoardById(newActiveId);

        return { newActive, items: newItems };
      }
      return { newActive: active, items: newItems };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editeBoardOperation = createAsyncThunk(
  'boards/editeBoard',
  async (data, { rejectWithValue, getState }) => {
    try {
      const {
        tasks: {
          boards: { active },
        },
      } = getState();
      const response = await tasksApi.editeBoard(data.boardId, data.body);
      const newActive = {
        ...active,
        title: response.title,
        iconId: response.iconId,
        background: response.background,
      };

      return { newActive, response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
