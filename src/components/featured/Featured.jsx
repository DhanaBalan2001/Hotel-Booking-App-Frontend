import useFetch from '../../hooks/useFetch';
import "./featured.css";
import React from "react";

const Featured = () => {

  /* eslint-disable no-unused-vars */
  const  { data, loading , error } = useFetch("/hotels/countByCity?cities=berlin,madrid,london");

  return (
    <div className="featured">
      {loading ? ("Loading please wait"):(<><div className="featuredItem">
        <img
          src="https://images.pexels.com/photos/3484001/pexels-photo-3484001.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://images.pexels.com/photos/3757144/pexels-photo-3757144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Madrid</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>London</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div></>)}
    </div>
  );
};

export default Featured;
