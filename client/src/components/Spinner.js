import React from 'react';

export const Spinner = () => {
  return (
    <div className="center-align" style={{ marginTop: '12em' }}>
      <div className="preloader-wrapper big active">
        <div className="spinner-layer" style={{ borderColor: "#E91E63" }}>
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  )
};
