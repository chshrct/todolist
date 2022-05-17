import React from "react";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EditableSpan, EditableSpanPropsType } from "../components/EditableSpan/EditableSpan";

export default {
  title: "Todolist/EditableSpan",
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: "Value of EditableSpan changed",
    },
    value: {
      defaultValue: " HTML",
      description: 'Start value of EditableSpan'
    },
  },
} as Meta<typeof EditableSpan>;

const Template: Story<EditableSpanPropsType> = (args) => (
  <EditableSpan {...args} />
);

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  onChange: action('Value of EditableSpan changed')
};
