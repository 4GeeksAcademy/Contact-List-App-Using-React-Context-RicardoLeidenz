export const initialStore=()=>{
  return{
    fname: "Ricardo",
    lname: "Leidenz",
    contacts:[],
    baseURL: "https://playground.4geeks.com/contact"
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set-fname':
      return{
        ...store,
        fname: action.payload
      }
    case 'set-lname':
      return{
        ...store,
        lname: action.payload
      }
    case 'set-contacts':
      return{
        ...store,
        contacts: action.payload
      }
    default:
      throw Error('Unknown action.');
  }
}    