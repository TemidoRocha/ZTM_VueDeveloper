# MUSIC

## HTML and Static Assets

https://cli.vuejs.org/guide/html-and-static-assets.html

## State

State is just another way of saying data.
Data that is tracked while the appplication is active.
It's not just the data in a database, but the data used to keep track of what should be happening inside the applciation.

## Plugins

Are a way to add global-level functionality to vue.
Can add global methods, properties, componenets, assets, directives, filters, transitions, etc.
Easy to use; Load a module and then tell Vue to use it.

They need to be registed before the mounting the instance.

## Mapping State

getters are better for performing a calculation on/with a state property,
mapping teh state is better for retrieving a state property.

## Validation on the client

proviedes immediate feedback.
saves resources on the server by reducing the number of requests to submit a form.
validation should alwaus be performed on the server
https://vee-validate.logaretm.com/v4/guide/components/validation

bails property set to false will force the validation throught all the rules
after we set the bails property to false we have access to an array of errors, otherwise it will be allways only one error.

### When are inputs validated?

after the change events.
if the v-model directive is applied to an input, when the model is changed.
after the blur event.
