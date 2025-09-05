import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 
import { useState, useEffect } from "react"

export const NewContact = () => {
    const {store, dispatch} =useGlobalReducer();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const getContacts = () => {
        fetch(store.baseURL + "/agendas/RicardoLeidenz/contacts")
        .then( (response)=> response.json())
        .then(
            (data) =>{
                dispatch({
                    type: "set-contacts",
                    payload: data.contacts
                });
            }
        )
    }

    const postContact = async () => {
        if ((name != "")&&(phone != "")&&(address != "")&&(email != "")){
            let options = {
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify(
                    {
                        "name": name,
                        "phone": phone,
                        "email": email,
                        "address": address
                    }
                )
            }
            await fetch(store.baseURL + "/agendas/RicardoLeidenz/contacts",options)
            .then( (response)=> response.json())
            .then(
                (data) =>{
                    console.log("New Contact posted: ", data);
                    getContacts();
                    setName("");
                    setPhone("");
                    setAddress("");
                    setEmail("");
                    navigate('/')
                }
            )
        }
    }

    useEffect(
        () => {
            getContacts();
        },[]
    )
    return (
        <div className="text-center mt-5">
            <form class="needs-validation" novalidate>
                <input 
                    type="text" 
                    placeholder="Enter Full Name" 
                    onChange={e => setName(e.target.value)} 
                    value={name} 
                    required
                />
                <input 
                    type="text" 
                    placeholder="Enter Address" 
                    onChange={e => setAddress(e.target.value)} 
                    value={address} 
                    required
                />
                <input 
                    type="tel" 
                    placeholder="(xxx)xxx-xxxxx" 
                    onChange={e => setPhone(e.target.value)} 
                    value={phone} 
                    required
                />
                <input 
                    type="email" 
                    placeholder="Sample@email.com" 
                    onChange={e => setEmail(e.target.value)} 
                    value={email} 
                    required
                />
                <button type="button" onClick={()=>postContact()} className="btn btn-warning">Submit Contact</button>
            </form>


            <form class="needs-validation" novalidate>
                <div class="form-row">
                    <div class="col-md-4 mb-3">
                        <label for="validationTooltip01">Full Name</label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="validationTooltip01" 
                            placeholder="First name" 
                            value="Mark" 
                            required/>
                            
                        <div class="valid-tooltip">
                            Looks good!
                        </div>
                    </div>
                    
                    <div class="col-md-4 mb-3">
                    <label for="validationTooltipUsername">Username</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                        <span class="input-group-text" id="validationTooltipUsernamePrepend">@</span>
                        </div>
                        <input type="text" class="form-control" id="validationTooltipUsername" placeholder="Username" aria-describedby="validationTooltipUsernamePrepend" required/>
                        <div class="invalid-tooltip">
                        Please choose a unique and valid username.
                        </div>
                    </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-md-6 mb-3">
                    <label for="validationTooltip03">City</label>
                    <input type="text" class="form-control" id="validationTooltip03" placeholder="City" required/>
                    <div class="invalid-tooltip">
                        Please provide a valid city.
                    </div>
                    </div>
                    <div class="col-md-3 mb-3">
                    <label for="validationTooltip04">State</label>
                    <input type="text" class="form-control" id="validationTooltip04" placeholder="State" required/>
                    <div class="invalid-tooltip">
                        Please provide a valid state.
                    </div>
                    </div>
                    <div class="col-md-3 mb-3">
                    <label for="validationTooltip05">Zip</label>
                    <input type="text" class="form-control" id="validationTooltip05" placeholder="Zip" required/>
                    <div class="invalid-tooltip">
                        Please provide a valid zip.
                    </div>
                    </div>
                </div>
                <button class="btn btn-primary">Submit form</button>
            </form>
        </div>
    );
}; 