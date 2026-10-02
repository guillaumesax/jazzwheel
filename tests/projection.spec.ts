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
      const expectedBars = CHARTS[tune.id].bars.length;
      await expect(page.locator('.projection__bar')).toHaveCount(expectedBars);
      await expect(page.locator('.projection__scale')).toHaveCount(tune.recommendedScales.length);
      await expect(page.locator('.projection__notes-fr')).toHaveCount(tune.recommendedScales.length);
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

test('the French line follows the written notes in the selected pitch', async ({ page }) => {
  await page.goto('/#projection/all-of-me');
  await expect(page.locator('.projection__scale').first().locator('.projection__notes')).toHaveText('C · D · E · F · G · A · B');
  await expect(page.locator('.projection__scale').first().locator('.projection__notes-fr')).toHaveText('Do · Ré · Mi · Fa · Sol · La · Si');
});

test('measure colors and numbers identify the same scale through a phrase and after transposition', async ({ page }) => {
  await page.goto('/#projection/so-what');
  await expect(page.locator('.projection__bar').nth(0)).toHaveAttribute('data-scale', '0');
  await expect(page.locator('.projection__bar').nth(15)).toHaveAttribute('data-scale', '0');
  await expect(page.locator('.projection__bar').nth(16)).toHaveAttribute('data-scale', '1');
  await expect(page.locator('.projection__bar').nth(23)).toHaveAttribute('data-scale', '1');
  await expect(page.locator('.projection__scale').nth(0)).toHaveAttribute('data-scale', '0');
  await expect(page.locator('.projection__scale').nth(1)).toHaveAttribute('data-scale', '1');
  const firstBar = page.locator('.projection__bar').first();
  const firstScale = page.locator('.projection__scale').first();
  const colors = await page.evaluate(() => {
    const bar = document.querySelector('.projection__bar')!;
    const scale = document.querySelector('.projection__scale')!;
    return [getComputedStyle(bar).getPropertyValue('--scale-color').trim(), getComputedStyle(scale).getPropertyValue('--scale-color').trim()];
  });
  expect(colors[0]).toBe(colors[1]);
  await expect(firstBar.locator('.projection__scale-marker')).toHaveText('1');
  await expect(firstScale.locator('.projection__scale-index')).toHaveText('1');
  await page.getByRole('button', { name: 'Si♭' }).click();
  await expect(firstBar).toHaveAttribute('data-scale', '0');
  await expect(firstScale).toHaveAttribute('data-scale', '0');
});

test('minor ii–V keeps one reference and shows its target note', async ({ page }) => {
  await page.goto('/#projection/nature-boy');
  const cadence = page.locator('.projection__bar').nth(1);
  await expect(cadence.locator('.projection__chord')).toHaveCount(2);
  await expect(cadence).toHaveAttribute('data-scale', '0');
  await expect(cadence.locator('.projection__scale-marker')).toHaveCount(1);
  await expect(cadence.locator('.projection__target-note')).toHaveText('+C#');
  const change = page.locator('.projection__bar').nth(4);
  await expect(change.locator('.projection__chord').nth(0)).toHaveAttribute('data-scale', '0');
  await expect(change.locator('.projection__chord').nth(1)).toHaveAttribute('data-scale', '0');
  await expect(change.locator('.projection__scale-marker').nth(0)).toHaveText('1');
  await expect(change.locator('.projection__scale-marker')).toHaveCount(1);
  await expect(change.locator('.projection__target-note')).toHaveText('+C#');
  await page.getByRole('button', { name: 'Si♭' }).click();
  await expect(cadence.locator('.projection__target-note')).toHaveText('+D#');
});

test('a major ii–V–I is one color and one visible scale card', async ({ page }) => {
  await page.goto('/#projection/blue-bossa');
  const bars = page.locator('.projection__bar');
  for (let index = 8; index < 12; index++) await expect(bars.nth(index)).toHaveAttribute('data-scale', '1');
  await expect(page.locator('.projection__scale')).toHaveCount(2);
  await expect(page.locator('.projection__scale').nth(1)).toContainText('Db majeur');
});

test('projection transposes chart and notes together and retains selection', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('/#projection/blue-bossa');
  await expect(page.locator('.projection__bar').first()).toContainText('Cm');
  await page.getByRole('button', { name: 'Si♭' }).click();
  await expect(page.locator('.projection__bar').first()).toContainText('Dm');
  await expect(page.locator('.projection__scale').first()).toContainText('D mineur naturel');
  await page.keyboard.press('3');
  await expect(page.locator('.projection__bar').first()).toContainText('Am');
  await page.reload();
  await expect(page.getByRole('button', { name: 'Mi♭' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Quitter le mode projection et revenir à la roue' }).click();
  await expect(page.getByRole('button', { name: 'Lancer la roue' })).toBeVisible();
});
