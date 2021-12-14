import React from 'react';

import { Typo } from '.';

import PreviewWindow from '../PreviewWindow';

import { colorsOptions } from '../../cssMaps';

export default {
  title: 'ATOMS/Typo',
  component: Typo,
  argTypes: {
    weight: {
      defaultValue: 'unset',
    },
    color: {
      defaultValue: 'unset',
      options: colorsOptions,
      control: { type: 'select' },
    },
    align: {
      defaultValue: 'unset',
    },
    fontSize: {
      defaultValue: 'unset',
    },
  },
};

const Template = args => (
  <PreviewWindow>
    <Typo {...args} />
  </PreviewWindow>
);

export const Heading1 = Template.bind({});
Heading1.args = { label: 'typo label', preset: 'heading1' };

export const Heading2 = Template.bind({});
Heading2.args = { label: 'typo label', preset: 'heading2' };

export const Heading3 = Template.bind({});
Heading3.args = { label: 'typo label', preset: 'heading3' };

export const Heading4 = Template.bind({});
Heading4.args = { label: 'typo label', preset: 'heading4' };

export const Heading5 = Template.bind({});
Heading5.args = { label: 'typo label', preset: 'heading5' };

export const Heading6 = Template.bind({});
Heading6.args = { label: 'typo label', preset: 'heading6' };

export const Paragraph = Template.bind({});
Paragraph.args = { label: 'typo label', preset: 'paragraph' };

export const Subtitle = Template.bind({});
Subtitle.args = { label: 'typo label', preset: 'subtitle' };

export const SidebarTitle = Template.bind({});
SidebarTitle.args = { label: 'typo label', preset: 'sidebarTitle' };

export const Caption = Template.bind({});
Caption.args = { label: 'typo label', preset: 'caption' };

export const Code = Template.bind({});
Code.args = { label: 'typo label', preset: 'code' };

export const InputText = Template.bind({});
InputText.args = { label: 'typo label', preset: 'input' };

export const ButtonText = Template.bind({});
ButtonText.args = { label: 'typo label', preset: 'buttonPrimary' };

export const ActionButtonText = Template.bind({});
ActionButtonText.args = { label: 'typo label', preset: 'actionButton' };

export const LinkText = Template.bind({});
LinkText.args = { label: 'typo label', preset: 'link' };
