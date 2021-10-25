import { FunctionComponent } from "react";

import { useAppSelector as useSelector } from "../../hooks";
import { selectActiveShape, selectShapes } from "../../redux/penSlice";

import Shape from "./shape";

const Shapes: FunctionComponent = () => {

    const shapes = useSelector( selectShapes );
    const activeShape = useSelector( selectActiveShape );

    return (
        <g>
            { activeShape && <Shape shape={ activeShape } /> }
            { shapes?.length && shapes?.map( shape =>
                <Shape
                    key={ shape.id }
                    shape={ shape }
                />
            ) }
        </g>
    );

};

export default Shapes;
