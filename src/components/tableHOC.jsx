  import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../index.css';
import './style/table.css';


  import {
  usePagination,
  useSortBy,
  useTable
} from "react-table";
  
  function TableHOC(
    columns,
    data,
    containerClassname,
    heading,
    showPagination,
    button,
    redirect
  ) {
    return function HOC() {
      const options = {
        columns,
        data,
        initialState: {
          pageSize: 6,
        },
      };
  
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        pageCount,
        state: { pageIndex },
        previousPage,
        canNextPage,
        canPreviousPage,
      } = useTable(options, useSortBy, usePagination);
  
      const navigate = useNavigate();
      return (
        <div className='mt-[20px]'>
          <div className='hcontainer'>
          <h2 className="heading">{heading}</h2>
          {(button) && (
            <button onClick={()=> navigate(redirect)}>
           <AddCircleOutlineIcon fontSize='large' color='primary'/>
          </button> 
          ) }
  
         </div>
  
          <table className="table" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      {column.isSorted && (
                        <span>
                          {" "}
                          {column.isSortedDesc ? (
                            <NorthIcon />
                          ) : (
                            <SouthIcon />
                          )}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
  
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
  
          {showPagination && (
            <div className="table-pagination">
              <button disabled={!canPreviousPage} onClick={previousPage}>
                Prev
              </button>
              <span>{`${pageIndex + 1} of ${pageCount}`}</span>
              <button disabled={!canNextPage} style={(!canNextPage)? {backgroudColor:'white'}: null} onClick={nextPage}>
                Next
              </button>
            </div>
          )}
        </div>
      );
    };
  }
  
  export default TableHOC;