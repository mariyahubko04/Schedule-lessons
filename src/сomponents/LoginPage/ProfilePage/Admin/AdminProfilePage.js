import React from 'react';

import { MenuBlock } from './MenuBlock';
import { SheduleEditBlock } from './SheduleEditBlock';

export const AdminProfilePage = () => {
  return <div className='profile'>
    <MenuBlock />

    <SheduleEditBlock />
  </div>
};