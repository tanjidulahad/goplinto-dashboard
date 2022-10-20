# Pickyto Dashboard Website

## MISC

## FEATURES & TASKS

- [ ] S3 image upload + Clear Button => Functionalities
- [ ] Load S3 config as initial State if it exists for given site key

## TODO _(Nice to have)_

- [ ] USe Actual Colors for Design, sync up with @Kiran
- [ ] Handle Hover, focus utilities the right way, Refer : [Adam Wathan's Video](https://www.youtube.com/watch?v=olyRu5R1EZ4)
- [ ] Convert all fa-icons to Component based faIcons (pef imprv)
- [ ] i18n implementation for French(fr)
- [ ] RTL support for Arabic & Urdu langs
- [x] Codesplitting in Tailwind.css to improve performance
- [x] Remove travis.yml and add buildspec.yml
- [x] Add prettier & eslint

---

## COMPLETED section

- [x] Clear home page
- [x] Download and host ve/ non veg css files statically

### S3 Image upload feature

- [x] Apply Button
- [x] Setup the backend to return Presigned urls to upload (5 mins validity)
- [x] Image Preview on upload in React - How to set this up?
- [x] Connect Backend to front-end
- [x] Using sagas
- [x] Save upload to S3 and get back url
- [x] set url to the Themed Page

### Item Layout Dynamic Config

- [x] Make Radio buttons to work -> Grid vs List
- [x] Set up action, reducer pairs
- [x] Either Find a Component to make this change dynamic by passing props
- [x] Or do this yourself dynamically using cssInJS + styled-components + tailwindcss

### Save Config to S3

- [x] Upon Save just back up the whole state object as file
- [x] Use sagas and use selectors to extract only customize page state
- [x] Fire Action on click of Next button & handle in sagas
- [x] Change text of Next -> Save & Next

### Refactor + Code Cleaning : Configuration SideBar

- [x] Move Each of the section to separate styled file
- [x] Remove OnColor Change callback method
  - [x] Make the component a controlled component with local state
  - [x] Remove the global state method
- [x] Move Configuration Sidebar to separate component.
- [x] Pass down callbacks as props

### Refactor + Code Cleaning Tasks for Dynamic Preview Page

- [x] Move the Dynamic page area to separate component called ThemedPage
  - [x] Wrap ThemedPage in ThemeProvider in the CustomizePage
  - [x] Pass the required data like restaurant name, logo & cover pic as props
  - [x] Pass color(, fonts) via ThemeProvider
  - [x] Move the inline classes to styled components section
- [x] Search Query : When to use components vs containers?

### Full screen preview

- [x] Setup action, reducer pairs and pass down the onclick handler
  - [x] Action name Toggle view preview
  - [x] create constant
  - [x] create action with no params
  - [x] reducer inital state as view : normal or preview : false
  - [x] reducer handle action change to toggle preview to true
- [x] Add exit preview button to reverse the state
  - [x] Conditionally set up styles to mb-16
  - [x] Conditionally change the icon to compress arrows alt
  - [x] - Conditionally set title
- [x] Add preview button
- [x] Add new prop to theme or props.view to themeProvider or Page Component
- [x] Use this new flag : view : normal / fullscreen
- [x] Add classes accordingly to PageHeader
  - [x] ~~fixed~~ => absolute
  - [x] ~~w-3/4~~ => w-full
  - [x] Add hidden class to sidebar component dynamically
