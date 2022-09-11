import Header from '~/layouts/components/Header/Header';

const ProfileLayout = ({ children }) => {
   return (
      <>
         <div>
            <Header />
            <div className="container">
               <div className="content">{children}</div>
            </div>
         </div>
      </>
   );
};

export default ProfileLayout;
