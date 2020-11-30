import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fromApi from '../api/fromApi';
import { SliceStatus } from '../globals';
import { RootState } from './store';
import { NamedAPIResource } from './types';
import { statusHandler, wrapReduxAsyncHandler } from './utilities';
import Levenshtein from 'fast-levenshtein';
