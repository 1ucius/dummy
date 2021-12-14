import React from 'react';

import {
  Icon,
  LogoIcon,
  CheckIcon,
  CrossIcon,
  CrossBoldIcon,
  PlusIcon,
  PlusBoldIcon,
  MinusIcon,
  MinusBoldIcon,
  ChevronRegularIcon,
  ChevronBoldIcon,
  ChevronExtraBoldIcon,
  FullScreenIcon,
  EyeClosedIcon,
  EyeOpenedIcon,
  AdminIcon,
  ToggleSidebarIcon,
  MapPinIcon,
  ListIcon,
  UserIcon,
  UsersIcon,
  TagIcon,
  CameraIcon,
  CameraModernIcon,
  PipelineIcon,
  SlideIcon,
  WorkflowIcon,
  AlertsIcon,
  AnalyticsIcon,
  InfoIcon,
  ExclamationIcon,
  LogoutIcon,
  RefreshIcon,
  ResetIcon,
  UndoIcon,
  EditIcon,
  EditSimpleIcon,
  TrashBinIcon,
  ClockIcon,
  BellIcon,
  ThermometerIcon,
  SanitizeHandsIcon,
  MaskIcon,
  NotFoundIcon,
  KioskIcon,
  SearchIcon,
  UserIconV2,
  CameraIconV2,
  LocationIcon,
  LockIcon,
  /// SPECIAL
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  NoticeIcon,
} from '..';

import * as icons from '../icons';

import { Flex, FlexItem } from '../Flex';
import { Typo } from '../Typo';

import { Scrollbar } from '../Scrollbar';

import { colorsOptions, getJSMapKeysArray } from '../../cssMaps';

import PreviewWindow from '../PreviewWindow';

import { rotateMap } from './Icon';

export default {
  title: 'ATOMS/Icons',
  component: Icon,
  argTypes: {
    children: {
      control: false,
    },
    as: {
      control: false,
    },
    viewBox: {
      control: false,
    },
    color: {
      defaultValue: 'default',
      options: colorsOptions,
    },
    hoverColor: {
      defaultValue: 'unset',
      options: colorsOptions,
    },
    size: {
      defaultValue: 'logo',
    },
    customSize: {
      defaultValue: null,
    },
    noFill: {
      defaultValue: false,
    },
    noStroke: {
      defaultValue: false,
    },
    rotateDegrees: {
      defaultValue: 'unset',
      options: getJSMapKeysArray(rotateMap),
    },
  },
};

const Template = ({ children, ...rest }) => (
  <PreviewWindow>
    <Icon {...rest}>{children}</Icon>
  </PreviewWindow>
);

export const Example = Template.bind({});
Example.args = {
  children: (
    <path
      d='M3 8.66667L6.66667 12.3333L14 5'
      fill='none'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  ),
  viewBox: '0 0 16 16',
  noFill: true,
};

const IconListTemplate = () => (
  <PreviewWindow>
    <Scrollbar size='medium' onlyVertical autoHide={false}>
      <Flex alignItems='start' justifyContent='start' gap='xl' wrap skipWrapper>
        {Object.keys(icons)
          .sort()
          .map(icon => {
            const Component = icons[icon];

            return (
              <FlexItem
                key={icon}
                style={{ minWidth: '150px' }}
                basis='6'
                shrink
                grow
              >
                <Flex direction='column' alignItems='center'>
                  <Component size='large' color='mediumGrey' />
                  <Typo
                    label={icon}
                    style={{
                      padding: 'var(--spacing-3xs) var(--spacing-3xs) 0',
                    }}
                    weight='semibold'
                    color='lightGrey'
                  />
                </Flex>
              </FlexItem>
            );
          })}
      </Flex>
    </Scrollbar>
  </PreviewWindow>
);

export const IconList = IconListTemplate.bind({});
IconList.args = {};
