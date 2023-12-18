# React Modal Observer

React modal observer allows you to create a modal from anywhere without using context and passing down props to the component, with just a function!

## Installation

```
$ npm install --save react-modal-observer
$ yarn add react-modal-observer
```

## Features

- It works with lazy loading
- You can pass down props to the modal component
- Typescript support: It will infer the props of the modal component
- You can set default styles for the modal container and overwrite them in the addModal function
- You can set a custom animation for the modal
- You can set a spinner component to show while the modal is loading

## Usage

```jsx
import React from 'react'
import { Modals, addModal } from 'react-modal-observer'

export default function App() {
  const handleOpen = () => {
    addModal(TestModal, { description: 'This is a test modal' }, { backgroundColor: 'green' })
  }

  return (
    <>
      <main>
        <button onClick={handleOpen}>Open Modal</button>
      </main>

      <Modals
        backgroundColor="rgba(0, 0, 0, 0.5)"
        duration={250} // miliseconds
        /* NOTE: You can't use `animationType` at the same time as `customAnimation`. */
        animationType="fade" // 'none' | 'fade' | 'fade-with-scale' | 'slide-left' | 'slide-right'
        noScroll={true} // Prevents html scrolling when the modal is open
        timingFunction="ease"
        Spinner={<div className='spinner' />} // Component to show while the modal is loading
        customAnimation={
          parentClassName: 'page-center' // .page-center: { justify-content: center }
          classNames: {
            enter: 'custom-enter',
            enterActive: 'custom-enter-active',
            exit: 'custom-exit',
            exitActive: 'custom-exit-active',
          }
        }
      />
    </>
  )
}

const TestModal = ({ description, closeModal }) => {
  return (
    <div>
      <button onClick={closeModal}>Close Modal</button>
      <h1>Test Modal</h1>
      {description}
    </div>
  )
}
```
