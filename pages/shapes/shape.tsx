import { useState } from "react";
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { activateShape, deactivateShapes, selectActiveShape } from "../../redux/penSlice";

import { Coordinates } from "../../types";

import { toPath } from "../../utilities";

interface ShapeProps {
    path: Coordinates[];
    shapeIndex: number;
}

const Shape = ( { path, shapeIndex }: ShapeProps ): JSX.Element => {
    
    const dispatch = useDispatch();
    const activeShapeIndex = useSelector( selectActiveShape );

    const isActive = shapeIndex === activeShapeIndex;

    const [ hovering, setHovering ] = useState( false );

    return (
        <g>
            <path
                d={ toPath( path ) }
                stroke={ isActive || hovering ? "red" : "black" }
                fill="white"
                onMouseEnter={ () => setHovering( true ) }
                onMouseLeave={ () => setHovering( false ) }
                onClick={ () => dispatch( isActive ? deactivateShapes() : activateShape( shapeIndex ) ) }
            />
            { isActive && (
                <g>
                    <circle cx={ path[ 0 ]?.x } cy={ path[ 0 ]?.y } r="5" fill="#f00" />
                    <circle cx={ path[ 1 ]?.x } cy={ path[ 1 ]?.y } r="5" fill="#f00" />
                    <line
                        x1={ path[ 0 ]?.x }
                        y1={ path[ 0 ]?.y }
                        x2={ path[ 1 ]?.x }
                        y2={ path[ 1 ]?.y }
                        stroke="#f00"
                    />
                    { [ ...Array( path.length ) ].reduce( ( result, _, index ) => !( ( index - 2 ) % 3 ) ? [ ...result, index ] : result, [] ).map( ( pointIndex: number ): JSX.Element => <g key={ pointIndex }>
                        <circle cx={ path[ pointIndex ]?.x } cy={ path[ pointIndex ]?.y } r="5" fill="#f00" />
                        <circle cx={ path[ pointIndex + 1 ]?.x } cy={ path[ pointIndex + 1 ]?.y } r="5" fill="#f00" />
                        <circle cx={ path[ pointIndex + 2 ]?.x } cy={ path[ pointIndex + 2 ]?.y } r="5" fill="#f00" />
                        <line
                            x1={ path[ pointIndex ]?.x }
                            y1={ path[ pointIndex ]?.y }
                            x2={ path[ pointIndex + 2 ]?.x }
                            y2={ path[ pointIndex + 2 ]?.y }
                            stroke="#f00"
                        />
                    </g> ) }
                </g>
            ) }
        </g>
    );

};

export default Shape;
