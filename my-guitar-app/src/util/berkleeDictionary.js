export const berkleeDictionary = {
  major: {
    type1: [
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 } // Root note is here
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      }
    ],
    type1A: [ // 3 Stretches. Root: String 0 (Low E) *Ionian from this root*
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch // Root note is here
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: -1 }, // *Diff from Type 1* // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 }, // *Diff from Type 1*
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      }
    ],
    type1B: [ // 4 Stretches Root: String 1 (A) *Ionian from this root*
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch // Root note is here
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      }
    ],
    type1C: [ // 5 Stretches
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 }
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch // Root note is here
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 }
        ]
      }
    ],
    type1D: [ // 5 Stretches
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 } // Root note is here
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 }
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: -1 }, // Index stretch
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 }
        ]
      }
    ],
    type2: [ // No Stretches
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 }, // Root note is here
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      }
    ],
    type3: [ // No Stretches
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 } // Root note is here
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      }
    ],
    type4: [ // All out-of-position scale tones played with pink stretches
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 } // Root note is here
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 }, // In position, an offset 2 is always played with 3rd finger
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      }
    ],
    // 
    type4A: [ // 2 Pinky Stretches
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: 0 }, // Root
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      }
    ],
    type4B: [ // 4 Pinky Stretches
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: 0 }, // Root
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      }
    ],
    type4C: [ // 5 Pinky Stretches
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      }
    ],
    type4D: [ // 5 Pinky Stretches
      {
        string: 0, // Low E (6th string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 1, // A (5th string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 2, // D (4th string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 3, // G (3rd string)
        notes: [
          { finger: 2, offset: 1 },
          { finger: 4, offset: 3 }
        ]
      },
      {
        string: 4, // B (2nd string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      },
      {
        string: 5, // High E (1st string)
        notes: [
          { finger: 1, offset: 0 },
          { finger: 3, offset: 2 },
          { finger: 4, offset: 4 } // Pinky Stretch
        ]
      }
    ]
  }
};


export const rootDefinitions = {
  type1: { string: 1, offset: 1 },   //     A String, finger 2
  type1A: { string: 0, offset: -1 }, // Low E String, finger 1 
  type1B: { string: 1, offset: -1 }, //     A String, finger 1 
  type1C: { string: 2, offset: -1 }, //     D String, finger 1
  type1D: { string: 0, offset: 2 },  // Low E String, finger 3

  type2: { string: 0, offset: 1 },   // Low E string, finger 2
  type3: { string: 1, offset: 3 },   //     A String, finger 4

  type4: { string: 0, offset: 3 },   // Low E String, finger 4
  type4A: { string: 2, offset: 0 },  //     D String, finger 1 
  type4B: { string: 1, offset: 0 },  //     A String, finger 1
  type4C: { string: 0, offset: 0 },  // Low E String, finger 1
  type4D: { string: 1, offset: 2 },  //     A String, finger 3
}