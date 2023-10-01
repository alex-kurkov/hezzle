import { FC } from 'react';

export type IconType = 'arrow-down' | 'arrow-up' | 'arrows' | 'moon' | 'sun';

type IconComponent = FC<{ color: string; type: IconType; onClick?: () => void }>;

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

      {type === 'moon' && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
          <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
          <path d="M19 11h2m-1 -1v2"></path>
        </>
      )}
      {type === 'sun' && (
        <>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
        </>
      )}
    </svg>
  );
};
