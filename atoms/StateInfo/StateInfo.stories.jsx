import React from 'react';

import PreviewWindow from '../PreviewWindow';
import { getComponentsMap } from '../../helpers';

import * as icons from '../icons';

import { StateInfo as Component, Button } from '..';

export default {
  title: 'ATOMS/StateInfo',
  component: Component,
  argTypes: {
    icon: {
      options: getComponentsMap(icons),
    },
    children: {
      control: null,
    },
  },
};

const Template = args => (
  <PreviewWindow style={{ backgroundColor: 'var(--aqua-grey)' }} isTall>
    <Component {...args} />
  </PreviewWindow>
);

export const NoAccess = Template.bind({});
NoAccess.args = {
  icon: 'LockIcon',
  title: 'No access',
  subtitle: 'Contact your Administrator for access privileges.',
};

export const NoCameras = Template.bind({});
NoCameras.args = {
  icon: 'CCTVCameraIcon',
  title: 'No cameras',
  subtitle: 'No cameras found',
  children: <Button preset='primary' size='small' label='Add new camera' />,
};

export const NoLocations = Template.bind({});
NoLocations.args = {
  icon: 'LocationIcon',
  title: 'No locations',
  subtitle: 'No locations found',
  children: <Button preset='primary' size='small' label='Add new location' />,
};

export const NoUsers = Template.bind({});
NoUsers.args = {
  icon: 'UserSimpleIcon',
  title: 'No users',
  subtitle: 'No users found',
};

export const NoData = Template.bind({});
NoData.args = {
  icon: 'SearchIcon',
  title: 'No data',
  subtitle: 'No data found',
};

export const NoWorkflows = Template.bind({});
NoWorkflows.args = {
  icon: 'WorkflowIcon',
  title: 'No workflows',
  subtitle: 'No workflows found',
  children: <Button preset='primary' size='small' label='Add ne workflow' />,
};

export const NoKiosk = Template.bind({});
NoKiosk.args = {
  icon: 'MapPinIcon',
  title: 'No kiosk',
  subtitle: 'No kiosk found ',
  children: <Button preset='primary' size='small' label='Add new kiosk' />,
};

export const NoPipelines = Template.bind({});
NoPipelines.args = {
  icon: 'PipelineIcon',
  title: 'No pipelines',
  subtitle: 'No pipelines found',
};

export const NotFound = Template.bind({});
NotFound.args = {
  icon: 'NotFoundIcon',
  title: 'Page not found',
  subtitle: 'Sorry, we can’t fing the page you are looking for',
  children: <Button preset='primary' size='small' label='Back to home page' />,
};
