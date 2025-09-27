// Utility to manage feed and explore content refresh logic
export class RefreshManager {
  private static lastRefreshTime: number = 0;
  private static isUserActive: boolean = true;
  private static activityTimer: NodeJS.Timeout | null = null;

  // Track user activity to prevent refresh while actively using app
  static trackUserActivity() {
    this.isUserActive = true;
    
    // Clear existing timer
    if (this.activityTimer) {
      clearTimeout(this.activityTimer);
    }
    
    // Set inactive after 30 seconds of no activity
    this.activityTimer = setTimeout(() => {
      this.isUserActive = false;
    }, 30000);
  }

  // Check if content should be refreshed
  static shouldRefreshContent(): boolean {
    const now = Date.now();
    const timeSinceLastRefresh = now - this.lastRefreshTime;
    
    // Only refresh if:
    // 1. User is not actively using the app
    // 2. At least 5 minutes have passed since last refresh
    // 3. This is a new session (app was closed/reopened)
    const shouldRefresh = (
      !this.isUserActive || 
      timeSinceLastRefresh > 5 * 60 * 1000 || // 5 minutes
      this.isNewSession()
    );

    if (shouldRefresh) {
      this.lastRefreshTime = now;
      this.markSessionActive();
    }

    return shouldRefresh;
  }

  // Check if this is a new app session
  private static isNewSession(): boolean {
    const lastSessionTime = localStorage.getItem('textenger_last_session');
    const now = Date.now();
    
    if (!lastSessionTime) {
      return true;
    }
    
    const timeSinceLastSession = now - parseInt(lastSessionTime);
    // Consider it a new session if more than 10 minutes have passed
    return timeSinceLastSession > 10 * 60 * 1000;
  }

  // Mark current session as active
  private static markSessionActive() {
    localStorage.setItem('textenger_last_session', Date.now().toString());
  }

  // Force refresh (for pull-to-refresh)
  static forceRefresh() {
    this.lastRefreshTime = Date.now();
    this.markSessionActive();
    return true;
  }

  // Shuffle array function with Fisher-Yates algorithm
  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Shuffle posts while maintaining pinned/featured content at top
  static shuffleFeedContent<T extends { id: number; isPinned?: boolean; isFeatured?: boolean }>(
    posts: T[]
  ): T[] {
    const pinnedPosts = posts.filter(post => post.isPinned || post.isFeatured);
    const regularPosts = posts.filter(post => !post.isPinned && !post.isFeatured);
    
    return [
      ...pinnedPosts, // Keep pinned posts at top
      ...this.shuffleArray(regularPosts) // Shuffle regular posts
    ];
  }

  // Initialize activity tracking
  static initialize() {
    // Track various user interactions
    const events = ['click', 'scroll', 'touchstart', 'keydown'];
    
    events.forEach(event => {
      document.addEventListener(event, () => {
        this.trackUserActivity();
      }, { passive: true });
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.trackUserActivity();
      }
    });

    // Initial activity tracking
    this.trackUserActivity();
  }

  // Clean up
  static cleanup() {
    if (this.activityTimer) {
      clearTimeout(this.activityTimer);
      this.activityTimer = null;
    }
  }
}