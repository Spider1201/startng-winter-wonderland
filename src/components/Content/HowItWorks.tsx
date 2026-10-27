import React from 'react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how" className="container how">
      <h2>Got a game? Put it on start.ng</h2>
      <ol>
        <li>
          <b>Build it</b>
          <span>
            Any static browser game: HTML, JavaScript, three.js, Phaser. Players bring their start.ng
            character, scores and friends.
          </span>
        </li>
        <li>
          <b>Push it to GitHub</b>
          <span>
            A public repo with a ready-to-play <code>index.html</code> at the top or in <code>dist/</code>,
            plus a <code>cover.png</code> for its card.
          </span>
        </li>
        <li>
          <b>Publish it</b>
          <span>
            One API call with your repo link, no key needed. Or hand your AI <code>start.ng/docs</code> and
            let it do the lot.
          </span>
        </li>
        <li>
          <b>Approve it once</b>
          <span>
            Open the link you get back and it's live at <code>yourgame.start.ng</code>, with its own
            leaderboard if you want one. After that, every push updates it.
          </span>
        </li>
      </ol>
      <div className="how-actions">
        <a className="btn" href="#how">
          Read the docs
        </a>
        <a className="btn ghost" href="#how">
          Docs for your AI (.md)
        </a>
      </div>
    </section>
  );
};
