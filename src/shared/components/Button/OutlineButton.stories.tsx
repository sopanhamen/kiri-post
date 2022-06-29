import { ComponentMeta, ComponentStory } from '@storybook/react'

import BasicButton from './BasicButton'

export default {
    title: 'Example/Button',
    component: BasicButton,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        color: { control: 'color' },
    },
} as ComponentMeta<typeof BasicButton>

const Template: ComponentStory<typeof BasicButton> = (args) => (
    <BasicButton {...args} />
)

export const BasicButtons = Template.bind({})
BasicButtons.args = {
    label: 'Button',
}

// export const BasicLarge = Template.bind({})
// BasicLarge.args = {
//     size: 'lg',
//     label: 'Button Submit',
// }
