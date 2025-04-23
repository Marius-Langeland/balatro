export interface DeckArray {
    [key: string] : DeckData;
}

export interface DeckData{
    description: string,
    x: number,
    y: number,
}

export const deck_list : DeckArray = {
    'Red deck': {
        description: '+1 discard every round',
        x: 0,
        y: 0,
    },
    'Blue deck': {
        description: '+1 discard every round',
        x: 0,
        y: 2,
    },
    'Yellow deck': {
        description: '+1 discard every round',
        x: 1,
        y: 2,
    },
    'Green deck': {
        description: '+1 discard every round',
        x: 2,
        y: 2,
    },
    'Black deck': {
        description: '+1 discard every round',
        x: 3,
        y: 2,
    },
    'Magic deck': {
        description: '+1 discard every round',
        x: 0,
        y: 3,
    },
    'Nebula deck': {
        description: '+1 discard every round',
        x: 3,
        y: 0,
    },
    'Ghost deck': {
        description: '+1 discard every round',
        x: 6,
        y: 2,
    },
    'Abandoned deck': {
        description: '+1 discard every round',
        x: 3,
        y: 3,
    },
    'Checkered deck': {
        description: '+1 discard every round',
        x: 1,
        y: 3,
    },
    'Zodiac deck': {
        description: '+1 discard every round',
        x: 3,
        y: 4,
    },
    'Painted deck': {
        description: '+1 discard every round',
        x: 4,
        y: 3,
    },
    'Anaglyph deck': {
        description: '+1 discard every round',
        x: 3,
        y: 4,
    },
    'Plasma deck': {
        description: '+1 discard every round',
        x: 4,
        y: 3,
    },
    'Erratic deck': {
        description: '+1 discard every round',
        x: 2,
        y: 3,
    },
}