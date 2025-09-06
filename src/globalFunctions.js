// Fetch to get full contact list
export const getContacts = (baseURL,dispatch) => {
    fetch(baseURL + "/agendas/RicardoLeidenz/contacts")
    .then( (response)=> response.json())
    .then(
        (data) =>{
            dispatch({
                type: "set-contacts",
                payload: data.contacts
            })
        }
    )
}