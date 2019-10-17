import * as React from 'react';

export interface InfoProps { }

export default (props: InfoProps) => (

    <div>
        <h1>Hello</h1>
        <p>Thanks for checking out this Extension.</p>
        <p>This tool makes testing very simple.  Just load your app, Click record on the main page and use your app as any user would.  Once you're done
            Stop recording and Get the generated test code.  Heads Up! This version doesn't work with any Google Domains but that could change with possible iterations.
        </p>
        <p>This extension was developed by the folks at KabaLabs after realizing the need and community interest in the tool.  
            It works by analyzing user activity in your app (clicks, keypresses, routes, and more) and then turning those interactions
             into Cypress code used for testing purposes.</p>

        <p>Here is a link to the project's 
          <span onClick={() => window.open("https://github.com/KabaLabs/Cypress-Recorder")}>
            <a href="https://github.com/KabaLabs/Cypress-Recorder">Github Repo</a>, 
            </span>
            Give it a star!! </p>

    </div>
)