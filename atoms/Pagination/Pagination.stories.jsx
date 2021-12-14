import React from 'react';

import { Pagination as Component, paginationPresetMap } from '.';

import PreviewWindow from '../PreviewWindow';

import { getJSMapKeysArray } from '../../cssMaps';

export default {
  title: 'ATOMS/Pagination',
  component: Component,
  argTypes: {
    preset: {
      options: getJSMapKeysArray(paginationPresetMap),
    },
  },
};

const Template = args => {
  const [page, setPage] = React.useState(0);

  return (
    <PreviewWindow>
      <Component {...args} currentPage={page} setPage={setPage} />
    </PreviewWindow>
  );
};

export const Pagination = Template.bind({});
Pagination.args = {
  preset: 'pages',
  itemsPerPage: 5,
  itemsNumber: 503,
  pagesAmount: 100,
};
