import React from 'react';

interface CertificatesProps {
  certificates: string[];
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
  return (
    <div className="certificates flex items-center justify-center">
      <h1 className='font-thin text-[150px]'>3</h1>
    </div>
  );
};

export default Certificates;
