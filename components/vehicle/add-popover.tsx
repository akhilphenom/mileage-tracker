import React from 'react'
import { useRouter } from 'expo-router'
import HoveringFab from '../hovering-fab'

const PopOver = () => {
    const router = useRouter();
    const onPressHandler = () => {
        router.push('(add-vehicle)')
    }

    return <HoveringFab onPressHandler={onPressHandler}/>
}

export default PopOver