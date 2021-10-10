import { FunctionComponent } from "react";

import { useAppDispatch as useDispatch, useAppSelector as useSelector } from "../../hooks";
import { activateShape, deactivateShapes, selectActiveShape, selectShapes } from "../../redux/penSlice";
import { toPath } from "../../utilities";

const Shapes: FunctionComponent = () => {

    const dispatch = useDispatch();

    const shapes = useSelector( selectShapes );
    const activeShapeIndex = useSelector( selectActiveShape );

    return (
        <g>
            { shapes?.length && shapes?.map( ( shape, index ) => <path
                key={ index }
                d={ toPath( shape ) }
                stroke={ index === activeShapeIndex ? "red" : "blue" }
                fill="white"
                onClick={ () => dispatch( index === activeShapeIndex ? deactivateShapes() : activateShape( index ) ) }
            /> ) }
        </g>
    );

};

export default Shapes;