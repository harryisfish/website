'use client';

import { BallTriangle } from 'react-loader-spinner';
import { useTheme } from 'next-themes';

interface LoadingProps {
  msg?: string;
}

const Loading: React.FC<LoadingProps> = ({ msg }) => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color={theme === 'dark' ? '#fff' : '#000'}
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      {msg && <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">{msg}</p>}
    </div>
  );
};

export default Loading;
