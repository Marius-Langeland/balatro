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
        description: '+1 hand every round',
        x: 0,
        y: 2,
    },
    'Yellow deck': {
        description: 'Start with extra $10',
        x: 1,
        y: 2,
    },
    'Green deck': {
        description: 'At end of each Round: <br/> $2 per remaining Hand <br/> $1 per remaining Discard <br/> Earn no Interest',
        x: 2,
        y: 2,
    },
    'Black deck': {
        description: '+1 Joker slot <br/> -1 hand every round',
        x: 3,
        y: 2,
    },
    'Magic deck': {
        description: 'Start run with: <br/> Crystal Ball voucher <br/> 2 copies of The Fool',
        x: 0,
        y: 3,
    },
    'Nebula deck': {
        description: 'Start run with: <br/> Telescope voucher <br/> -1 consumable slot',
        x: 3,
        y: 0,
    },
    'Ghost deck': {
        description: 'Spectral cards may appear in the shop <br/> start with a Hex card',
        x: 6,
        y: 2,
    },
    'Abandoned deck': {
        description: 'Start run with no Face Cards in your deck',
        x: 3,
        y: 3,
    },
    'Checkered deck': {
        description: 'Start run with: <br/> 26 Spades in deck <br/> 26 Hearts in deck',
        x: 1,
        y: 3,
    },
    'Zodiac deck': {
        description: 'Start run with: <br/> Tarot Merchant <br/> Planet Merchant <br/> Overstock',
        x: 3,
        y: 4,
    },
    'Painted deck': {
        description: '+2 hand size <br/> -1 Joker slot',
        x: 4,
        y: 3,
    },
    'Anaglyph deck': {
        description: 'After defeating each Boss Blind: <br/> gain a Double Tag',
        x: 2,
        y: 4,
    },
    'Plasma deck': {
        description: 'Balance Chips and Mult when calculating score for played hand <br/> X2 base Blind size',
        x: 4,
        y: 3,
    },
    'Erratic deck': {
        description: 'All Ranks and Suits in deck are randomized',
        x: 2,
        y: 3,
    },
}