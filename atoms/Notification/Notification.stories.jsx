import * as React from 'react';

import PreviewWindow from '../PreviewWindow';
import { getJSMapKeysArray } from '../../cssMaps';
import { notificationPresetsMap } from './Notification';
import { Notification as Component, Button } from '..';

export default {
  title: 'ATOMS/Notification',
  component: Component,
  argTypes: {
    handleClose: {
      action: 'Close clicked',
    },
    preset: {
      defaultValue: 'info',
      options: getJSMapKeysArray(notificationPresetsMap),
    },
    children: {
      control: null,
    },
  },
};

const Template = args => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <PreviewWindow style={{ backgroundColor: 'var(--aqua-grey)' }}>
      <Button onClick={() => setOpen(true)} label='Show notification' />
      <Component {...args} isOpen={isOpen} handleClose={() => setOpen(false)} />
    </PreviewWindow>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  isOpen: false,
  title: 'Good news, everyone',
  message: 'Nothing to worry about, everything is going great!',
};

export const WithActions = Template.bind({});
WithActions.args = {
  isOpen: false,
  preset: 'error',
  title: 'Ooops!',
  message: 'You need to take action, something has gone terribly wrong!',
  children: <Button preset='link' size='small' label='Understood' />,
};

export const AutoClosed = Template.bind({});
AutoClosed.args = {
  isOpen: false,
  preset: 'warning',
  title: 'Uh oh!',
  message: 'Pay attention to me, things are not going according to plan.',
  autoHideDuration: 3000,
};
