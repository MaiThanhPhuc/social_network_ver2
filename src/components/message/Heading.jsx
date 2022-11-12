import {BsInfoCircle} from "react-icons/bs";

const Heading = ({guestName}) => {
  return (
    <>
      <div className="heading-main-chat flex justify-between border-b border-black/20 px-6 py-5">
        <div className="guest-name">
          <h1 className="font-semibold text-lg">{guestName}</h1>
        </div>
        <div className="group-btn-left flex text-2xl gap-1 items-center text-black/60">
          <button className="btn-setting text-lg">
            <BsInfoCircle size={25} color={"#000"} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Heading;
