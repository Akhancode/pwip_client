import React, { useEffect, useState } from "react";
import "./PaginationBar.css";

import Pagination from "react-paginate";
import axios from "axios";
import ReactPaginate from "react-paginate";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const PaginationBar = (props) => {
  const { page, setPage } = props;

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };

  return (
    <div>
      <ReactPaginate
        previousLabel={<KeyboardArrowLeftIcon />}
        nextLabel={<KeyboardArrowRightIcon />}
        breakLabel={"..."}
        pageCount={15}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"pageItem"}
        pageLinkClassName={"pageLink"}
        previousLinkClassName={"pageLink"}
        nextClassName={"pageItem"}
        nextLinkClassName={"pageLink"}
        breakClassName={"pageItem"}
        breakLinkClassName={"pageLink"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default PaginationBar;
