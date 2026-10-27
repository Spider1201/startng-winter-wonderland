import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="container about">
      <h2>About start.ng</h2>
      <p>
        start.ng is Nigeria's home for browser games, built by the HNG community. Every game is free
        to play in your browser with no download, and many are made in Naija: danfo rush hour,
        jollof catching, Lagos markets and more.
      </p>
      <p>
        We're also building a home for web games from across Africa. If you make games anywhere on
        the continent, you can put yours on start.ng for free.
      </p>

      <h3>Frequently Asked Questions</h3>
      <div className="faq">
        <details>
          <summary>What is start.ng?</summary>
          <p>
            A home for free browser games made by the HNG community. Each game has its own address,
            like yourgame.start.ng, and you play it right in your browser.
          </p>
        </details>
        <details>
          <summary>Is it free?</summary>
          <p>Yes. Every game on start.ng is free to play in your browser, with nothing to download.</p>
        </details>
        <details>
          <summary>Are there Nigerian or African web games?</summary>
          <p>
            Yes. Many games here are Naija-themed, from danfo rush hour to jollof and Lagos markets,
            and we welcome games from across Africa.
          </p>
        </details>
        <details>
          <summary>Do I need an account to play?</summary>
          <p>
            No. Sign in to get your start.ng character, keep your scores on the leaderboards and join
            the daily tournament.
          </p>
        </details>
        <details>
          <summary>What is the daily tournament?</summary>
          <p>
            Every day a few start.ng games are picked for 24 hours, and the best player wins. Points
            count towards the overall leaderboard.
          </p>
        </details>
        <details>
          <summary>How do I put my game on start.ng?</summary>
          <p>
            Push your browser game to a public GitHub repo, publish it with one API call and approve
            it once. It goes live at yourgame.start.ng. The docs have every step.
          </p>
        </details>
      </div>
    </section>
  );
};
