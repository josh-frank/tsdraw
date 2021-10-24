import { useState } from "react";
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { activateShape, deactivateShapes, selectActiveShape } from "../../redux/penSlice";

import { Shape as ShapeType } from "../../types";

import { toPath } from "../../utilities";
import ShapePoint from "./shapePoint";

interface ShapeProps {
    shape: ShapeType;
}

const Shape = ( { shape }: ShapeProps ): JSX.Element => {
    
    const dispatch = useDispatch();
    const activeShape = useSelector( selectActiveShape );

    const isActive = shape.id === activeShape?.id;

    const [ hovering, setHovering ] = useState( false );

    return (
        <g>

            <path
                data-shape-id={ shape.id }
                d={ toPath( shape.points ) }
                stroke={ isActive || hovering ? "red" : "black" }
                fill="white"
                onMouseEnter={ () => setHovering( true ) }
                onMouseLeave={ () => setHovering( false ) }
                onClick={ () => dispatch( isActive ? deactivateShapes() : activateShape( shape.id ) ) }
            />

            { isActive && (
                <g>
                    <line
                        x1={ shape.points[ 0 ]?.x }
                        y1={ shape.points[ 0 ]?.y }
                        x2={ shape.points[ 1 ]?.x }
                        y2={ shape.points[ 1 ]?.y }
                        stroke="#f00"
                    />
                    <ShapePoint pointCoordinates={ shape.points[ 0 ] } pointIndex={ 0 } />
                    <ShapePoint pointCoordinates={ shape.points[ 1 ] } pointIndex={ 1 } />
                    { [ ...Array( shape.points.length ) ].reduce( ( result, _, index ) => !( ( index - 2 ) % 3 ) ? [ ...result, index ] : result, [] ).map( ( pointIndex: number ): JSX.Element => <g key={ pointIndex }>
                        <line
                            x1={ shape.points[ pointIndex ]?.x }
                            y1={ shape.points[ pointIndex ]?.y }
                            x2={ shape.points[ pointIndex + 1 ]?.x }
                            y2={ shape.points[ pointIndex + 1 ]?.y }
                            stroke="#f00"
                        />
                        <line
                            x1={ shape.points[ pointIndex + 1 ]?.x }
                            y1={ shape.points[ pointIndex + 1 ]?.y }
                            x2={ shape.points[ pointIndex + 2 ]?.x }
                            y2={ shape.points[ pointIndex + 2 ]?.y }
                            stroke="#f00"
                        />
                        <ShapePoint pointCoordinates={ shape.points[ pointIndex ] } pointIndex={ pointIndex } />
                        <ShapePoint pointCoordinates={ shape.points[ pointIndex + 1 ] } pointIndex={ pointIndex + 1 } />
                        <ShapePoint pointCoordinates={ shape.points[ pointIndex + 2 ] } pointIndex={ pointIndex + 2 } />
                    </g> ) }
                </g>
            ) }

        </g>
    );

};

export default Shape;
