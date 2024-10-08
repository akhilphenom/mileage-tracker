import { JSX } from 'react';
import Svg, { Circle, Path } from 'react-native-svg'

export const MileageTrackerIcon = (props: JSX.IntrinsicAttributes) => {
    return (
        <Svg
            width={150}
            height={149}
            fill="none"
            {...props}
        >
            <Circle cx={75} cy={74.5} r={74.5} fill="#fff" />
            <Path
            fill="#FF4E4E"
            fillRule="evenodd"
            d="M74.492 47.406a15.905 15.905 0 0 1 2.835-4.22c4.773-5.1 12.093-6.585 18.478-3.8l.47.205-3.447 7.967-.47-.205c-2.994-1.305-6.427-.608-8.665 1.785-2.104 2.253-2.586 5.585-1.347 8.422l.145.335-7.967 3.447-.032-.072-.03.072-7.968-3.447.145-.335c1.238-2.837.757-6.17-1.348-8.422-2.237-2.393-5.67-3.09-8.665-1.785l-.47.205-3.446-7.967.47-.205c6.384-2.785 13.704-1.3 18.477 3.8a15.903 15.903 0 0 1 2.835 4.22ZM37.5 111.751h8.676V39.486H37.5v72.265Zm73.995 0h-8.675V39.486h8.675v72.265ZM67.14 68.145c0 3.114-2.512 5.639-5.613 5.639-3.1 0-5.613-2.525-5.613-5.64 0-3.113 2.513-5.639 5.613-5.639 3.101 0 5.613 2.526 5.613 5.64Zm20.612 5.639c3.102 0 5.614-2.525 5.614-5.64 0-3.113-2.512-5.639-5.614-5.639-3.1 0-5.613 2.526-5.613 5.64s2.514 5.639 5.614 5.639Z"
            clipRule="evenodd"
            />
        </Svg>
    );
}