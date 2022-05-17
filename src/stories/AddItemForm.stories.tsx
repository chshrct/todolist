import React from "react";
import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AddItemForm, AddItemFormPropsType } from "../components/AddItemForm/AddItemForm";

export default {
  title: "Todolist/AddItemForm",
  component: AddItemForm,
  argTypes: {
    onClick: {
      description: "Button inside form clicked",
    },
  },
} as Meta<typeof AddItemForm>;

const Template: Story<AddItemFormPropsType> = (args) => (
  <AddItemForm {...args} />
);

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  addItem: action("Button inside form clicked"),
};

export const AddItemFormDisabledExample = Template.bind({});
AddItemFormDisabledExample.args = {
  disabled:true,
  addItem: action("Button inside form clicked"),
};