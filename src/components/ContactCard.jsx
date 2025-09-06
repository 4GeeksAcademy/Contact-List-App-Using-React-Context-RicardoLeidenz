import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import{useNavigate } from "react-router-dom";
import { getContacts } from "../globalFunctions";

export const ContactCard = (props) => {
    const {store, dispatch} =useGlobalReducer()
	const navigate = useNavigate()
    
    //Deletes the contact from the API
    const deleteContact = async (contactID) => {
        let options = {
            method: "DELETE"
        }
        try{
            console.log("Deleted ToDo:",contactID)
            await fetch(store.baseURL+"/agendas/RicardoLeidenz/contacts/"+contactID, options)
            .then(() => {
                console.log("Deleted tak succesfully");
                //Calls getContacts to update the API after deleting so it refreshes
			    getContacts(store.baseURL,dispatch);
            })
        }
        catch(error){
            console.log("Error deleting contact:",error);
        }
    }

    const editContact = () => {
        //Saves the current contact in the store to show same info in the newContact page to edit
        dispatch({
            type: "select-contact",
            payload: {
                id: props.contactID,
                name: props.name,
                phone: props.phone,
                email: props.email,
                address: props.address
            }
        })
        navigate("/contact");
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
                <button className="iconButton"><FontAwesomeIcon icon={faPencil} onClick={()=>editContact()}/></button>
                <button className="iconButton"><FontAwesomeIcon icon={faTrashCan} onClick={()=>deleteContact(props.contactID)}/></button>
            </div>
        </div>
    );
};