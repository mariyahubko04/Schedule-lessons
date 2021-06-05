import React from 'react';

import { AdminProfilePage } from './Admin/AdminProfilePage';
import { StudentProfilePage } from './Student/StudentProfilePage';
import { TeacherProfilePage } from './Teacher/TeacherProfilePage';

export const ProfilePage = ({ groups }) => {
  const user = sessionStorage.getItem('user');
  const { role } = JSON.parse(user);

  return <div className='profile-page'>
    <div className="header__additional-block" />

    {role === 'admin' && <AdminProfilePage groups={groups}/>}
    {role === 'student' && <StudentProfilePage />}
    {role === 'teacher' && <TeacherProfilePage />}
  </div>;
}