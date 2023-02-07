import React, { useEffect, useState } from "react";
import "./LoggerSearchPage.css";
import PaginationBar from "../components/PaginationBar/PaginationBar";
import axios from "axios";
import SearchBar from "../components/SearchBar/SearchBar";




const LoggerSearchPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(`${process.env.REACT_APP_MY_BASEURL}/loggerHome/all_logs?`);
  const [sortUrl, setSortUrl] = useState(null);
  const [status, setStatus] = useState(null);
  const [totalItem, setTotalItem] = useState(0);

  const [search, setSearch] = useState({
    logId: null,
    actionType: null,
    applicationType: null,
    applicationId: null,
    fromDate: undefined,
    toDate: "",
  });

  const sortFunction = async (value) => {
    setSortUrl(null);
    //change status : loading started
    setStatus("loading");
    //setSort url with appending sort query
    setSortUrl(`${url}sort=${value}&`);
    const result = await axios.get(`${url}sort=${value}&`);

    //update data with new api call
    setData(result.data.logs);
    setTotalItem(result.data.totalItem)

    //change status : loading finished
    setStatus(null);
    console.log(result.data.length);
  };

  const getDataByPage = async (currentPage) => {
    setStatus("loading");
    let result;

    if (sortUrl) {
      console.log("taking sorted url");
      result = await axios.get(`${sortUrl}page=${currentPage}`);
    } else {
      console.log("taking url");
      result = await axios.get(`${url}page=${currentPage}`);
    }
    setData(result.data.logs);
    setTotalItem(result.data.totalItem);
    setStatus(null);
    console.log(url);
  };
  useEffect(() => {
    getDataByPage(page);
  }, [page]);


//  useEffect :  render on change in url
  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      const result = await axios.get(url);

      setData(result.data.logs);
      setTotalItem(result.data.totalItem);
      setStatus(null);
    };
    fetchData();
  }, [url]);

  return (
    <div className="LoggerSearchPageContainer">
      <SearchBar
        search={search}
        setSearch={setSearch}
        url={url}
        setUrl={setUrl}
      />
      <table className={"tableData" + ` ` + `${status}`}>
        <tr>
          <th className="thead">
            <label htmlFor="">LogID</label>
            <span onClick={() => sortFunction("logID")} className="sort">
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Application Type</label>
            <span
              onClick={() => sortFunction("applicationType")}
              className="sort"
            >
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Application ID </label>
            <span
              onClick={() => sortFunction("applicationId")}
              className="sort"
            >
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Action</label>
            <span onClick={() => sortFunction("actionType")} className="sort">
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Action Details</label>
            <span onClick={() => sortFunction("actionType")} className="sort">
              ⬇
            </span>
          </th>
          <th className="thead">
            <label htmlFor="">Date:Time</label>
            <span onClick={() => sortFunction("latest")} className="sort">
              ⬇
            </span>
          </th>
        </tr>

        {data?.map((log) => {
          const logId = log.logId;
          const AppType = log.applicationType;
          const AppId = log.applicationId;
          const Action = log.actionType;
          const Action_Details = log.actionType;
          const Date_Time = log.creationTimestamp;

          return (
            <tr key={logId} className="tRowData">
              <td>{logId}</td>
              <td>{AppType || <span className="notFound">-/-</span>}</td>
              <td>{AppId || <span className="notFound">-/-</span>}</td>
              <td>{Action || <span className="notFound">-/-</span>}</td>
              <td>{Action_Details || <span className="notFound">-/-</span>}</td>
              <td>{Date_Time || <span className="notFound">-/-</span>}</td>
            </tr>
          );
        })}
      </table>
      <PaginationBar page={page} setPage={setPage} totalItem={totalItem} />
    </div>
  );
};

export default LoggerSearchPage;
