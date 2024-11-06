// analyticsUtils.js
import analytics from "@react-native-firebase/analytics";

/**
 * Track page view
 * @param {string} pageName - The name of the page being viewed (e.g., "HomePage", "ProfilePage").
 */
export const trackPageView = async (pageName) => {
  try {
    await analytics().logScreenView({
      screen_name: pageName,
      screen_class: pageName,
    });
    // console.log(`Page view tracked: ${pageName}`);
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
};

/**
 * Track subscription events
 * @param {string} event - The event name (e.g., "SubscriptionStarted", "SubscriptionCancelled").
 * @param {object} [params={}] - Additional parameters to pass with the event.
 */
export const trackSubscriptionEvent = async (event, params = {}) => {
  try {
    await analytics().logEvent(event, params);
    // console.log(`Subscription event tracked: ${event}`);
  } catch (error) {
    console.error("Error tracking subscription event:", error);
  }
};

// Track views for different pages
export const trackHomePageView = () => trackPageView("HomePage");
export const trackProfilePageView = () => trackPageView("ProfilePage");
export const trackBlogPageView = () => trackPageView("BlogPage");

export const trackLoginPageView = () => trackPageView("LoginPage");
export const trackRegisterPageView = () => trackPageView("RegisterPage");
export const trackGroupPageView = () => trackPageView("GroupPage");
export const trackInternetWarningPageView = () =>
  trackPageView("InternetWarningPage");
export const trackDonationScreenView = () => trackPageView("DonationScreen");
export const trackFeedbackScreenView = () => trackPageView("FeedbackScreen");

// Track subscription start
export const trackSubscriptionStarted = () =>
  trackSubscriptionEvent("SubscriptionStarted");

// Track subscription cancellation
export const trackSubscriptionCancelled = () =>
  trackSubscriptionEvent("SubscriptionCancelled");

// Track subscription completion
export const trackSubscriptionCompleted = () =>
  trackSubscriptionEvent("SubscriptionCompleted");
