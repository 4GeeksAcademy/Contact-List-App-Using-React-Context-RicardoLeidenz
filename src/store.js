export const initialStore=()=>{
  return{
    contacts:[],
    baseURL: "https://playground.4geeks.com/contact",
    selectedContact: {
        id: "",
        name: "",
        phone: "",
        email: "",
        address: ""
    }

  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set-contacts':
      return{
        ...store,
        contacts: action.payload
      }
    case 'select-contact':
      return{
        ...store,
        selectedContact: action.payload
      }
    default:
      throw Error('Unknown action.');
  }
}    