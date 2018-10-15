import React from 'react';
import { Pagination } from 'reactstrap';
import  SkPaginationItem  from './skPaginationItem.jsx';

const SkPagination = (props) => {
  let maxItems = props.totalPage > props.paginationMax ? props.paginationMax : props.totalPage;

  return (
    <Pagination aria-label="Page navigation">
      {
        props.pageItems.map((x) => <SkPaginationItem key={x} 
          pageNum={x} 
          currentPage={props.currentPage}
          handleClickPageNumber={props.handleClickPageNumber}/>)
      }
    </Pagination>
  )
};


export default SkPagination;