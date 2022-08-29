import { useState, useRef, useEffect } from 'react';
import styles from './Search.module.scss';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Icon } from '@iconify/react';
import AcountItem from '~/components/AcountItem';
import Popper from '~/components/Popper';
// import { useDebounce } from '~/hooks';
// import * as searchService from '~/services/searchService';
const cx = classNames.bind(styles);
const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    // const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    // const debounced = useDebounce(searchValue, 500);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 0);
    }, []);
    const handleHideResult = () => {
        setShowResult(false);
    };

    // useEffect(() => {
    //     setLoading(true);
    //     const fetchApi = async () => {
    //         setLoading(true);
    //         const result = await searchService.search(debounced);
    //         setSearchResult(result);
    //         setLoading(false);
    //     };
    //     fetchApi();
    // }, [debounced]);

    return (
        <>
            <Tippy
                visible={showResult && searchResult.length > 0}
                onClickOutside={handleHideResult}
                interactive
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Popper>
                            <AcountItem dataSearch />
                            <AcountItem />
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
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && (
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
                    {/* {loading ? (
                        <span className={cx('loading')}>
                            <Icon icon="eos-icons:bubble-loading" />
                        </span>
                    ) : null} */}
                </label>
            </Tippy>
        </>
    );
};

export default Search;
