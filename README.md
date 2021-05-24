# React Cheatsheet

Most of the information in this document comes from the official [React official website](https://reactjs.org/) and this Udemy course [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) from Maximilian Schwarzmüller.

# What is React

React is a JavaScript library for building user interfaces. Most of the project combine Reactjs with many other libraries such as (React Router, React Dom, Redux...)

## What is JSX

Fundamentally, JSX just provides syntactic sugar for the `React.createElement(component, props, ...children)` function

- JSX may remind you of a template language, but it comes with the full power of JavaScript

- After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

- By default, React DOM escapes any values embedded in JSX before rendering them (This helps prevent XSS attacks).

- Babel compiles JSX down to React.createElement() calls.

    These two examples are identical:

    ```javascript
    const element = (
      <h1 className="greeting">
        Hello, world!
      </h1>
    );
    ```

    compiles into:

    ```javascript
    const element = React.createElement(
      'h1',
      {className: 'greeting'},
      'Hello, world!'
    );
    ```
- Using Dot Notation for JSX Type
    - This is convenient if you have a single module that exports many React components.

- Choosing the Type at Runtime

    ```javascript
    import React from 'react';
    import { PhotoStory, VideoStory } from './stories';

    const components = {
      photo: PhotoStory,
      video: VideoStory
    };

    function Story(props) {
      // Correct! JSX type can be a capitalized variable.
      const SpecificStory = components[props.storyType];
      return <SpecificStory story={props.story} />;
    }
    ```

- Functions as Children

    ```javascript
    // Calls the children callback numTimes to produce a repeated component
    function Repeat(props) {
      let items = [];
      for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
      }
      return <div>{items}</div>;
    }

    function ListOfTenThings() {
      return (
        <Repeat numTimes={10}>
          {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
      );
    }
    ```

- Booleans, Null, and Undefined Are Ignored
    - false, null, undefined, and true are valid children. They simply don’t render.

## Rendering Elements
Elements are the smallest building blocks of React apps.

- To render a React element into a root DOM node, pass both to `ReactDOM.render()`

    ```javascript
    const element = <h1>Hello, world</h1>;
    ReactDOM.render(element, document.getElementById('root'));
    ```

- React elements are immutable. Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

- React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

## Performance

- React.PureComponent

    React.PureComponent is similar to React.Component. The difference between them is that React.Component doesn’t implement shouldComponentUpdate(), but React.PureComponent implements it with a shallow prop and state comparison.



## Components

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.

- Function component

    ```javascript
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    ```

- Class componenent

    ```javascript
    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
    ```

- Everything that a Class component can do can be achieve with a Function component I think the only exception would be related to `Error Boundaries`.

- Hooks can't be use directly inside a Class component.

## Props
Props are read only, in other words whether you declare a component as a function or a class, it must never modify its own props.

- All React components must act like pure functions with respect to their props.

## State and Lifecycle

- Statefull VS Stateless component
    > The literal difference is that one has state, and the other doesn’t. That means the stateful components are keeping track of changing data, while stateless components print out what is given to them via props, or they always render the same thing.

- React may batch multiple setState() calls into a single update for performance.

- Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.

    ```javascript
    this.setState((state, props) => ({
      counter: state.counter + props.increment
    }));
    ```
    
- Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.

## Lifting State Up

- Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor.

- There should be a single “source of truth” for any data that changes in a React application. Usually, the state is first added to the component that needs it for rendering. Then, if other components also need it, you can lift it up to their closest common ancestor. Instead of trying to sync the state between different components, you should rely on the top-down data flow.

## Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

- Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.

- If you only want to avoid passing some props through many levels, component composition is often a simpler solution than context.

**Cons**

- A React node can only consume one `Context` which means that if 

- An nother problem is that it's not performent to hold data that changes frequently.

## Forwarding Refs

Ref forwarding is a technique for automatically passing a ref through a component to one of its children. This is typically not necessary for most components in the application. However, it can be useful for some kinds of components, especially in reusable component libraries.

- Forwarding refs to DOM components
- Forwarding refs in higher-order components

## Fragments

Fragments let you group a list of children without adding extra nodes to the DOM.

- `<React.Fragment>`
-  `<></>`

## Higher-Order Components

A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

- Concretely, a higher-order component is a function that takes a component and returns a new component.
- Don’t Mutate the Original Component. Use Composition.
- Don’t Use HOCs Inside the render Method
- Refs Aren’t Passed Through
  - The solution for this problem is to use the React.forwardRef API


