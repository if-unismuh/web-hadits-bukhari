import React ,{useEffect,useState} from 'react';
import { useLocation } from 'react-router';
import HaditsComp from '../component/HaditsComp';
import axios from "axios";
import LoadingSpinner from '../component/LoadingSpinner';

const SearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const pageSize = 10;

  const location = useLocation();
  
  const getResult = () => {
    setIsLoading(true)
    axios({
        method: 'post',
        url: `http://localhost:3001/search`,
        data: {
          query: location.state
        }
      }).then((response) => {
        // handle success
        console.log(response.data.data)
       setData(response.data.data)
       setTotalData(response.data.data.length)
        setIsLoading(false)
    })
  }

  const totalPages = Math.ceil(totalData / pageSize);

  const goToPage = (page) => {
  setCurrentPage(page);
  };

  const goToPreviousPage = () => {
  setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
  
    buttons.push(
      <li class="page-item" key="previous">
        <button className="page-link green" onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
      </li>
    );
  
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <li className={`page-item ${i === currentPage ? 'active' : ''}`} key={i}>
          <button class="page-link green"  onClick={() => goToPage(i)} disabled={i === currentPage}>
            {i}
          </button>
        </li>
      );
    }
  
    buttons.push(
      <li class="page-item" key="next">
        <button class="page-link green"  onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </li>
    );
  
    return (
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {buttons}
        </ul>
      </nav>
    );
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Get the data to be displayed on the current page
  const paginatedData = data.slice(startIndex, endIndex);


    useEffect(() => {
      getResult()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location])

      return (
        <React.Fragment>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
           
            <div className="alert">
              <h6>Hasil pencarian... {totalData} data </h6>
            </div>
            
            { renderPaginationButtons()}

            { paginatedData.length < 1 ? <h1>Tidak Ada hasil ditemukan</h1> :      
                paginatedData.map((item, i) => (
                  <HaditsComp key={i} data={item} />
                ))         
            }

            {renderPaginationButtons()}
          </React.Fragment>
        )}
      </React.Fragment>
      
      );
  } 


export default SearchResult;
