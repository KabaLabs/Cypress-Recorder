import * as React from 'react';

export interface InfoProps { }

export default (props: InfoProps) => (

    <div id ="infobox">
        <h1>Hello.</h1> <br>
        </br>
        <p>Thanks for checking out this extension.</p> <br>
        </br>
        <p>This tool makes testing very simple. Just load your app, click record on the main page and use your app as any user would. Once you're done,
            stop recording and copy the generated test code to your clipboard to use in your Cypress tests.</p> <br>
        </br>
        <p>This extension was developed by the folks at KabaLabs after realizing the need and community interest in the tool.  
            It works by analyzing user activity in your app (clicks, keypresses, routes, and more) and then turning those interactions
             into Cypress code used for testing purposes.</p><br>
             </br>
        <p>Here is a link to the project's
          <span onClick={() => window.open("https://github.com/KabaLabs/Cypress-Recorder")}>
            <a href="https://github.com/KabaLabs/Cypress-Recorder"> Github Repo</a>. 
            </span>
            Give it a star!! </p>

    </div>
)