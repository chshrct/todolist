import React from "react";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EditableSpan, EditableSpanPropsType } from "../EditableSpan";
import AppWithRedux from "../AppWithRedux";
import { ReduxStoreProviderDecorator } from "./decorators/ReduxStoreProviderDecorator";

export default {
  title: "Todolist/AppWithRedux",
  component: AppWithRedux,
  argTypes: {
  },
  decorators:[ReduxStoreProviderDecorator]
} as Meta<typeof AppWithRedux>;

const Template: Story = (args) => (
  <AppWithRedux {...args} />
);

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {
};
