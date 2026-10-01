import type { Filters, JazzStandard } from '../types';

export const STYLES = ['New Orleans', 'Swing', 'Bebop', 'Modal', 'Bossa/Latin', 'Soul-Jazz/Funk', 'Ballad'] as const;
export const TEMPOS = ['Lent', 'Medium', 'Rapide'] as const;
export const COMPLEXITIES = ['1 gamme', 'plusieurs gammes'] as const;
export const emptyFilters = (): Filters => ({ styles: [], tempo: [], complexity: [] });

export function parseFilters(saved: string | null): Filters {
  try {
    const value: unknown = JSON.parse(saved ?? 'null');
    if (!value || typeof value !== 'object') return emptyFilters();
    const fields = value as Record<string, unknown>;
    const valid = <T extends string>(input: unknown, allowed: readonly T[]): T[] =>
      Array.isArray(input) ? allowed.filter(item => input.includes(item)) : [];
    return {
      styles: valid(fields.styles, STYLES),
      tempo: valid(fields.tempo, TEMPOS),
      complexity: valid(fields.complexity, COMPLEXITIES),
    };
  } catch { return emptyFilters(); }
}

export function filterStandards(items: JazzStandard[], filters: Filters): JazzStandard[] {
  return items.filter(item =>
    (!filters.styles.length || item.tags.styles.some(style => filters.styles.includes(style))) &&
    (!filters.tempo.length || filters.tempo.includes(item.tags.tempo)) &&
    (!filters.complexity.length || filters.complexity.includes(item.tags.complexity))
  );
}
