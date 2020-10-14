# Basic Implementation of Google Sign-in Auth

## Method 1: Session Based
This will generate a google auth that exists for only the current window session, so if the user closes the window they're automatically logged off. 

The way this works is that the front-end client imports some google specific platform code using:
```html
<script src="https://apis.google.com/js/platform.js" async defer></script>
```
which will style and create a sign-in button for the element with the class `g-signin2`. When the data is fetched then it runs whatever function is provided with the `data-onsuccess` tag on the element. The callback receives an object which can be used to get the user's google data.

## Method 2: Passing the Data Back
This will generate a google login page that the user can login to and then a callback route is called with the necessary google login data to be stored.
