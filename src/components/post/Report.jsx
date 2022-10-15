import {useState} from "react";
import {BsCheckCircle} from "react-icons/bs";

const Report = ({postID, setShowReport}) => {
  const [showReason, setShowReason] = useState(false);
  const [showSuccesReport, setShowSuccessReport] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const listReasons = [
    "It's spam",
    "Violence or dangerous",
    "Nudity or sexual activity",
    "Bullying or harassment",
    "Scam or fraud",
    "False information",
    "I just don't like it",
  ];
  const handleReportApi = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.access_token}`);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://socialnetwork999.herokuapp.com/api/report/post/${postID}`,
      requestOptions
    )
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      {/* Report modal */}
      <div className="modal visible opacity-100 pointer-events-auto">
        <div className="modal-box w-reportWidth max-w-5xl p-4">
          <ul className="text-center">
            <li className="py-2 border-b border-black/10">
              <button
                onClick={() => setShowReason(true)}
                className="text-base font-semibold text-red"
              >
                Report
              </button>
            </li>
            <li className="py-2 border-b border-black/10">
              <button className="text-base w-full text-black">Hide Post</button>
            </li>
            <li className="py-2 ">
              <button
                onClick={() => setShowReport(false)}
                className="text-base w-full text-black"
              >
                Cancel
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Reason Modal */}
      {showReason ? (
        <div className="modal visible opacity-100 pointer-events-auto bg-transparent">
          <div className="modal-box w-reportWidth relative max-w-5xl p-4">
            <button
              onClick={() => setShowReport(false)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-center mb-2">Report</h3>
            <ul className="text-left">
              <li className="px-1 py-2 w-full border-b border-black/10">
                <h3 className="text-lg font-semibold">
                  Why are you reporting this post?
                </h3>
              </li>
              {listReasons.map((items) => (
                <li className=" border-b border-black/10">
                  <button
                    onClick={() => {
                      setShowSuccessReport(true);
                      setShowReason(false);
                      handleReportApi();
                    }}
                    className="py-2 px-1 text-left w-full text-base hover:bg-black/10"
                  >
                    {items}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}{" "}
      {/* Success Modal*/}
      {showSuccesReport ? (
        <div className="modal visible opacity-100 pointer-events-auto bg-transparent">
          <div className="modal-box w-reportWidth relative max-w-5xl p-4">
            <div className="flex flex-col justify-center items-center gap-4">
              <BsCheckCircle size={"50px"} className="text-green" />
              <h3 className="text-lg font-semibold text-black">
                Thank for letting us know
              </h3>

              <h4 className="text-center text-sm text-grayText">
                Your feedback is important in helping us keep the mangxahoi
                community safe.
              </h4>
              <button
                onClick={() => setShowReport(false)}
                className="w-full px-2 bg-primaryblue text-base text-white rounded py-1 hover:bg-primaryblue/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Report;
