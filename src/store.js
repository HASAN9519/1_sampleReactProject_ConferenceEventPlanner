// store.js

// Create the Redux store with the configureStore() function from @reduxjs/toolkit
// The store.js file contains a reducer called venue(), imported from venueSlice.js
// This code creates a global Redux store using the @reduxjs/toolkit, configureStore() function so all components in the application can access the state managed by the venueReducer()

import { configureStore } from '@reduxjs/toolkit'
import venueReducer from './venueSlice'
import avReducer from './avSlice'
import mealsReducer from './mealsSlice'


export default configureStore({
  reducer: {
    venue: venueReducer,
    av: avReducer,
    meals: mealsReducer
  },
});
