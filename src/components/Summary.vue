<template>
  <section id="features">
    <h2>Why?</h2>
    <p>
      Stremio currently doesn't allow users to change the order that their installed addons appear on the home
      screen.
      As a work around, it is common for users to remove and re-install addons in the order they want
      them to appear. This is a tedious and cumbersome process. This addon uses the internal Stremio API to
      manipulate addon order without having to add/remove them.
    </p>
    <p>
      This is a <strong>workaround</strong> and not a <strong>solution</strong>. It is not recommended to
      use this tool unless you are comfortable with the risks involved.
      <strong>No support or warranty is given.</strong>
    </p>
    <h3>How?</h3>
    <ol>
      <li>Login to <a href="https://web.stremio.com/" target="_blank">https://web.stremio.com/</a> using your Stremio
        credentials in your browser.</li>
      <li>
        Open the developer console <a href="#faq">(?)</a> and paste the follow code snippet:
        <code>JSON.parse(localStorage.getItem("profile")).auth.key</code>
      </li>
      <li>Take the output value and paste it into the form below.</li>
      <li>Click 'Load Addons' to load your profiles addons.</li>
      <li>Re-order your addons as you like.</li>
      <li>Click the 'Sync To Stremio' button to sync the changes back to your profile.</li>
    </ol>
  </section>
</template>
