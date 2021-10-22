import React, { useEffect, useMemo } from 'react'
import { CellRelative, GameContainerRelative, IndividualPattern, PatternCarousel } from '../../styles/gameOfLifeStyles'
import { patternList } from './GOLPatterns'


interface IGOLPatternCarousel {
    loadPattern: (pattern?: number[][]) => void
}

const GOLPatternCarousel:React.FC<IGOLPatternCarousel> = ( {loadPattern}) => {

    useEffect(() => {
        console.log('carousel')
    })


    const memoizedValue = useMemo(() => {
        return (
            <PatternCarousel>
                {patternList.map(pattern => (
                            <IndividualPattern
                                key={`${pattern}-preview`}
                                cols={35}
                                cellSize={5}
                            >
                                <GameContainerRelative
                                rows={pattern.length}
                                cols={pattern[0].length}
                                cellSize={5}
                                onClick={() => loadPattern(pattern)}
                            >
                                
                                {
                                pattern.map((row, i) => (
                                    row.map((col,j) => (
                                        <CellRelative
                                            cellSize={5}
                                            key={`$${pattern}-{i}-${j}`}
                                            style={{
                                                height: `${5}px`,
                                                width: `${5}px`,
                                                left: `${5 * j}px`,
                                                top: `${5 * i}px`,
                                                backgroundColor: `${col === 0 ? '#1E1E1E' : '#E0E0E0'}`,
                                            }}
                                        />
                                    ))
                                ))
                            }
                            </GameContainerRelative>
                            </IndividualPattern>
                        ))}
            </PatternCarousel>
        )
    },[]);

    return memoizedValue

    
}

function areEqual(prev:IGOLPatternCarousel, next:IGOLPatternCarousel){
    return prev === next;
}

export const MemoiszedGOLPatternCarousel = React.memo(GOLPatternCarousel, )


// export default React.memo(GOLPatternCarousel)