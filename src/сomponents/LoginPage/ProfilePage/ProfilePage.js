import React from 'react';

import { AdminProfilePage } from './Admin/AdminProfilePage';
import { StudentOrTeacherProfilePage } from './StudentAndTeacher/StudentAndTeacherProfilePage';

export const ProfilePage = ({ groups, isLogin }) => {
  const user = sessionStorage.getItem('user');
  const { role } = JSON.parse(user);

  return <div className='profile-page'>
    <div className="header__additional-block" />

    {isLogin && role === 'admin' && groups && <AdminProfilePage groups={groups}/>}
    {isLogin && (role === 'student' || role === 'teacher') && groups && <StudentOrTeacherProfilePage groups={groups} />}
  </div>;
}