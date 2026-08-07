
// This file contains the shared type directory that will define all fundamental types for music theory.

// Imports
import { BerkleeFingeringType } from "../util/berkleeDictionary";

// Core Music Theory & Chroma Matching
export interface NoteItem {
	name: string;
	chroma: number; // 0 - 11 (C = 0, C#/Db = 1, ...)
}

export type MusicKey = 'C' | 'G' | 'D' | 'A' | 'E' | 'B' | 'F#' | 'Db' | 'Ab' | 'Eb' | 'Bb' | 'F';

export const CHROMA_TO_KEY: Record<number, MusicKey> = {
	0: 'C',  1: 'Db', 2: 'D',  3: 'Eb',
	4: 'E',  5: 'F',  6:'F#',  7:'G',
	8: 'Ab', 9: 'A',  10:'Bb', 11:'B'
};



/**
 * @remarks 'imrp' as in, Index, Middle, Ring, Pinky
 */
export type DotDisplayOption = 'fingers' | 'imrp' | 'notes' | 'numerals' | 'none';

//export type LockMode = 'none' | 'key' | 'position';

// Individual Fretboard Coordinates And Audio Metadata
export interface FretNode {
	stringIndex: number;
	fret: number;
	note: string;
	pitchClass: string;
	
	// Future Proofing for MIDI and Audio Engine
	chroma?: number;
	octave?: number;
	midiNumber?: number | null; // Allow null to match Tonal's output.

	// string: number;
	// fret: number;
	// pitchClass: string;
	//
	// // Future Proofing for MIDI and Audio Engine
	// chroma?: number;
	// octave?: number;
	// midiNumber?: number;
}

// Fingering System (Berklee / Leavitt Position Types)
// export type FingeringType = BerkleeFingeringType | CAGEDFingeringTypes;
export type FingeringType = BerkleeFingeringType;

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



