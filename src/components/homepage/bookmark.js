import React from "react";

export default function Bookmark(props) {
  const handleClick = (url) => {
    // TODO Add noopener and noreferrer tags
    window.open(url, "_blank").focus();
  };
  return (
    <div className="bookmark-wrapper" onClick={() => handleClick(props.url)}>
      <img src={props.thumbnail} width="80" height="80"></img>
      <small>{props.name}</small>
    </div>
  );
}