import { test, expect } from '@playwright/test';

test('verify split layout proportions', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:3001');

  // Wait for content to be visible
  await page.waitForSelector('[data-testid="content-panel"]');

  const contentPanel = page.locator('[data-testid="content-panel"]');
  const mapPanel = page.locator('[data-testid="map-panel"]');

  const contentBox = await contentPanel.boundingBox();
  const mapBox = await mapPanel.boundingBox();

  if (!contentBox || !mapBox) throw new Error('Panels not found');

  console.log('Content width:', contentBox.width);
  console.log('Map width:', mapBox.width);

  // Check if they are side-by-side (approx)
  // 1280 * 1/3 = 426.66
  // 1280 * 2/3 = 853.33
  expect(contentBox.width).toBeGreaterThan(400);
  expect(mapBox.width).toBeGreaterThan(800);
  expect(contentBox.y).toBe(mapBox.y);

  // Screenshot for visual confirmation
  await page.screenshot({ path: 'split_layout_fixed.png' });
});

test('verify markers exist on map', async ({ page }) => {
  await page.goto('http://localhost:3001');

  // Wait for markers (they have ping animation)
  const markers = page.locator('.animate-ping-slow');
  await expect(markers.first()).toBeVisible();

  const count = await markers.count();
  console.log('Found', count, 'markers');
  expect(count).toBeGreaterThan(0);
});
