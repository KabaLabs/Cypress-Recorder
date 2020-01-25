# Cypress Recorder
[![CircleCI](https://circleci.com/gh/KabaLabs/Cypress-Recorder/tree/master.svg?style=svg)](https://circleci.com/gh/KabaLabs/Cypress-Recorder/tree/master)

Cypress Recorder is a Chrome developer tool that records user interaction within a web application and generates Cypress scripts to allow the developer to replicate that particular session. This will speed up your development cycle by facilitating the creation of end-to-end tests with [Cypress](https://www.cypress.io).

![Cypress Recorder Landing Page](https://user-images.githubusercontent.com/53627801/67972053-289fb980-fbcb-11e9-8993-146150db7fe8.png)

## Getting Started

Download Cypress Recorder from the [Chrome Web Store](https://chrome.google.com/webstore/detail/cypress-recorder/glcapdcacdfkokcmicllhcjigeodacab). That's it! Once you see our icon at the upper-right of your browser window, you are ready to start generating Cypress scripts.

## Features

This extension will allow you to:

* Record clicks, typing, submits, and navigation in the browser.
* See the scripts render live as they are generated.
* Delete accidental actions.
* Reorder actions as necessary.
* Pause and resume recording within a single session.
* Record navigation within a superdomain.
* Copy the generated code to your clipboard.

![Cypress Recorder in Use](https://user-images.githubusercontent.com/53627801/67922272-8d292d00-fb67-11e9-836e-998d912617be.png)

## Usage

* Open the extension and click 'Start Recording' to begin recording actions.
* Click links, sumbit forms, etc.
* Check your saved actions by opening the popup at any time. To check recording status at a glance, note our icon: if recording, it will look like this: ![cypressconeREC](https://user-images.githubusercontent.com/22487388/67896806-5973e600-fb1a-11e9-8ee8-87b1e8338e3e.png)
* Click 'Stop Recording' to stop recording. From there, you will have the option to resume recording, reset, or copy your generated code to your clipboard.
* You can also use keyboard shortcuts:
    On Macs:
    - Ctrl + R to start and stop recording
    - Ctrl + G to reset
    
    On PCs and Linux:
    - Alt + R to start and stop recording
    - Alt + G to reset

## Built With

* [Typescript](https://www.typescriptlang.org/)
* [React](https://reactjs.org/)
* [CircleCI](https://circleci.com/)
* [Sass](https://sass-lang.com/)
* [Parcel](https://parceljs.org/)

## Contributing

We welcome contributions! Please read our [CONTRIBUTING](https://github.com/KabaLabs/Cypress-Recorder/blob/master/CONTRIBUTING.md) guide to learn about our development process (linting, testing, etc) and how to propose bugfixes and improvements to Cypress Recorder.

## Authors

* **Abbey Campbell** [abbeycampbell](https://github.com/abbeycampbell)
* **Bradley Morgan**  [bkmorgan3](https://github.com/bkmorgan3)
* **Ken Sakuma** [ken-can-code](https://github.com/ken-can-code)
* **Adam Stover** [adam-stover](https://github.com/adam-stover)

## License

ISC

## Acknowledgments

* Huge thanks to [maximiliangonzalez](https://github.com/maximiliangonzalez) for the guidance and seasoning:sparkles:
* Inspiration for this project: [Puppeteer Recorder](https://github.com/checkly/puppeteer-recorder)

赛普拉斯记录器是一个chrome开发人员工具，可记录用户使用Web应用程序过程中的所生成赛普拉斯代码，以允许开发人员复制该段时间的会话。 通过使用建立单元测试和集成测试，从而加快开发周期。

サイプレスレコーダーは、Webアプリケーション内のユーザーインタラクションを記録し、サイプレススクリプトを生成し、開発者が特定のセッションを複製できるようにするためのChrome開発者ようのツールです。 これにより、サイプレスを使用してエンドツーエンドのテストを簡単に作成でき、開発サイクルが短縮されます。
