module.exports = {
    countUsingMath: (s) => {
        /**
         * Once transision points are found, use the distance between
         * transisions to calculate total matches
         */

        let transitions = module.exports.getTransitions(s);

        let matches = 0;
        matches += transitions.length;  // every transition is a match!

        // for each tranition...
        for (let i = 0; i < transitions.length; i++) {
            let leftSide = transitions[i];
            let leftLook = (i == 0) ? -1 : transitions[i - 1];

            let rightSide = transitions[i] + 1;
            let rightLook = (i == transitions.length - 1) ? s.length - 1 : transitions[i + 1];

            // console.log(`Looking at trans at ${transitions[i]}-${transitions[i] + 1}`);
            // console.log(`${leftLook}<--${leftSide}-${rightSide}-->${rightLook}`);

            // calulate the disance to the next nearest transition, the min of which 
            //   is your additional matches
            var moreMatches = Math.min(
                Math.max(0, leftSide - leftLook - 1),
                Math.max(0, rightLook - rightSide)
            );

            // console.log(`Found ${moreMatches} more matches!`);

            matches += moreMatches;
        }

        return matches;
    },
    countUsingMatchingLogic: (s) => {
        /**
         * Find transitions, then starting from each transition point zoom out
         * and compare the left and right of the new range to the original pair.
         * For each zoom out, as long as the edges match the original, that's a match.
         */
        let transitions = module.exports.getTransitions(s);

        var matches = 0;

        // console.log(`Transitions at pos: ${transitions}`);

        for (let j = 0; j < transitions.length; j++) {
            matches++;  // every transition should count!

            // console.log(`Looking at transition: ${transitions[j]}-${transitions[j] + 1}`);

            let lowerLimit = (j == 0) ? -1 : transitions[j - 1];
            let upperLimit = (j == transitions.length - 1) ? s.length : transitions[j + 1] + 1;

            // console.log(`Lower,Upper zoom limit: ${lowerLimit},${upperLimit}`);

            let left = transitions[j];
            let right = left + 1;

            let leftVal = s.charAt(left);
            let rightVal = s.charAt(right);

            let zoomOut = 1;
            while ((lowerLimit < (left - zoomOut))   // do not hit zoom limit
                && ((right + zoomOut) < upperLimit)  // do not hit zoom limit
                && (s.charAt(left - zoomOut) == leftVal)  // ensure edge matches inner
                && (s.charAt(right + zoomOut) == rightVal)) {
                //console.log("Match! Zooming out, trying again");
                zoomOut++;
                matches++;
            }
        }

        return matches;
    },
    getTransitions: (s) => {
        // Array containing left position of each transition between 0 & 1
        var nodeChanges = [];
        var len = s.length;

        for (let i = 0; i < len; i++) {
            if (i < len - 1 && s.charAt(i) != s.charAt(i + 1))
                nodeChanges.push(i);
        }

        return nodeChanges;
    }
};