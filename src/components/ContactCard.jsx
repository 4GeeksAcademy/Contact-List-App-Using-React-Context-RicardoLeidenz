import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import useGlobalReducer from "../hooks/useGlobalReducer"; 

export const ContactCard = (props) => {
    const {store, dispatch} =useGlobalReducer()

	const getContacts = () => {
		fetch(store.baseURL + "/agendas/RicardoLeidenz/contacts")
		.then( (response)=> response.json())
		.then(
			(data) =>{
				dispatch({
					type: "set-contacts",
					payload: data.contacts
				})
				setContacts(store.contacts)
			}
		)
	}
    const deleteContact = async (contactID) => {
        let options = {
            method: "DELETE"
        }
        try{
            console.log("Deleted ToDo:",contactID)
            await fetch(store.baseURL+"/agendas/RicardoLeidenz/contacts/"+contactID, options)
            .then(() => {
                console.log("Deleted tak succesfully");
                getContacts()
            })
        }
        catch(error){
            console.log("Error deleting contact:",error)
        }
    }

    return (
        <div className="row">
            <div className="col-4">
                <img className="pfpic" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"></img>
            </div>
            <div className="col-6 text-start">
                <h1>Name: {props.name}</h1>
                <p><FontAwesomeIcon icon={faLocationDot} />Address: {props.address}</p>
                <p><FontAwesomeIcon icon={faPhone} />Phone: {props.phone}</p>
                <p><FontAwesomeIcon icon={faEnvelope} />Email: {props.email}</p>
            </div>
            <div className="col-2">
                <button className="iconButton"><FontAwesomeIcon icon={faPencil} /></button>
                <button className="iconButton"><FontAwesomeIcon icon={faTrashCan} onClick={()=>deleteContact(props.contactID)}/></button>
            </div>
        </div>
    );
};