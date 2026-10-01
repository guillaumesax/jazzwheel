import { test, expect } from '@playwright/test';
import { JAZZ_STANDARDS } from '../data/tunes';

const noOverflow = async (page: import('@playwright/test').Page) => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
};

test('manual selection, transposition, reload and browser navigation', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'Sélection', exact: true }).click();
  await page.getByRole('button', { name: /^Blue Bossa/ }).click();
  await page.getByRole('button', { name: 'AFFICHER LA GRILLE ET LES GAMMES' }).click();
  await expect(page.getByRole('heading', { name: 'Blue Bossa', exact: true })).toBeVisible();
  await expect(page.locator('.projection__bar')).toHaveCount(16);
  await expect(page.getByText('Db majeur', { exact: true })).toBeVisible();
  await expect(page.getByText('D locrien', { exact: true })).toBeVisible();
  await noOverflow(page);
  await page.getByRole('button', { name: 'Dièses' }).click();
  await expect(page.getByText('C# majeur', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'GRILLE' })).toBeVisible();
  await expect(page.locator('.projection__chart')).toContainText('G7#9');
  await page.getByRole('button', { name: 'Si♭' }).click();
  await expect(page.locator('.projection__chart')).toContainText('A7#9');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Blue Bossa', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Dièses' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Quitter le mode projection et revenir à la roue' }).click();
  await expect(page.getByRole('button', { name: 'Sélection', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Blue Bossa', exact: true })).toBeVisible();
  expect(errors).toEqual([]);
});

test('filters clear stale selection and provide an empty state', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Sélection', exact: true }).click();
  await page.getByRole('button', { name: /^All of Me Swing/ }).click();
  await page.getByRole('button', { name: 'Filtres', exact: true }).click();
  await page.getByRole('button', { name: 'New Orleans', exact: true }).click();
  await expect(page.getByRole('button', { name: 'AFFICHER LA GRILLE ET LES GAMMES' })).toHaveCount(0);
  await expect(page.getByText('Aucun standard ne correspond à vos filtres.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Roue', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Lancer la roue' })).toBeDisabled();
  await page.getByRole('button', { name: 'Réinitialiser' }).click();
  await expect(page.getByRole('button', { name: 'Lancer la roue' })).toBeEnabled();
  await noOverflow(page);
});

test('spin locks filters, survives a parent update, and matches the pointer', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Lancer la roue' }).click();
  await expect(page.getByRole('button', { name: 'Sélection', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Filtres', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Swing', exact: true })).toBeDisabled();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible({ timeout: 8000 });
  const winner = await dialog.getByRole('heading').textContent();
  const pointerIndex = await page.locator('canvas').evaluate((canvas, count) => {
    const rotation = parseFloat(canvas.style.transform.slice(7));
    const tau = 2 * Math.PI;
    return Math.floor(((-rotation % tau) + tau) % tau / (tau / count));
  }, JAZZ_STANDARDS.length);
  expect(winner).toBe(JAZZ_STANDARDS[pointerIndex].title);
  await expect(dialog.getByRole('button', { name: 'AFFICHER LA GRILLE ET LES GAMMES' })).toBeFocused();
  await noOverflow(page);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await page.getByRole('button', { name: 'Lancer la roue' }).click();
  await expect(page.getByRole('dialog')).toBeVisible({ timeout: 8000 });
  await page.getByRole('button', { name: 'REJOUER' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('invalid preferences and denied storage do not crash the app', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('jazz_filters', '{broken');
    localStorage.setItem('jazz_mode', 'invalid');
    localStorage.setItem('accidental_pref', 'invalid');
  });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Lancer la roue' })).toBeEnabled();
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
  });
  await page.reload();
  await expect(page.getByRole('button', { name: 'Lancer la roue' })).toBeEnabled();
  await page.getByRole('button', { name: 'Sélection', exact: true }).click();
  await page.getByRole('button', { name: /^Blue Bossa/ }).click();
  await page.getByRole('button', { name: 'AFFICHER LA GRILLE ET LES GAMMES' }).click();
  await expect(page.getByRole('heading', { name: 'Blue Bossa', exact: true })).toBeVisible();
});

test('reduced motion gives an immediate result, including a single candidate', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Filtres', exact: true }).click();
  await page.getByRole('button', { name: 'Bebop', exact: true }).click();
  await page.getByRole('button', { name: 'Lancer la roue' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible({ timeout: 1000 });
  await expect(dialog.getByRole('heading')).toHaveText('Mr PC');
  await dialog.getByRole('button', { name: 'AFFICHER LA GRILLE ET LES GAMMES' }).click();
  await expect(page.getByRole('heading', { name: 'Mr PC', exact: true })).toBeVisible();
  await expect(page.locator('.projection__bar')).toHaveCount(12);
  await expect(page.locator('.projection__scale')).toHaveCount(JAZZ_STANDARDS.find(tune => tune.id === 'mr-pc')!.recommendedScales.length);
  await page.getByRole('button', { name: 'Quitter le mode projection et revenir à la roue' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Lancer la roue' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Bebop', exact: true })).toHaveAttribute('aria-pressed', 'true');
});
