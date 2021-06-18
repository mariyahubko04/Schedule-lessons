import React from 'react';

import { AdminProfilePage } from './Admin/AdminProfilePage';
import { StudentOrTeacherProfilePage } from './StudentAndTeacher/StudentAndTeacherProfilePage';

export const ProfilePage = ({ groups, academicStatus, typeLessons }) => {
  const user = sessionStorage.getItem('user');
  const { role } = JSON.parse(user);

  return <div className='profile-page'>
    <div className="header__additional-block" />

    {role === 'admin' && groups && <AdminProfilePage groups={groups} typeLessons={typeLessons}/>}
    {(role === 'student' || role === 'teacher') && groups && <StudentOrTeacherProfilePage groups={groups} academicStatus={academicStatus}/>}
  </div>;
}