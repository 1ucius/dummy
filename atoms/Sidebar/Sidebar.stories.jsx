import React from 'react';

import { Sidebar as Component, SidebarContext } from '.';

export default {
  title: 'ATOMS/Sidebar',
  component: Component,
  argTypes: {
    children: {
      control: null,
    },
  },
};

const Template = args => {
  const [sidebarOpened, setSidebarOpened] = React.useState(true);

  return (
    <SidebarContext.Provider value={{ opened: sidebarOpened }}>
      <Component {...args} setSidebarOpened={setSidebarOpened} />
    </SidebarContext.Provider>
  );
};

export const Basic = Template.bind({});
Basic.args = {};
