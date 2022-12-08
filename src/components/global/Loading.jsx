const Loading = () => {
   return (
      <div className=" absolute w-messageWidth h-messHeight rounded-lg ">
         <div className=" absolute bg-opacity-25 bg-bodytxt w-messageWidth h-messHeight rounded-lg"></div>
         <div class="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
            <div class="border-t-transparent border-solid animate-spin  rounded-full border-primaryblue border-4 h-11 w-11"></div>
         </div>
      </div>
   );
};

export default Loading;
