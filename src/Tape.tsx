import React, { useState } from 'react';
import { IoArrowDownSharp } from "react-icons/io5";
import './Tape.css';


interface CellObj {
    val: String | undefined;
    cur: boolean;
}

const Cell : React.FC<CellObj> = ({val, cur}) => {
    let cellVal = val !== undefined ? val : "";
    if (!cur) {
        return (
            <div className='cell'>
                
                {cellVal}
            </div>
        );
    }
    return (
        <div id='current' className='cell'>
            <div id="arrow">
                <IoArrowDownSharp id='arrow-icon' />
            </div>
            {cellVal}
        </div>
    );
}


interface TapeObj {
    tapeAlphabet : String[];
}

const Tape : React.FC<TapeObj> = ({tapeAlphabet}) => {
    // Initial tape length
    let tapeLength = 20;

    let visibleRange = 9;

    let initialCells : CellObj[] = Array.from({ length : tapeLength}, () => ({
        val: undefined,
        cur: false
    }))

    let [cells, setCells] = useState<CellObj[]>(initialCells);
    let [curPos, setCurPos] = useState<number>(0);

    const movePointer = (left : boolean) => {
        console.log(curPos);

        const updatedCells = [...cells];
        updatedCells[curPos].cur = false;

        let newCurPos : number;

        if (left) {
            newCurPos = Math.max(0, curPos - 1);
        } else {
            newCurPos = curPos + 1;
            if (newCurPos >= cells.length) {
                updatedCells.push({ val: undefined, cur: false });
            }
        }
        
        updatedCells[newCurPos].cur = true;
        setCurPos(newCurPos);
        setCells(updatedCells);
    
    };

    const writeToCell = (newVal : any) => {
        if (!tapeAlphabet.includes(newVal)) {
            return;
        }
        const updatedCells = [...cells];
        updatedCells[curPos].val = newVal;
        setCells(updatedCells);
    
    }

    const start = Math.max(0, curPos - Math.floor(visibleRange / 2));
    const end = Math.min(cells.length, start + visibleRange);
    const visibleCells = cells.slice(start, end);

    return (
        <div className='tape-container'>
            <div className='tape'>
                <div className='cell-container' style={{ marginLeft: `${32 - (Math.min(curPos,4))*8}rem` }}>
                    {visibleCells.map((cell, index) => (
                        <Cell key={index} val={cell.val} cur={start + index === curPos} />
                    ))}
                </div>
            </div>
            <button id="left" onClick={ () => movePointer(true)}>&lt;</button>
            <button id="right" onClick={ () => movePointer(false)}>&gt;</button>
        </div>

    );
}

export default Tape;