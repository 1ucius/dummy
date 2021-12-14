import React from 'react';

import { Avatar as Component, Tooltip } from '../..';

import PreviewWindow from '../PreviewWindow';

export default {
  title: 'ATOMS/Avatar',
  component: Component,
  argTypes: {
    alt: {
      defaultValue: 'Vadym Orlov',
    },
    className: {
      defaultValue: '',
    },
  },
};

const Template = args => (
  <PreviewWindow>
    <Component {...args} />
  </PreviewWindow>
);

export const Avatar = Template.bind({});
Avatar.args = {};

const AvatarWithTooltipTemplate = args => {
  const { alt } = args;

  const Reference = <Component {...args} />;

  return (
    <PreviewWindow>
      <Tooltip component={Reference} label={alt} arrow />
    </PreviewWindow>
  );
};

export const AvatarWithTooltip = AvatarWithTooltipTemplate.bind({});
AvatarWithTooltip.args = {};
