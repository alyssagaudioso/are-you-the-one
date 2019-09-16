import { names, noMatchPairs } from "./names";
import { Combination, Pair, IDPair } from "./types";
import { generatePairString, eqSet } from "./helpers";

export const generateCombs = (pairs: IDPair[], pairStringToIdMap: Record<string, number>) => {
    const combinations: Combination[] = [];
    const namesForCombs: string[] = [...names];
    
    const noMatchIds: number[] = noMatchPairs.map((noMatchPair) => {
        let noMatchId: number;
        
        pairs.forEach(({ pair, id }) => {
          if (eqSet(noMatchPair, pair)) {
            noMatchId = id;
            return;
          }
        });

        return noMatchId;
    });

    const generate = (unpairedNames: string[], builtPairs: Combination) => {
        if (!unpairedNames.length) {
            combinations.push(builtPairs);
            return;
        }
        const n = unpairedNames.pop();
        unpairedNames.forEach((val) => {
            const copy = [...unpairedNames];
            const pair: Pair = new Set();
            pair.add(n);
            pair.add(val);
            copy.splice(copy.indexOf(val), 1);
            builtPairs.push(pair);
            const pairString = generatePairString(pair);
            const setId = pairStringToIdMap[pairString];

            if (!noMatchIds.includes(setId)) {
                generate(copy, builtPairs);
            } 
        });
    }

    generate(namesForCombs, []);

    return {
        combinations
    }
}