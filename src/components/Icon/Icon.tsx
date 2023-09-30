import { FC } from 'react';

export type IconType = 'arrow-down' | 'arrow-up' | 'arrows';

type IconComponent = FC<{ color: string; type: IconType; onClick: () => void }>;

export const Icon: IconComponent = ({ color, onClick, type }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      {type === 'arrows' && (
        <>
          <path d="M3 9l4 -4l4 4m-4 -4v14"></path>
          <path d="M21 15l-4 4l-4 -4m4 4v-14"></path>
        </>
      )}

      {type === 'arrow-down' && <path d="M21 15l-4 4l-4 -4m4 4v-14"></path>}

      {type === 'arrow-up' && <path d="M3 9l4 -4l4 4m-4 -4v14"></path>}
    </svg>
  );
};
