# Cypress Recorder
[![CircleCI](https://circleci.com/gh/KabaLabs/Cypress-Recorder/tree/master.svg?style=svg)](https://circleci.com/gh/KabaLabs/Cypress-Recorder/tree/master)

Cypress Recorder is a chrome developer tool that records user interaction within a web application and generates Cypress scripts to allow the developer to replicate that particular session. This will speed up your development cycle by facilitating the creation of unit and integration tests.

## Getting Started

Download [Cypress Recorder] from the Chrome Web Store. That's it! Once you see our icon at the upper-right of your browser window, you are ready to start generating Cypress scripts.

## Features

This extension will allow you to:

* Record clicks, typing, submits, and navigation in the browser.
* See the scripts render live as they are generated.
* Delete accidental actions.
* Reorder actions as necessary.
* Pause and resume recording within a single session.
* Record navigation within a superdomain.
* Copy the generated code to your clipboard.

## Usage

* Open the extension and click 'Start Recording' to begin recording actions.
* Click links, sumbit forms, etc.
* Check your saved actions by opening the popup at any time. To check recording status at a glance, note our icon--if recording, it will look like this: ![cypressconeREC](https://user-images.githubusercontent.com/22487388/67896806-5973e600-fb1a-11e9-8ee8-87b1e8338e3e.png)
* Click 'Stop Recording' to stop recording. From there, you will have the option to resume recording, reset, or copy your generated code to your clipboard.
* You can also use keyboard shortcuts: 
    On Macs:
    - ctrl + r to start and stop recording
    - ctrl + g to reset
    On PCs and Linux:
    - alt + r to start and stop recording
    - alt + g to reset

## Built With

* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [CircleCI](https://circleci.com/)
* [Sass](https://sass-lang.com/)
* [Parcel](https://parceljs.org/)

## Contributing

We welcome contributions! Please read our [contributing guide] to learn about our development process (linting, testing, etc) and how to propose bugfixes and improvements to Cypress Recorder.

## Authors

* **Abbey Campbell** [abbeycampbell](https://github.com/abbeycampbell)
* **Bradley Morgan**  [bkmorgan3](https://github.com/bkmorgan3)
* **Ken Sakuma** [gxcad](https://github.com/gxcad)
* **Adam Stover** [Nehtaro](https://github.com/Nehtaro)

## License 

ISC

## Acknowledgments

* Big thanks to [maximiliangonzalez](https://github.com/maximiliangonzalez) for the guidance and seasoning:sparkles:
* Inspiration for this project: [Puppeteer Recorder](https://github.com/checkly/puppeteer-recorder) 
