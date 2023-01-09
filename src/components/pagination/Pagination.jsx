import { useEffect, useState } from 'react';
import './pagination.css';

export default function Pagination({
  totalPages,
  setCurrentPage,
  currentNotes,
  totalNotes,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const [pageNow, setPageNow] = useState(1);
  const pageNumberLimit = 5;
  const [maxPage, setMaxPage] = useState(5);
  const [minPage, setMinPage] = useState(0);
  const renderPageLists = pageNumbers.map((page) => {
    if (page <= maxPage && page > minPage) {
      return (
        <li key={page}>
          <button
            className={`${
              pageNow === page
                ? 'page-button page-button-active '
                : 'page-button'
            }`}
            onClick={() => setPageNow(page)}
          >
            {page}{' '}
          </button>{' '}
        </li>
      );
    }
  });

  const handleIncrement = () => {
    const next = pageNow === totalPages ? pageNow : pageNow + 1;
    setPageNow(next);
    if (pageNow + 1 > maxPage) {
      setMaxPage(maxPage + pageNumberLimit);
      setMinPage(minPage + pageNumberLimit);
    }
  };

  const handleDecrement = () => {
    const prev = pageNow === 1 ? pageNow : pageNow - 1;
    setPageNow(prev);
    if ((pageNow - 1) % pageNumberLimit === 0) {
      setMaxPage(maxPage - pageNumberLimit);
      setMinPage(minPage - pageNumberLimit);
    }
  };

  useEffect(() => {
    setCurrentPage(pageNow);
  }, [pageNow, setCurrentPage]);

  return (
    <div className='pagination'>
      <div className='leftpart'>
        <p>
          {' '}
          Showing <b>{currentNotes.length} </b> out of <b>{totalNotes} </b>{' '}
          notes
        </p>{' '}
      </div>{' '}
      <div className='rightpart'>
        <ul className='page-list'>
          <li>
            <button
              className={`${
                pageNow === 1
                  ? 'function-button function-button-disabled'
                  : 'function-button'
              }`}
              disabled={pageNow === 1 ? true : false}
              onClick={handleDecrement}
            >
              {' '}
              Previous{' '}
            </button>{' '}
          </li>{' '}
          {pageNow !== 1 && (
            <li>
              <button className='page-button' onClick={handleDecrement}>
                {' '}
                ...{' '}
              </button>{' '}
            </li>
          )}{' '}
          {renderPageLists}{' '}
          {pageNow !== totalPages && (
            <li>
              <button className='page-button' onClick={handleIncrement}>
                {' '}
                ...{' '}
              </button>{' '}
            </li>
          )}{' '}
          <li>
            <button
              className={`${
                pageNow === pageNumbers.length
                  ? 'function-button function-button-disabled'
                  : 'function-button'
              }`}
              onClick={handleIncrement}
            >
              {' '}
              Next{' '}
            </button>{' '}
          </li>{' '}
        </ul>{' '}
      </div>{' '}
    </div>
  );
}
