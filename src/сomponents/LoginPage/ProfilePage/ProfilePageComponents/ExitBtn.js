import React from "react";
import { useHistory } from "react-router-dom";

export const ExitBtn = () => {
  const history = useHistory();

  const handleExit = () => {
    sessionStorage.removeItem('user');
    history.push('/');
  };

  return (
    <div className="display-flex exit-btn" onClick={handleExit}>
      Вийти з облікового запису
      <img src='images/exit.png' />
    </div>
  );
};