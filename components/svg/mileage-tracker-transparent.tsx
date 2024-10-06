import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function MileageTrackerTransparentIcon(props: SvgProps) {
    return (
        <Svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.003 3.56A6.148 6.148 0 005.938.524L5.76.601l1.304 3.015.178-.078a2.883 2.883 0 013.28.676c.796.852.978 2.113.51 3.187l-.056.127 3.015 1.304.012-.028.012.028 3.015-1.304-.055-.127c-.469-1.074-.287-2.335.51-3.187a2.883 2.883 0 013.279-.676l.177.078L22.246.602l-.178-.078a6.148 6.148 0 00-8.065 3.035zM.005 27.907h3.283V.562H.005v27.346zm28 0h-3.283V.562h3.283v27.346zM11.22 11.407c0 1.178-.95 2.134-2.124 2.134a2.13 2.13 0 01-2.124-2.134 2.13 2.13 0 012.124-2.134c1.173 0 2.124.956 2.124 2.134zm7.8 2.134a2.129 2.129 0 002.124-2.134c0-1.178-.95-2.134-2.124-2.134a2.13 2.13 0 00-2.125 2.134 2.13 2.13 0 002.125 2.134z"
                fill="#FF4E4E"
            />
        </Svg>
    )
}

export default MileageTrackerTransparentIcon
