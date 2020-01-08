import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';
import axios from 'axios';

//@ sends the request to the database 
export const getItems = () => dispatch => { 
  dispatch(setItemsLoading());  //* dispatch is for the redux store
  axios 
    .get('/api/items') //* sending get request   
    .then(res =>       //* thwn pass the res data into dispatch method (res is the data given from the backend)
      dispatch({       //* dspatch is a way through which we tell the reducer what to do.
          type: GET_ITEMS,  //* activate case GET_ITEMS from within itemReducer
          payload: res.data //* we pass the res.data (the data given to us by the database) into the reducer
      })
    )
};

export const addItem = item => dispatch => {
  axios
    .post('api/items', item) // we added proxy in package.json so we don't need to add 'loaclhost:5000' before the path
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
    })
  )
};

export const deleteItem = (id) => dispatch => { //* passing though id and dispatch method. 
  axios
    .delete(`/api/items/${id}`) //* sends a delete request
    .then(res =>                //* then pass the response(data) to dispatch method
      dispatch({                //* handle what to send to the reducer 
        type: DELETE_ITEM,      //* activate case DELETE_ITEM from within in itemReducer
        payload:id              //* this time we don't do anything with the res(data from server) but just pass in the id of the item we wanted to delete 
    })
  )
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  }
};
