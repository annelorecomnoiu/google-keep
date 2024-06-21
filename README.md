To run the json-server: npm run json-server

![image](https://github.com/annelorecomnoiu/google-keep/assets/94176638/d9bb7e1a-7a8d-45f0-94c8-be3595ab876c)

# Keep Notes
A very light Google keep clone.

## Instructions
Clone this repo. Run `npm install`.

To start it up run `npm run dev`.

Develop your code in the provided files or add new ones.

## Main Requirements
Develop a very limited google keep clone.

A user should have the possibility to click a button in order to add a note. Once the button is clicked, a new note appears and the focus is set inside the header of the note and the content of the header is selected ready to be edited.

The body of a note can also be edited by clicking on it and just typing away.

When a new note is created a random color from a few preset colors is chosen and used as the background color.

The user has a button that allows them to change the note color to any of the presets.

The user has a button to delete a note.

All notes are persisted to localStorage instantly when editing, title, body, and color. When the page loads the notes are loaded from localStorage and displayed.

See the attached recording for a reference implementation.

## Bonus Requirements
1. Allow the user to select any color using a color picker in addition to the predefined colors.
2. Persist the notes to json-server.

## Help
1. Icons used are hero icons, copied from their website as svgs
2. The title and body are not inputs but actual html elements with a property of `contenteditable` set on them. Look into this on mdn.
