import React from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react';

import App from '../app/App';

import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator';

export default {
  title: 'Todolist/App',
  component: App,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as Meta<typeof App>;

const Template: Story = args => <App {...args} demo />;

export const AppExample = Template.bind({});
AppExample.args = {};
