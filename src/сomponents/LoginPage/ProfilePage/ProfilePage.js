import React from 'react';

import { AdminProfilePage } from './Admin/AdminProfilePage';
import { StudentOrTeacherProfilePage } from './StudentAndTeacher/StudentAndTeacherProfilePage';

export const ProfilePage = ({ groups }) => {
  const user = sessionStorage.getItem('user');
  const { role } = JSON.parse(user);

  return <div className='profile-page'>
    <div className="header__additional-block" />

    {role === 'admin' && <AdminProfilePage groups={groups}/>}
    {(role === 'student' || role === 'teacher') && groups && <StudentOrTeacherProfilePage groups={groups} />}
  </div>;
}