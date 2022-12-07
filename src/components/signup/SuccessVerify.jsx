const SuccessVerify = () => {
   return (
      <>
         <div className="flex justify-center bg-white/70 h-screen">
            <div className="shadow-lg  mt-8 w-[350px] h-[200px] bg-white py-4 px-5 flex flex-col ">
               <span className="text-black font-semibold text-[17px]">Your email has been verified</span>
               <span className="text-black font-normal text-[15px] mt-4">
                  You can now sign in with your new account{' '}
               </span>
               <a href="https://social-network-ver2.vercel.app/" className="text-sm mt-2 hover:underline">
                  Click here to sign in !
               </a>
            </div>
         </div>
      </>
   );
};

export default SuccessVerify;
