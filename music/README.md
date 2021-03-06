# MUSIC

## VERCEL DEPLOYMENT

###### https://music-example-flame.vercel.app/

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

## Understanding Authentication - Firebase

Firebase is build in packages and we import the packages we need.

#### firebase/app

will help configuring the firebase

#### Buckets

Buckets are the physical location where your data is stored. Only if in a premium package.

#### Collections

Collections include the records. The data you store in the database.

#### Documents

Documents are objects in the database.
A way to categorize data.

## Flux Pattern

https://facebook.github.io/flux/docs/in-depth-overview/

Dispatch -> Action (business logic) -> Mutation -> State
A unidirectional data flow is central to the Flux pattern, and the above diagram should be the primary mental model for the Flux programmer. The dispatcher, stores and views are independent nodes with distinct inputs and outputs. The actions are simple objects containing the new data and an identifying type property.

## Token

https://jwt.io/

Encoded strings for storing data.
Digitally signed

## Routes

Using the names in the router-link will make the links more readable and scalable. Using the names in case a link changes we don't have to modify all the links

When changing a previous implemented route we should allways think taht the browser saves the routes as well as the user can bookmark the page and that will lead to conflit.
Possible solutions:

1. gice a 404 saying the new route
2. redirect route (in comparation with alias it allows the search engines to check the url changes )
3. implement an alias (using an alias we are not redirecting)

Navigation Guards:

- There are a number of ways to hook into the route navigation process: globally, per-route, or in-component.
- The Full Navigation Resolution Flow

## Firebase

### References

An object that points to a location in your app.
Allows to read/write references.
Create new references.

##### It is common practise to create a ref for a root location and then another for a specific location. even if we only have an archive.

### Snapshots

An obj that it is a copy of a location in your app.
Read-only
immutable

Ref and snapshots can read the data in the app. Snapshots are read-only but are more memory efficient.

Cancelling upload in the lifecycle is less code. Vue will work for us.
Using the navigation guards we have more control over the order of teh execution.

## Directives

Modifiers have the advantage of selecting several at once. The disadvantage is that they only have boolean values.

## PWA vs SPA

Progressive web app is a term used to describe a set of features and API's in the browser
Puerly additive
PWA features can be implemented on non-spa sites

#### Manifest File - https://cli.vuejs.org/core-plugins/pwa.html#configuration

The manifest file is only generated after production. This was set by the plugin authors

#### Service Workers

JS file that runs in the backgroud. (Separate Thread)
Primarily used for caching files, pushing notifications, and backgroud syncing
Unable to access teh DOM
Limited browser support ( relatively new feature)

##### Different strategies for cashing

Cashe, then network: the app will try to search for the files in the cache first and only after at the network.
Network, then cache: the app will search allways the files at the network and only offline will search at the cache.

Workbox ( library developed by google to implement the cache) https://developers.google.com/web/tools/workbox
It only caches the static files by default

To enable the firebase cache we need to implement the db.enablePersistence() on the firebase file.
We need to consider teh following:

- unable to authenticate
- storage is Limited
- unable to upload files

## Registering components globally

##### https://github.com/TemidoRocha/ZTM_VueDeveloper/commit/4066a92c1f773e4215aaf49eb476fe8921981680

1. search for component files
2. loop through the result
3. import each component filespre the file
4. Pre the filename to be a valid component naem
5. register the component

## Vuex automatic module registration

##### https://github.com/TemidoRocha/ZTM_VueDeveloper/commit/ca030e4148ad7493853637ff1ee2baf599d6dcf2

## Testing

The goal to test an app is to make development faster.
One possible rule: If it doesn't save you time, then don't bother writing a test.

#### Unit Testing with Jest flow

We should test the output of a component.
Input -> Component -> Output (what we should test)
The idea is to write a test from the perspective of a developer, that is using a
component but he doesn't know how the component funcitonality is implemented.

Jest -> general.js , component.vue -> babel-jest , vue-jest -> Jest

Transformers are functions (babel-jest, vue-jest) that take care of compiling code
from files that Jest will be able to understand.

Stubs are fake or dummy components

When we are deciding if we should import a library, we should allways think if it is
required for the test. If we need the feature we should import, if it can be mocked, it should b mocked.
It is recommended that each test has an instance of teh component. Otherwise it may be difficult to refactor
in case, for example, one of the tests makes a modification on the component.

Attributes function will retrieve the attributes on the root element and not from the children components.

expect.assertions(num);
Verifies that a certain number of assertions are called during a test.
This is often useful when testing asynchronous code, in order to make
sure that assertions in a callback actually got called.
It is also useful to verify if the tests are leaking.

Snapshot testing is when two images of an app are compared.
Images are unreliable because different brwosers and sizes can cause a test to fail. Even if it's off by one pixel.
Jest will serialize a value. A serializable value is basically any JS vlue that can be converted to a string.

#### E2E with Cypress

End-to-end testing is a way to check if an app is behaving correctly by automaing a browser to mimic user behaviour.
Creating a program that can click links, fill out forms, scroll around, etc.

- This tests have the following problems:

1. slow
2. unreliable
3. difficult to debug

Extremely usefull for seeing the app fully functional without having to manually test everything.
They allow you to see if everything is working together unlike unit and snapshot testing.

What should we be testing:
We should have the minimum E2E tests.
Major user actions (authentication)

Cypress Config function:
fixturesFolder -> are files taht hold data that can be used in different tests
integrationFolder -> tests files for cypress
screenshotsFolder -> cypress allow to save screenshots
videosFolder -> cypress allow to save videos
supportFile -> this files will load before the cypress runs. Run commands that can be performed in any tests like logging in
