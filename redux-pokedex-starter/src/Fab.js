import React from 'react';

const Fab = props => {
  return (
    <div className={'fab'} onClick={props.onClick}>
      {props.hidden ?
<span aria-label="add" role="img" className="fab-symbol">➖</span> :
      <span aria-label="add" role="img" className="fab-symbol">➕</span>
      
    }
    </div>
  );
}


export default Fab;
