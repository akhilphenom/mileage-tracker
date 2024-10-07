import * as React from "react"
import Svg, { G, Ellipse, Defs, SvgProps } from "react-native-svg"

function Clouds(props: SvgProps) {
    return (
        <Svg
            width={132}
            height={71}
            viewBox="0 0 132 71"
            fill="none"
            {...props}
        >
            <G filter="url(#filter0_d_1_22426)" fill="#fff">
                <Ellipse cx={20.5} cy={43.7463} rx={16.5} ry={17.2297} />
                <Ellipse cx={31.5} cy={30.1713} rx={11.5} ry={12.0086} />
                <Ellipse cx={67.5} cy={42.7021} rx={11.5} ry={12.0086} />
                <Ellipse cx={46} cy={44.2684} rx={19} ry={19.8403} />
            </G>
            <G filter="url(#filter1_d_1_22426)" fill="#fff">
                <Ellipse
                    cx={12.5}
                    cy={13.0528}
                    rx={12.5}
                    ry={13.0528}
                    transform="matrix(-1 0 0 1 128 12.942)"
                />
                <Ellipse
                    cx={11.5}
                    cy={12.0086}
                    rx={11.5}
                    ry={12.0086}
                    transform="matrix(-1 0 0 1 84 2.5)"
                />
                <Ellipse
                    cx={11.5}
                    cy={12.0086}
                    rx={11.5}
                    ry={12.0086}
                    transform="matrix(-1 0 0 1 75 15.03)"
                />
                <Ellipse
                    cx={19}
                    cy={19.8403}
                    rx={19}
                    ry={19.8403}
                    transform="matrix(-1 0 0 1 111 6.677)"
                />
            </G>
            <Defs></Defs>
        </Svg>
    )
}

export default Clouds
