
export type Style = 'New Orleans' | 'Swing' | 'Bebop' | 'Modal' | 'Bossa/Latin' | 'Soul-Jazz/Funk' | 'Ballad';
export type Tempo = 'Lent' | 'Medium' | 'Rapide';
export type Complexity = '1 gamme' | 'plusieurs gammes';
export type AccidentalPreference = '#' | 'b' | 'auto';

export interface ScaleRecommendation {
  root: string; // The note in Concert key (e.g., 'C', 'Eb')
  type: 'major' | 'dorian' | 'mixolydian' | 'minor' | 'blues' | 'pentatonic major' | 'pentatonic minor';
  reason: string;
}

export interface JazzStandard {
  id: string;
  title: string;
  tags: {
    styles: Style[];
    tempo: Tempo;
    complexity: Complexity;
  };
  recommendedScales: ScaleRecommendation[];
}

export interface Filters {
  styles: Style[];
  tempo: Tempo[];
  complexity: Complexity[];
}
