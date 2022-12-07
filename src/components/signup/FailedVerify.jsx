const FailedVerify = () => {
   return (
      <>
         <div className="flex justify-center bg-white/70 h-screen">
            <div className="shadow-lg  mt-8 w-[350px] h-[200px] bg-white py-4 px-5 flex flex-col ">
               <span className="text-black font-semibold text-[17px]">Verifing email failed</span>
               <span className="text-black font-normal text-[15px] mt-4">You can sign up again with this email</span>
               <a href="https://social-network-ver2.vercel.app/" className="text-sm mt-2 hover:underline">
                  Click here to sign up !
               </a>
            </div>
         </div>
      </>
   );
};

export default FailedVerify;
