import * as React from "react";

function IconCross(props) {
  return (
    <svg
      viewBox="0 0 21 21"
      fill="white"
      height="1em"
      width="1em"
      {...props}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 15.5l-10-10zM15.5 5.5l-10 10" />
      </g>
    </svg>
  );
}

export default IconCross;

