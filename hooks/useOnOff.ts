import React from 'react';

export default function useOnOff() {
  const [state, setState] = React.useState(false);

  const setOn = () => {
    setState(true);
  };

  const setOff = () => {
    setState(false);
  };

  return { state, setOn, setOff };
}
