import * as React from 'react';

export default () => {
  const handleClick = (): void => {
    window.open('https://github.com/KabaLabs/Cypress-Recorder');
  };

  return (
    <div id="infobox">
      <h1>Hello.</h1>
      <br />
      <p>Thanks for checking out this developer tool.</p>
      <br />
      <p>
        We want to make automated testing very simple. Just load your app, click record on the main
        page and use your app as any user would. Once you&apos;re done, stop recording and copy the
        generated test code to your clipboard to use in your Cypress tests.
      </p>
      <br />
      <p>
        This tool was developed by the folks at KabaLabs after realizing the need and community
        interest in the tool. It works by analyzing user activity in your app (clicks, keypresses,
        routes, and more) and then turning those interactions into Cypress code used for testing
        purposes.
      </p>
      <br />
      <p>
        Here is a link to the project&apos;s&nbsp;
        <span role="link" tabIndex={0} onClick={handleClick} onKeyDown={handleClick}>
          <a href="https://github.com/KabaLabs/Cypress-Recorder">Github Repo</a>
        </span>
        . Give it a star!!
      </p>
    </div>
  );
};
