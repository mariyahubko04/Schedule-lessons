import React, { useState } from 'react';

import { MenuBlock } from "./MenuBlock";
import { SheduleEditBlock } from "../Admin/AdminProfilePageComponents/SheduleEditBlock";
import { BotsPage } from "../ProfilePageComponents/BotsPage";
import { UserInfo } from "../ProfilePageComponents/UserInfo";

export const StudentOrTeacherProfilePage = ({ groups }) => {
  const [activeMenu, setActiveMenu] = useState(1);

  return (
    <div className="profile profile-student">
      <MenuBlock activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {activeMenu === 1 && <BotsPage />}
      {activeMenu === 2 && <UserInfo />}
      {activeMenu === 3 && groups && <SheduleEditBlock groups={groups} />}
    </div>
  );
};