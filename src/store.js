export const initialStore=()=>{
  return{
    contacts:[],
    baseURL: "https://playground.4geeks.com/contact"
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set-contacts':
      return{
        ...store,
        contacts: action.payload
      }
    default:
      throw Error('Unknown action.');
  }
}    