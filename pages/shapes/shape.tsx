import { useState } from "react";
import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { unapplyScaleAndOffset } from "../../redux/artboardSlice";
import { selectDragDistance } from "../../redux/clientSlice";
import { selectAppMode } from "../../redux/modeSlice";
import { activateShape, deactivateShapes, selectActiveShape } from "../../redux/penSlice";

import { Shape as ShapeType } from "../../types";

import { vectorAddition, toPath } from "../../utilities";
import ShapePoint from "./shapePoint";

interface ShapeProps {
    shape: ShapeType;
}

const Shape = ( { shape }: ShapeProps ): JSX.Element => {
    
    const dispatch = useDispatch();

    const mouseDistance = useSelector( selectDragDistance );

    const activeShape = useSelector( selectActiveShape );

    const appMode = useSelector( selectAppMode );

    const unscaleAndUnoffset = useSelector( unapplyScaleAndOffset );

    const isActive = shape.id === activeShape?.id;

    const [ hovering, setHovering ] = useState( false );

    const unscaledShapePoints = shape.points.map( unscaleAndUnoffset );

    return (
        <g>

            <path
                data-name="shape"
                data-shape-id={ shape.id }
                d={ toPath( unscaledShapePoints.map( point => mouseDistance && appMode === "pan" ? vectorAddition( point, mouseDistance ) : point ) ) }
                stroke={ isActive || hovering ? "red" : "black" }
                fill="white"
                onMouseEnter={ () => setHovering( true ) }
                onMouseLeave={ () => setHovering( false ) }
                onClick={ () => dispatch( isActive ? deactivateShapes() : activateShape( shape.id ) ) }
            />

            { isActive && (
                <g>
                    <line
                        x1={ unscaledShapePoints[ 0 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                        y1={ unscaledShapePoints[ 0 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                        x2={ unscaledShapePoints[ 1 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                        y2={ unscaledShapePoints[ 1 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                        stroke="#f00"
                    />
                    <ShapePoint shapeId={ shape.id } pointCoordinates={ unscaledShapePoints[ 0 ] } pointIndex={ 0 } />
                    <ShapePoint shapeId={ shape.id } pointCoordinates={ unscaledShapePoints[ 1 ] } pointIndex={ 1 } />
                    { [ ...Array( unscaledShapePoints.length ) ].reduce( ( result, _, index ) => !( ( index - 2 ) % 3 ) ? [ ...result, index ] : result, [] ).map( ( pointIndex: number ): JSX.Element => <g key={ pointIndex }>
                        <line
                            x1={ unscaledShapePoints[ pointIndex ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                            y1={ unscaledShapePoints[ pointIndex ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                            x2={ unscaledShapePoints[ pointIndex + 1 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                            y2={ unscaledShapePoints[ pointIndex + 1 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                            stroke="#f00"
                        />
                        <line
                            x1={ unscaledShapePoints[ pointIndex + 1 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                            y1={ unscaledShapePoints[ pointIndex + 1 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                            x2={ unscaledShapePoints[ pointIndex + 2 ]?.x + ( mouseDistance && appMode === "pan" ? mouseDistance.x : 0 ) }
                            y2={ unscaledShapePoints[ pointIndex + 2 ]?.y + ( mouseDistance && appMode === "pan" ? mouseDistance.y : 0 ) }
                            stroke="#f00"
                        />
                        <ShapePoint shapeId={ shape.id } pointCoordinates={ unscaledShapePoints[ pointIndex ] } pointIndex={ pointIndex } />
                        <ShapePoint shapeId={ shape.id } pointCoordinates={ unscaledShapePoints[ pointIndex + 1 ] } pointIndex={ pointIndex + 1 } />
                        <ShapePoint shapeId={ shape.id } pointCoordinates={ unscaledShapePoints[ pointIndex + 2 ] } pointIndex={ pointIndex + 2 } />
                    </g> ) }
                </g>
            ) }

        </g>
    );

};

export default Shape;