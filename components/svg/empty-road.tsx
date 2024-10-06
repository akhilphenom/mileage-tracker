import * as React from "react"
import Svg, { G, Circle, Mask, Path, Ellipse, Defs, SvgProps } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function EmptyRoad(props: SvgProps) {
    return (
        <Svg
            width={110}
            height={110}
            viewBox="0 0 110 110"
            fill="none"
            {...props}
        >
            <G filter="url(#filter0_i_1_21049)">
                <Circle cx={55} cy={55} r={55} fill="#95C3BB" />
                <Mask
                    id="a"
                    style={{
                        maskType: "alpha"
                    }}
                    maskUnits="userSpaceOnUse"
                    x={0}
                    y={0}
                    width={110}
                    height={110}
                >
                    <Circle cx={55} cy={55} r={55} fill="#95C3BB" />
                </Mask>
                <G mask="url(#a)">
                    <Mask
                        id="b"
                        style={{
                            maskType: "alpha"
                        }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={110}
                        height={110}
                    >
                        <Circle cx={55} cy={55} r={55} fill="#95C3BB" />
                    </Mask>
                    <G filter="url(#filter1_d_1_21049)" mask="url(#b)">
                        <Mask
                            id="c"
                            style={{
                                maskType: "alpha"
                            }}
                            maskUnits="userSpaceOnUse"
                            x={-5}
                            y={6}
                            width={123}
                            height={46}
                        >
                            <Path
                                d="M117.667 51.803H-4.139V6.152h121.806v45.651z"
                                fill="#D9D9D9"
                            />
                        </Mask>
                        <G mask="url(#c)" fill="#fff">
                            <Circle cx={102.767} cy={46.5406} r={9.56303} />
                            <Circle cx={105.289} cy={35.5394} r={6.56187} />
                            <Circle cx={90.0296} cy={42.1014} r={6.56187} />
                            <Circle cx={74.6174} cy={33.01} r={16.8879} />
                            <Circle cx={51.7456} cy={23.4282} r={13.5493} />
                            <Circle cx={37.2632} cy={36.9775} r={13.5493} />
                            <Circle cx={20.6545} cy={33.9186} r={8.1828} />
                            <Circle cx={8.5542} cy={51.8032} r={14.4829} />
                            <Ellipse cx={55.0474} cy={48.7276} rx={40.5269} ry={18.2613} />
                        </G>
                    </G>
                    <G filter="url(#filter2_d_1_21049)">
                        <Path
                            d="M20.056 44.672V56.45l3.316.862 6.072-2.719.176-9.837a4.782 4.782 0 10-9.564-.085z"
                            fill="#F2F2F2"
                        />
                        <Mask
                            id="d"
                            style={{
                                maskType: "alpha"
                            }}
                            maskUnits="userSpaceOnUse"
                            x={20}
                            y={39}
                            width={10}
                            height={11}
                        >
                            <Path
                                d="M20.122 44.563l-.066 3.94 1.842 1.258 7.67-1.569.057-3.47a4.752 4.752 0 10-9.503-.16z"
                                fill="#F2F2F2"
                            />
                        </Mask>
                        <G mask="url(#d)">
                            <Path
                                d="M30.131 46.416l-10.37-.174.44-5.639 4.136-1.66 3.666.73 1.883 4.22.245 2.523z"
                                fill="#F0E261"
                            />
                        </G>
                    </G>
                    <G filter="url(#filter3_d_1_21049)">
                        <Mask
                            id="e"
                            style={{
                                maskType: "alpha"
                            }}
                            maskUnits="userSpaceOnUse"
                            x={0}
                            y={44}
                            width={110}
                            height={66}
                        >
                            <Path
                                d="M55 110c30.376 0 55-24.624 55-55L55 44.016 0 55c0 30.376 24.624 55 55 55z"
                                fill="#D9D9D9"
                            />
                        </Mask>
                        <G mask="url(#e)">
                            <Path
                                d="M45.072 66.975c17.597-2.52-17.25-5.726-17.477-9.596-.226-3.87 40.296-5.964 40.296-5.964s-20.398 2.468-20.398 4.287 14.566 2.441 32.977 6.26c18.41 3.82 33.08 8.992 33.08 8.992V85.54l-10.367 29.571-72.299 6.366-50.609-44.954c15.733-2.343 50.719-7.532 64.797-9.548z"
                                fill="#D9D9D9"
                            />
                            <G filter="url(#filter4_d_1_21049)">
                                <Path
                                    d="M62.92 65.662c-1.3-1.376-6.99-3.447-10.296-4.238l2.837-.255c.674.142 5.52.863 9.835 2.436 4.315 1.572 6.012 3.234 6.666 4.531l-6.51.203-1.706.053c.355-.011.382-1.449-.827-2.73z"
                                    fill="#fff"
                                />
                            </G>
                            <G filter="url(#filter5_d_1_21049)">
                                <Path
                                    d="M48.466 60.044c-2.382-.576-4.253-1.422-9.228-2.066h2.198c2.88.212 7.43 1.205 9.037 1.734l-2.007.332z"
                                    fill="#fff"
                                />
                            </G>
                            <G filter="url(#filter6_d_1_21049)">
                                <Path
                                    d="M73.49 73.498H63.247c-5.05 17.544-13.833 32.393-17.594 37.624h26.286c4.47-19.315 2.898-33.13 1.553-37.624z"
                                    fill="#fff"
                                />
                            </G>
                        </G>
                    </G>
                </G>
            </G>
            <Defs></Defs>
        </Svg>
    )
}

export default EmptyRoad
