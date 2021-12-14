import React from 'react';

import PreviewWindow from '../../PreviewWindow';

import { Scrollbar } from '../../Scrollbar';
import { Typo } from '../../Typo';

import { Table as Component, scrollPresetMap } from '..';

import { getJSMapKeysArray } from '../../../cssMaps';

import { dummyRegular, dummyWithActions } from './dummyData';

export default {
  title: 'ATOMS/Table',
  component: Component,
  argTypes: {
    scrollPreset: {
      options: getJSMapKeysArray(scrollPresetMap),
    },
    indexRenderer: {
      control: null,
    },
    actionsRenderer: {
      control: null,
    },
    cellRenderer: {
      control: null,
    },
    columnTitleRenderer: {
      control: null,
    },
  },
};

const Template = args => {
  const { isInProgress } = args;

  return (
    <PreviewWindow
      style={{ maxHeight: '800px' }}
      isTall
      isInProgress={isInProgress}
    >
      <Scrollbar onlyVertical>
        <Component {...args} />
      </Scrollbar>
    </PreviewWindow>
  );
};

export const Table = Template.bind({});
Table.args = {
  isInProgress: true,
  useIndexes: true,
  useGrid: true,
  scrollPreset: scrollPresetMap.page,
  maxHeight: 600,
  stickyFooter: false,
  stickyHeader: false,
  indexRenderer: ({ table, cell }) => {
    const { index } = cell;
    const { offset } = table;

    return (
      <Typo
        preset='subtitle'
        label={!index ? '#' : `${offset + index}`}
        color='mediumGrey'
        uppercase
      />
    );
  },
  cellRenderer: ({ table, cell }) => {
    const { title } = cell;

    return (
      <Typo
        preset='subtitle'
        label={title || '-'}
        color='mediumGrey'
        uppercase
      />
    );
  },
  columnTitleRenderer: ({ table, cell }) => {
    const { title } = cell;

    return (
      <Typo
        preset='subtitle'
        label={title || '-'}
        color='mediumGrey'
        uppercase
      />
    );
  },
  actionsRenderer: ({ table, cell }) => {
    const { index } = cell;
    const { offset } = table;

    return (
      <Typo preset='subtitle' label='!ACTION!' color='mediumGrey' uppercase />
    );
  },

  ...dummyRegular,
};

export const TableWithActions = Template.bind({});
TableWithActions.args = {
  isInProgress: true,
  ...Table.args,
  ...dummyWithActions,
};

export const TableNoIndexes = Template.bind({});
TableNoIndexes.args = {
  isInProgress: true,
  ...TableWithActions.args,
  useIndexes: false,
};
