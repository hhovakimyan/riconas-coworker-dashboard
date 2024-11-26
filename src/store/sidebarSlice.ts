import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { VIEW_TYPE_BLOW_IN } from 'constants/main';
import { SidebarFilterProps, ViewType } from 'types/sidebar';

interface SidebarSliceProps {
  filter: SidebarFilterProps;
  viewType: ViewType;
}

const initialState: SidebarSliceProps = {
  filter: {
    clientId: undefined,
    projectId: undefined,
    subprojectId: undefined,
    nvtId: undefined,
  },
  viewType: VIEW_TYPE_BLOW_IN,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setFilterClientId: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      filter: {
        ...state.filter,
        clientId: action.payload,
      },
    }),
    setFilterProjectId: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      filter: {
        ...state.filter,
        projectId: action.payload,
      },
    }),
    setFilterSubprojectId: (
      state,
      action: PayloadAction<string | undefined>,
    ) => ({
      ...state,
      filter: {
        ...state.filter,
        subprojectId: action.payload,
      },
    }),
    setFilterNvtId: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      filter: {
        ...state.filter,
        nvtId: action.payload,
      },
    }),
    setViewType: (state, action: PayloadAction<ViewType>) => ({
      ...state,
      viewType: action.payload,
    }),
  },
});

export const {
  setFilterClientId,
  setFilterProjectId,
  setFilterSubprojectId,
  setFilterNvtId,
  setViewType,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
