import {
  ADD_RECIPE,
  REMOVE_RECIPE,
  FETCH_RECIPE,
  FETCH_CURRUSERREC,
  EDIT_RECIPE,
  SIGNOUT_USER
} from '../actions/types';

export default (state = {}, action) => {
  switch(action.type) {
    case ADD_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload], uniquerecipes: [...state.uniquerecipes, action.payload] }
    case FETCH_RECIPE:
      return { ...state, recipes: action.payload }
    case FETCH_CURRUSERREC:
      return { ...state, uniquerecipes: action.payload }
    case REMOVE_RECIPE:
      return {
        ...state,
        uniquerecipes: state.uniquerecipes.filter(recipe => recipe._id !== action.payload),
        recipes: state.recipes.filter(recipe => recipe._id !== action.payload) 
      }
    case EDIT_RECIPE:
      return { 
        ...state, 
        uniquerecipes: state.uniquerecipes.filter(ele => ele._id !== action.payload._id).concat([{
          _id: action.payload._id, 
          author: action.payload.author, 
          __v: action.payload.__v, 
          date: action.payload.date, 
          recipeName: action.payload.recipeName, 
          ingredients: action.payload.ingredients,
          steps: action.payload.steps
        }])
      }
    case SIGNOUT_USER:
      return { ...state, uniquerecipes: [] }
    default:
      return state;
  }
}
