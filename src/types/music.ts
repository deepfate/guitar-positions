// This file contains the shared type directory that will define all fundamental types for music theory.

// Core Music Theory & Chroma Matching
export interface NoteItem {
	name: string;
	chroma: number; // 0 - 11 (C = 0, C#/Db = 1, ...)
}

// Individual Fretboard Coordinates And Audio Metadata
export interface FretNode {
	string: number;
	fret: number;
	pitchClass: string;

	// Future Proofing for MIDI and Audio Engine
	chroma?: number;
	octave?: number;
	midiNumber?: number;
}

// Fingering System (Berklee / Leavitt Position Types)
export type FingeringType =
	| 'type1'
	| 'type2'
	| 'type3'
	| 'type4'
	| 'type5'
	| 'type6'
	| 'type7';

export interface RootDefinition {
	string: number;
	offset: number;
}

export type RootDefinitionsMap = Record<FingeringType, RootDefinition>;

// UI & Control Panel Modes
export type LockMode = 'none' | 'position' | 'key';

// Shared App State (for wiring Apps.tsx or Zustrand later)
export interface FretboardState {
	currentKeyName: string;
	position: number;
	fingeringType: FingeringType;
	lockMode: LockMode;
}








