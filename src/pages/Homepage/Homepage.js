import React from "react";
import Signin from "../../components/signin/Signin";
function Homepage() {
  return (
    <div className="bg-gray h-screen">
      <div className="pt-pTopNav bg-gradient-to-br from-primaryblue/30 to-white w-full h-full flex">
        <div className="flex-1 flex justify-center items-center">
          <h1 className=" text-black font-roboto text-4xl font-semibold mb-16">
            The simple way to <br />
            connect and look back <br />
            on moments forever.
          </h1>
        </div>{" "}
        <Signin />
        <div
          className=" bg-no-repeat bg-cover h-full flex-1 "
          style={{
            backgroundImage:
              "url(https://i.ibb.co/vLsw5sT/undraw-Social-update-re-xhjr.png)",
            opacity: "60%",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Homepage;
