import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import React from "react";

/* eslint-disable no-unused-vars */
const PropertyList = () => {
  const { data, loading , error } = useFetch("/hotels/countByType");

  const images = [
    "https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
    "https://images.pexels.com/photos/60217/pexels-photo-60217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/271815/pexels-photo-271815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/775690/pexels-photo-775690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data && images.map((img, i) => (
            <div className="pListItem" key={i}>
              <img src={img} alt="" className="pListImg" />
              <div className="pListTitles">
                <h1>{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default PropertyList;
