import React from 'react'
import HoveringFab from '../hovering-fab'
import { useRouter } from 'expo-router';

const PopOver = () => {
    const router = useRouter();

    const onClickHandler = () => {
        router.push('(refuelling-record)');
        router.setParams({mode: 'add'})
    }
    return (
        <HoveringFab onPressHandler={onClickHandler} />
    )
}

export default PopOver