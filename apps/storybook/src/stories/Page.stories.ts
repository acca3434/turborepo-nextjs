import type { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"

import { Page } from "./Page"

const meta = {
  title: "UI/Page",
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {}

// More on interaction testing: https://storybook.js.org/docs/react/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const loginButton = canvas.getByRole("button", {
      name: /Log in/i,
    })
    userEvent.click(loginButton)
  },
}
