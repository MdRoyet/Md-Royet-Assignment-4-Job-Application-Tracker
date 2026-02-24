1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
   getElementById - We can select one Unique ID.
   getElementsByClassName - we can select multiple elements that share same class
   querySelector - We can select the first HTML element that matches CSS selector
   querySelectorAll - We can select all matching elements

2. How do you create and insert a new element into the DOM?
   Using document.createElement(), Also attributes innerText, className, insert it into the DOM using methods like appendChild(), append()

3. What is Event Bubbling? And how does it work?
   Event Bubbling is like events started from Target element, then Parent, then next parent etc

4. What is Event Delegation in JavaScript? Why is it useful?
   Event Delegation is a process where we can attach a single event listener to a parent element to handle events for its child elements using event bubbling. It improves performance, reduces memory usage, and works for dynamically added elements without adding separate listeners to each child.

5. What is the difference between preventDefault() and stopPropagation() methods?
   preventDefault() - stop the browser what does it by default
   stopPropagation() - stops the event from moving to parent elements
