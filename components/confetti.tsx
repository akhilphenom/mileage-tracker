import LottieView from 'lottie-react-native'
import React, { useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'

function Confetti() {
    const confettiRef = useRef<LottieView | null>(null);
    useEffect(() => {
        setTimeout(() => {
            confettiRef.current?.play();
        }, 500);
    }, []);
    return (
        <LottieView
            ref={confettiRef}
            source={require('../assets/lottie-files/confetti.json')}
            style={styles.confetti}
            loop={false}
        />
    )
}

const styles = StyleSheet.create({
    confetti: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})

export default Confetti
