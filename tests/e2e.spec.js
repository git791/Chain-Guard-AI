import { test, expect } from '@playwright/test';

// Note: Ensure Firebase emulator / env mock is set if authentication is hard blocked.
// Given this Next.js app has a simple auth bypass mock, this should work.

test.describe('ChainGuard E2E Basic Navigation', () => {
  test('should load the dashboard and verify key elements', async ({ page }) => {
    await page.goto('/');

    // Check if redirect to login happens or if it stays on Dashboard
    if (page.url().includes('/login')) {
      // Mock log in if redirected
      await page.fill('input[type="email"]', 'test@chainguard.ai');
      await page.fill('input[type="password"]', 'password123');
      await page.click('button[type="submit"]');
      await page.waitForURL('**/');
    }

    await expect(page.locator('text=ChainGuard AI').first()).toBeVisible();
    await expect(page.locator('text=Active Shipments').first()).toBeVisible();
  });

  test('should navigate to Routes page successfully', async ({ page }) => {
    // Navigate straight to routes
    await page.goto('/routes');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1', { hasText: 'Live Routes' })).toBeVisible();
    await expect(page.locator('div.relative.min-h-\\[500px\\]').first()).toBeAttached();
  });

  test('should navigate to Analytics page and verify SDG features', async ({ page }) => {
    await page.goto('/analytics');
    
    await expect(page.locator('h1', { hasText: 'Analytics & Sustainability' })).toBeVisible();
    await expect(page.locator('text=CO₂ Emissions Saved').first()).toBeVisible();
    await expect(page.locator('text=Distance Optimized').first()).toBeVisible();
  });

  test('should navigate to Settings page and check default values', async ({ page }) => {
    await page.goto('/settings');
    
    await expect(page.locator('h1', { hasText: 'Settings' })).toBeVisible();
    await expect(page.locator('input[type="text"]').first()).toHaveValue('Aryan Kumar');
  });
});
