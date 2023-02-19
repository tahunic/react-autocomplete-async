#### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

The difference between a `Component` and a `PureComponent` is that `PureComponent` will not re-render when the state
or props update with the same value. An example where it can cause unexpected behaviour is if the state or props use a 
complex data structure. Since the `PureComponent` uses shallow comparison in `shouldComponentUpdate` it may
not accurately determine whether a re-render is needed.

#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

When the context changes, all components down in the component tree will receive new update. In
case `shouldComponentUpdate` in one of descendant components return false, it will stop the propagation and might cause
unexpected behaviour.

#### 3. Describe 3 ways to pass information from a component to its PARENT.

- Emitting a function sent as a prop from the parent to the child component
- Using a state management tool such as redux (dispatching an action)

#### 4. Give 2 ways to prevent components from re-rendering.

Class components can prevent re-rendering in `shouldComponentUpdate`. In functional components `useMemo`
and `useCallback` hooks can be used.

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.

`React.Fragment` is a component that allows grouping of multiple elements without wrapping with another element. It is
needed to maintain the desired DOM structure.

#### 6. Give 3 examples of the HOC pattern.

HOC means higher order component. It's a function that takes a component as a parameter and returns a modified
component. A common use case is a HOC for authentication which returns a component if a user is authenticated and
redirects to log in if not. Also, some React built in HOC are `React.memo`, `React.forwardRef`, `React.lazy`.

#### 7. What's the difference in handling exceptions in promises, callbacks and async...await.

Error catching in promises requires chaining `.catch` after `.then()`. Callbacks have an argument for the error
handling, while the async/await requires a `try/catch` block.

#### 8. How many arguments does setState take and why is it async.

`setState` takes two arguments:

- A new state object
- An optional callback function that will be executed after state updated

The reason why setState is asynchronous is to have less impact the performance. After a state update React does not
re-render immediately but instead puts the update in a queue and executes multiple updates at once if needed.

#### 9. List the steps needed to migrate a Class to Function Component.

- Rename `class X extends React.Component {...}` to `const X = () => {...}`
- Remove initial state from the constructor and `setState` to `useState` hook
- Move props as arguments to the function, `const X = ({ prop1, prop2 }) => {...}`
- Move all component lifecycle functions to hooks. For example `componentDidMount` to `useEffect`, etc.
- Move render method to return block of the functional component

#### 10. List a few ways styles can be used with components.

- Inline style using `style` prop
- CSS/SCSS files
- Styled components (library) or similar
- css-in-js libraries

#### 11. How to render an HTML string coming from the server.

React allow rendering an HTML string using `dangerouslySetInnerHTML`. It's important to sanitize the HTML before
rendering it to prevent malicious attacks such as XSS.
