import React from 'react';

export default function useModalToggle() {
  const [state, setState] = React.useState(false);

  const setOn = () => {
    setState(true);
  };

  const setOff = () => {
    setState(false);
  };

  return { state, setOn, setOff };
}
