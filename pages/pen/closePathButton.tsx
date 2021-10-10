import { useState } from "react"

const ClosePathButton = ( props: any ): JSX.Element => {

    const [ showPopup, setShowPopup ] = useState( false );

    return (
        <g>
            <circle
                cx={ props.cx }
                cy={ props.cy }
                r="7"
                fill="#FFF"
                stroke="red"
                onMouseEnter={ () => setShowPopup( true ) }
                onMouseLeave={ () => setShowPopup( false ) }
                onClick={ props.closePath }
            />
            { showPopup && <g>
                <rect x={ props.cx } y={ props.cy } width="60" height="15" fill="#f00" transform="translate( 10 -10 )" />
                <text
                    x={ props.cx }
                    y={ props.cy }
                    fill="white"
                    transform="translate( 15 0 )"
                    style={ { fontSize: "10px", fontWeight: "bold" } }
                >
                    Close path
                </text> 
            </g> }
        </g>
    );

}

export default ClosePathButton;