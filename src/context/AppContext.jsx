import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getFromLocalStorage,saveToLocalStorage } from '../utils/LocalStorage';

const initialState = {
  user: null,
  isLoggedIn: false,
  likedPosts: [],
  connectedProfiles: [],
  savedJobs: []
};

const AppContext = createContext(initialState);

export const ActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  TOGGLE_LIKE_POST: 'TOGGLE_LIKE_POST',
  TOGGLE_CONNECTION: 'TOGGLE_CONNECTION',
  TOGGLE_SAVE_JOB: 'TOGGLE_SAVE_JOB',
  UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE'
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true
      };
    
    case ActionTypes.LOGOUT:
      return {
        ...initialState
      };
    
    case ActionTypes.TOGGLE_LIKE_POST:
      const postId = action.payload;
      const isLiked = state.likedPosts.includes(postId);
      return {
        ...state,
        likedPosts: isLiked 
          ? state.likedPosts.filter(id => id !== postId)
          : [...state.likedPosts, postId]
      };
    
    case ActionTypes.TOGGLE_CONNECTION:
      const personId = action.payload;
      const isConnected = state.connectedProfiles.includes(personId);
      return {
        ...state,
        connectedProfiles: isConnected
          ? state.connectedProfiles.filter(id => id !== personId)
          : [...state.connectedProfiles, personId]
      };
    
    case ActionTypes.TOGGLE_SAVE_JOB:
      const jobId = action.payload;
      const isSaved = state.savedJobs.includes(jobId);
      return {
        ...state,
        savedJobs: isSaved
          ? state.savedJobs.filter(id => id !== jobId)
          : [...state.savedJobs, jobId]
      };
      
    case ActionTypes.UPDATE_USER_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
      
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const loadInitialState = () => {
    try {
      const storedState = {
        user: getFromLocalStorage('user', null),
        isLoggedIn: getFromLocalStorage('isLoggedIn', false) === 'true',
        likedPosts: getFromLocalStorage('likedPosts', []),
        connectedProfiles: getFromLocalStorage('connectedProfiles', []),
        savedJobs: getFromLocalStorage('savedJobs', [])
      };
      return storedState;
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(appReducer, loadInitialState());
  useEffect(() => {
    try {
      saveToLocalStorage('user', state.user);
      saveToLocalStorage('isLoggedIn', state.isLoggedIn.toString());
      saveToLocalStorage('likedPosts', state.likedPosts);
      saveToLocalStorage('connectedProfiles', state.connectedProfiles);
      saveToLocalStorage('savedJobs', state.savedJobs);
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
