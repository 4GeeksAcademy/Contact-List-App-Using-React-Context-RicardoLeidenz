import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faLocationDot, faEnvelope, faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

export const ContactCard = (props) => {

    return (
        <div className="row">
            <div className="col-4">
                <img className="pfpic" src="https://static.wikia.nocookie.net/thebiglebowski/images/7/7e/The_Dude.jpeg/revision/latest/scale-to-width-down/300?cb=20111216183045"></img>
            </div>
            <div className="col-6 text-start">
                <h1>Name: {props.name}</h1>
                <p><FontAwesomeIcon icon={faLocationDot} />Address: {props.address}</p>
                <p><FontAwesomeIcon icon={faPhone} />Phone: {props.phone}</p>
                <p><FontAwesomeIcon icon={faEnvelope} />Email: {props.email}</p>
            </div>
            <div className="col-2">
                <button className="iconButton"><FontAwesomeIcon icon={faPencil} /></button>
                <button className="iconButton"><FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
        </div>
    );
};