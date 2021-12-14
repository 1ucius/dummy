import React from 'react';

import PreviewWindow from '../PreviewWindow';

import { getJSMapKeysArray } from '../../cssMaps';
import { buttonComponentsMap } from '../../jsMaps';
import { getComponentsMap } from '../../helpers';

import * as icons from '../icons';

import { Button as Component, Tooltip } from '..';
import { buttonSizeMap, buttonPresetToStylesMap } from './Button';

export default {
  title: 'ATOMS/Button',
  component: Component,
  argTypes: {
    onClick: {
      action: 'clicked!',
    },
    size: {
      options: getJSMapKeysArray(buttonSizeMap),
    },
    icon: {
      options: getComponentsMap(icons),
    },
    as: {
      defaultValue: 'button',
      options: getComponentsMap(buttonComponentsMap, true),
    },
    preset: {
      options: getJSMapKeysArray(buttonPresetToStylesMap),
    },
  },
};

const Template = args => (
  <PreviewWindow>
    <Component {...args} />
  </PreviewWindow>
);

const WithTooltipTemplate = ({ tooltipLabel, ...args }) => {
  const Reference = <Component {...args} />;

  return (
    <PreviewWindow>
      <Tooltip component={Reference} arrow label={tooltipLabel} fullWidth />
    </PreviewWindow>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  preset: 'primary',
  label: 'Primary Button',
};

export const PrimarySmall = Template.bind({});
PrimarySmall.args = {
  preset: 'primary',
  label: 'Primary Button Small',
  size: 'small',
};

export const Secondary = Template.bind({});
Secondary.args = {
  preset: 'secondary',
  label: 'Secondary',
};

export const SecondarySmall = Template.bind({});
SecondarySmall.args = {
  preset: 'secondary',
  label: 'Secondary Small',
  size: 'small',
};

export const Action = Template.bind({});
Action.args = {
  preset: 'action',
  label: 'Action',
};

export const Link = Template.bind({});
Link.args = {
  preset: 'link',
  label: 'Link',
};

export const LinkNeutral = Template.bind({});
LinkNeutral.args = {
  preset: 'linkNeutral',
  label: 'Link Neutral',
};

export const Icon = Template.bind({});
Icon.args = {
  preset: 'icon',
  label: 'Icon',
  icon: 'CheckIcon',
};

export const IconWithTooltip = WithTooltipTemplate.bind({});
IconWithTooltip.args = {
  preset: 'icon',
  label: 'Icon',
  icon: 'CheckIcon',
  tooltipLabel: 'This is tooltip',
};

export const IconSmall = Template.bind({});
IconSmall.args = {
  preset: 'icon',
  label: 'Icon Small',
  size: 'small',
  icon: 'CheckIcon',
};
