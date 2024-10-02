import { LinearGradient } from 'expo-linear-gradient';

export default function LinearGradientBackground() {
    return (
        <LinearGradient
            colors={['#D0EAEA', '#F6F6EC']}
            style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '100%',
                zIndex: 1,
            }}
        />
    );
}
