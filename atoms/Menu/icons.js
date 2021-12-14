import React from 'react';

import {
  MapPinIcon,
  ListIcon,
  UserIcon,
  UsersIcon,
  TagIcon,
  CameraIcon,
  PipelineIcon,
  LogoutIcon,
} from '../icons';

import { MenuItemIcon } from './MenuItems.module.css';

const getIcon = ({ name, size = 'extraSmall' }) => {
  switch (name) {
    case 'mappin':
      return <MapPinIcon className={MenuItemIcon} size={size} />;
    case 'list':
      return <ListIcon className={MenuItemIcon} size={size} />;
    case 'user':
      return <UserIcon className={MenuItemIcon} size={size} />;
    case 'users':
      return <UsersIcon className={MenuItemIcon} size={size} />;
    case 'tag':
      return <TagIcon className={MenuItemIcon} size={size} />;
    case 'camera':
      return <CameraIcon className={MenuItemIcon} size={size} />;
    case 'pipeline':
      return <PipelineIcon className={MenuItemIcon} size={size} />;
    case 'logout':
      return <LogoutIcon className={MenuItemIcon} size={size} />;
    default:
      return null;
  }
};

export default getIcon;
