// Audience figures that are not fetched live.
//
// The YouTube subscriber count is NOT here. It comes from the YouTube API via
// fetchSubscriberCount() in src/app/lib/youtube.ts, so it updates on its own.
//
// SOCIAL_FOLLOWERS is our total combined following across all platforms. It is
// counted by hand, so update it here and every page that shows it follows.
// Used by the homepage, the About page and the Work With Us page.
export const SOCIAL_FOLLOWERS = '752k+'
