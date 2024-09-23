import {
    GET_SESSION_SUCCESS,SESSION_LOADING,GET_SESSION_FAILD
  } from '../../constants/actionTypes';
  
  const sessionReducer = (prevState,{type,payload})=>{
      
    switch (type) {
      case SESSION_LOADING:
        return{
          ...prevState,
          isLoading:true,
          error:null
        }
     case GET_SESSION_SUCCESS:
       return{
         ...prevState,
         data:payload,
         isLoading:false,
         error:null
       }
     case GET_SESSION_FAILD:
        return{
          ...prevState,
          isLoading:false,
          data:[],
          error:"Session Load Faild.Try Again.."
        }
      default:
       console.log('Default')
    }
  }
  
  export default sessionReducer;