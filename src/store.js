export const initialStore=()=>{
  return{
    baseURL: "https://playground.4geeks.com/contact",
    contacts:[], //Full list of contacts
    selectedContact: { //Contact being edited
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
    //Load/Update list of contacts
    case 'set-contacts':
      return{
        ...store,
        contacts: action.payload
      }
    //Select contact to edit
    case 'select-contact':
      return{
        ...store,
        selectedContact: action.payload
      }
    default:
      throw Error('Unknown action.');
  }
}