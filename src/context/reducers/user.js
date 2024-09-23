import {
    GET_USER_SUCCESS,USER_LOADING,GET_USER_FAILD
  } from '../../constants/actionTypes';
  
  const userReducer = (prevState,{type,payload})=>{
      
    switch (type) {
      case USER_LOADING:
        return{
          ...prevState,
          isLoading:true,
          error:null
        }
     case GET_USER_SUCCESS:
       return{
         ...prevState,
         user:payload,
         isLoading:false,
         error:null
       }
     case GET_USER_FAILD:
        return{
          ...prevState,
          isLoading:false,
          user:{},
          error:"User Load Faild.Try Again.."
        }
      default:
       console.log('Default')
    }
  }
  
  export default userReducer;