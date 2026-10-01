import { test, expect } from '@playwright/test';
import { JAZZ_STANDARDS } from '../data/tunes';
import { CHARTS } from '../data/charts';

test('wheel stays fully visible before the draw at projector sizes', async ({ page }) => {
  for (const viewport of [{ width: 1920, height: 1080 }, { width: 1366, height: 768 }]) {
    await page.setViewportSize(viewport);
    await page.goto('/');
    const layout = await page.evaluate(() => {
      const wheel = document.querySelector('.wheel-frame')!.getBoundingClientRect();
      const footer = document.querySelector('.wheel-page > footer')!.getBoundingClientRect();
      return { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight,
        wheelTop: wheel.top, wheelBottom: wheel.bottom, footerBottom: footer.bottom };
    });
    expect(layout.width).toBe(viewport.width);
    expect(layout.height).toBe(viewport.height);
    expect(layout.wheelTop).toBeGreaterThan(0);
    expect(layout.wheelBottom).toBeLessThan(viewport.height);
    expect(layout.footerBottom).toBeLessThanOrEqual(viewport.height);
  }
});

test('legacy standard links open the projection layout', async ({ page }) => {
  await page.goto('/#standard/blue-bossa');
  await expect(page.getByRole('heading', { name: 'Blue Bossa' })).toBeVisible();
  await expect(page.locator('.projection__bar')).toHaveCount(16);
});

test('every chart fits both landscape projector sizes', async ({ page }) => {
  for (const viewport of [{ width: 1920, height: 1080 }, { width: 1366, height: 768 }]) {
    await page.setViewportSize(viewport);
    for (const tune of JAZZ_STANDARDS) {
      await page.goto(`/#projection/${tune.id}`);
      await expect(page.getByRole('heading', { name: tune.title, exact: true })).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const expectedBars = CHARTS[tune.id.replace(/-chant$/, '')].bars.length;
      await expect(page.locator('.projection__bar')).toHaveCount(expectedBars);
      await expect(page.locator('.projection__scale')).toHaveCount(tune.recommendedScales.length);
      const layout = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        clipped: [...document.querySelectorAll<HTMLElement>('.projection__bar,.projection__scale')]
          .filter(element => element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1).length,
      }));
      expect(layout, `${tune.id} at ${viewport.width}×${viewport.height}`).toEqual({ ...viewport, clipped: 0 });
    }
  }
});

test('projection transposes chart and notes together and retains selection', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('/#projection/blue-bossa');
  await expect(page.locator('.projection__bar').first()).toContainText('Cm7');
  await page.getByRole('button', { name: 'Si♭' }).click();
  await expect(page.locator('.projection__bar').first()).toContainText('Dm7');
  await expect(page.locator('.projection__scale').first()).toContainText('D mineur naturel');
  await page.keyboard.press('3');
  await expect(page.locator('.projection__bar').first()).toContainText('Am7');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Mi♭' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Quitter le mode projection et revenir à la roue' }).click();
  await expect(page.getByRole('button', { name: 'Lancer la roue' })).toBeVisible();
});
