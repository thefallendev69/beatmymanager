import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Gender = 'male' | 'female' | 'trans';

interface FlowState {
  fileName: string | null;
  previewUrl: string | null;
  blurScore: number | null;
  isBlurry: boolean | null;
  personConfidence: number | null;
  isPerson: boolean | null;
  validationStatus: 'idle' | 'running' | 'done' | 'error';
  gender: Gender | null;
  error: string | null;
}

const initialState: FlowState = {
  fileName: null,
  previewUrl: null,
  blurScore: null,
  isBlurry: null,
  personConfidence: null,
  isPerson: null,
  validationStatus: 'idle',
  gender: null,
  error: null,
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<{ fileName: string; previewUrl: string }>) {
      state.fileName = action.payload.fileName;
      state.previewUrl = action.payload.previewUrl;
      state.validationStatus = 'idle';
      state.blurScore = null;
      state.isBlurry = null;
      state.personConfidence = null;
      state.isPerson = null;
      state.error = null;
    },
    setValidationRunning(state) {
      state.validationStatus = 'running';
      state.error = null;
    },
    setValidationResult(
      state,
      action: PayloadAction<{
        blurScore: number;
        isBlurry: boolean;
        personConfidence: number;
        isPerson: boolean;
      }>,
    ) {
      state.validationStatus = 'done';
      state.blurScore = action.payload.blurScore;
      state.isBlurry = action.payload.isBlurry;
      state.personConfidence = action.payload.personConfidence;
      state.isPerson = action.payload.isPerson;
      state.error = null;
    },
    setValidationError(state, action: PayloadAction<string>) {
      state.validationStatus = 'error';
      state.error = action.payload;
    },
    setGender(state, action: PayloadAction<Gender>) {
      state.gender = action.payload;
    },
  },
});

export const { setImage, setValidationRunning, setValidationResult, setValidationError, setGender } =
  flowSlice.actions;

export default flowSlice.reducer;
