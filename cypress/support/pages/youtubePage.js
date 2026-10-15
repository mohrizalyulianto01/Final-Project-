class YoutubePage {
  visit() {
    cy.visit("https://www.youtube.com/?hl=en&persist_hl=1");
  }

  acceptConsentIfPresent() {
    cy.get("body").then(($body) => {
      const $btn = $body
        .find("button")
        .filter((_, el) => /accept all|reject all|setuju/i.test(el.innerText));
      if ($btn.length) cy.wrap($btn.first()).click({ force: true });
    });
  }

  clickGaming() {
    cy.get('ytd-guide-entry-renderer a[href="/gaming"]', { timeout: 15000 })
      .first()
      .click({ force: true });
  }

  getVideoTitle() {
    return cy
      .get(
        [
          "ytd-video-renderer a#video-title",
          "ytd-rich-item-renderer a#video-title-link",
          "ytd-rich-item-renderer a#video-title",
          "yt-lockup-view-model a.yt-lockup-metadata-view-model-wiz__title",
          "yt-lockup-view-model h3 a",
        ].join(", "),
        { timeout: 15000 }
      )
      .filter(":visible");
  }

  getWatchTitle() {
    return cy.get("ytd-watch-metadata h1", { timeout: 15000 });
  }

  getChannelName() {
    return cy.get("ytd-watch-metadata #owner #channel-name").first();
  }
}

export default YoutubePage;
