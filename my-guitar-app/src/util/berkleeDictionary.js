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
    ]
  }
};