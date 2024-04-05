import React from "react";

const Time = (props: React.HTMLAttributes<any>) => {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 8V12L15 15"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
      />
      <circle cx="12" cy="12" r="9" stroke="#000000" stroke-width="2" />
    </svg>
  );
};

export default Time;
