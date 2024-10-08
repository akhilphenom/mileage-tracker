import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function RefuelIcon(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path d="M12 22v-7" stroke="#6EA088" strokeLinejoin="round" />
      <Path
        d="M12 22c1.333-3.6 4-5 7-5 0 3-2.5 5-7 5zM12 22c-1.333-3.6-4-5-7-5 0 3 2.5 5 7 5z"
        fill="#6EA088"
        stroke="#6EA088"
        strokeWidth={0.8}
        strokeLinejoin="round"
      />
      <Path
        d="M16.9 2a1.6 1.6 0 011.6 1.6v9.8a1.6 1.6 0 01-1.6 1.6H7.1a1.6 1.6 0 01-1.6-1.6V3.6A1.6 1.6 0 017.1 2h9.8z"
        fill="#FF8B8B"
        stroke="#FF8B8B"
        strokeWidth={0.8}
        strokeLinejoin="round"
      />
      <Path d="M12.75 8.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" fill="#fff" />
    </Svg>
  )
}

export default RefuelIcon
