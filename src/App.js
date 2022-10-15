import MyRoutes from './Routes/index';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
   return (
      <>
         <SkeletonTheme>
            <MyRoutes />
         </SkeletonTheme>

         <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            position="bottom-center"
            newestOnTop={true}
            limit={3}
            style={{ width: '300px', fontSize: '12px' }}
         />
      </>
   );
}

export default App;
