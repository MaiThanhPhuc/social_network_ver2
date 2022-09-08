import { useState, useRef, useEffect } from 'react';
import styles from './Search.module.scss';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import AcountItem from '~/components/AcountItem';
import Popper from '~/components/Popper';
import { useDebounce } from '~/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '~/redux/apiRequets';
import { getSearchClear } from '~/redux/Slice/searchSlice';
const cx = classNames.bind(styles);
const Search = () => {
   const [searchValue, setSearchValue] = useState('');
   const [showResult, setShowResult] = useState(true);
   const inputRef = useRef();
   const debouncedValue = useDebounce(searchValue, 500);
   const handleHideResult = () => {
      setShowResult(false);
   };
   const dispatch = useDispatch();
   const auth = useSelector((state) => state.auth.login?.currentUser);
   const searchResult = useSelector((state) => state.search.search);
   useEffect(() => {
      if (!debouncedValue.trim()) {
         dispatch(getSearchClear());
         return;
      }
      searchUser(auth?.access_token, dispatch, debouncedValue);
   }, [debouncedValue, auth, dispatch]);

   const handleChange = (e) => {
      const searchValue = e.target.value;
      if (!searchValue.startsWith(' ')) {
         setSearchValue(searchValue);
      }
   };
   return (
      <>
         <div>
            <Tippy
               visible={showResult && searchResult.result?.data.length > 0}
               onClickOutside={handleHideResult}
               interactive
               render={(attrs) => (
                  <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                     <Popper>
                        {searchResult.result?.data.map((item) => (
                           <AcountItem key={item.id} data={item} />
                        ))}
                     </Popper>
                  </div>
               )}
            >
               <label htmlFor="search" className={cx('search-wrapper')} tabIndex="1">
                  <span className={cx('icon')}>
                     <Icon icon="majesticons:search-line" />
                  </span>
                  <input
                     ref={inputRef}
                     value={searchValue}
                     id="search"
                     type="text"
                     placeholder="Search"
                     spellCheck={false}
                     onChange={handleChange}
                     onFocus={() => setShowResult(true)}
                  />

                  {!!searchValue.trim() && !searchResult?.isFetching && (
                     <button
                        onClick={() => {
                           setSearchValue('');
                           inputRef.current.focus();
                        }}
                        className={cx('clear')}
                     >
                        <Icon icon="octicon:x-circle-fill-24" />
                     </button>
                  )}

                  {searchResult?.isFetching ? (
                     <span className={cx('loading')}>
                        <Icon icon="eos-icons:bubble-loading" />
                     </span>
                  ) : null}
               </label>
            </Tippy>
         </div>
      </>
   );
};

export default Search;
