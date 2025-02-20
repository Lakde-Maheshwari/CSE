import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const ContactInfo = () => {
  return (
    <div className="border-t border-gray-300 w-full h-60 p-2 mt-2 flex flex-col items-start text-black text-md">
      <div>
        <FontAwesomeIcon icon={faLocationDot} />
        <span className="p-4 m-2">Location</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faEnvelope} />
        <span className="p-4 m-2">Email</span>
      </div>
      <div>
        <FontAwesomeIcon icon={faPhone} />
        <span className="p-4 m-2">Reach out at</span>
      </div>
    </div>
  );
};

export default ContactInfo;
