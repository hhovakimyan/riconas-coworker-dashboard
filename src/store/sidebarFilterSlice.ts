import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarFilterProps {
  clientId?: string;
  projectId?: string;
  subprojectId?: string;
  nvtId?: string;
}

const initialState: SidebarFilterProps = {
  clientId: undefined,
  projectId: undefined,
  subprojectId: undefined,
  nvtId: undefined,
};

const sidebarFilterSlice = createSlice({
  name: 'sidebarFilter',
  initialState,
  reducers: {
    setClientId: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      clientId: action.payload,
    }),
    setProjectId: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      projectId: action.payload,
    }),
    setSubprojectId: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      subprojectId: action.payload,
    }),
    setNvtId: (state, action: PayloadAction<string | undefined>) => ({
      ...state,
      nvtId: action.payload,
    }),
  },
});

export const { setClientId, setProjectId, setSubprojectId, setNvtId } =
  sidebarFilterSlice.actions;

export default sidebarFilterSlice.reducer;
