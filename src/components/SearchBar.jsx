import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "../svg/SearchIcon";
import XIcon from "../svg/XIcon";
import BackSpaceIcon from "../svg/BackSpaceIcon";
// Data gia to search box
import PeopleData from "../DummyData.json";

export default function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");
  const [openSearchBarStatus, setOpenSearchBarStatus] = useState(false);

  const openSearchBar = (e) => {
    e.preventDefault();
    // kano set to Status sto aditheto apo oti einai !openSearchBarStatus
    setOpenSearchBarStatus(true);
    console.log("openSearchBarStatus: " + openSearchBarStatus);
  };

  // Apo edo kai kato einai ta data pou thelo gia to filtered resutls

  const [filteredData, setFilteredData] = useState([]);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
    // apo edo kai kato eiani to logic gia to filter

    const newFilter = PeopleData.filter((value) => {
      return value.username.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (searchInput === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const closeSearchBar = (e) => {
    e.preventDefault();
    // kano set to Status sto aditheto apo oti einai
    setOpenSearchBarStatus(false);
    console.log("openSearchBarStatus: " + openSearchBarStatus);
    // clear text
    setSearchInput("");

    // gia to drop down

    setFilteredData([]);
  };

  const clearInputBoxHelper = () => {
    setSearchInput("");
    console.log("BackSpace Clicked");
    // gia to drop down

    setFilteredData([]);
  };

  return (
    <>
      {/* // thelo pada na exo to search class kai to search open class mono an to
      "openSearchBarStatus" einai true */}
      <div className={openSearchBarStatus ? "search search-open" : "search"}>
        <SearchIcon
          className={"search__icon"}
          width={95}
          // to ektelo mesa sto svg
          openCloseSearchBar={openSearchBar}
        />
        {/* to strogkilo ginete apo to input afto dinei to sxima */}
        <input
          type="text"
          className="search__input"
          autoFocus
          placeholder="Search....."
          value={searchInput}
          onChange={searchInputHandler}
        />
        <XIcon
          className={"search__close"}
          width={100}
          // to ektelo mesa sto svg
          openCloseSearchBar={closeSearchBar}
        />
        <BackSpaceIcon
          className={
            openSearchBarStatus ? "search__delete_open" : "search__delete_close"
          }
          width={100}
          clearInputBoxHelper={clearInputBoxHelper}
        />
      </div>
      {/* // APO edo kai kato eiani ta results gia to search box !!! Apla dixno to result mono an exo data na dikso */}
      <div
        className={
          filteredData.length !== 0
            ? "dataResult dataResult_open"
            : "dataResult "
        }
      >
        {filteredData.map((value, key) => {
          return (
            <div className="data_result_row" key={key}>
              <div className="avatar">
                <img src={value.link} alt="persons" />
              </div>
              <div>{value.username}</div>
              <p className="FollowStatus">Follow</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
