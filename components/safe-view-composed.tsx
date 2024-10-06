import React from 'react'
import SafeView from './safe-view'
import LinearGradientBackground from './linear-gradient'

type IProps = {
    header?: React.ReactNode,
    children: React.ReactNode
}

const ComposedSafeView = ({
    header = null,
    children
}: IProps) => {
    return (
        <>
            <LinearGradientBackground />
            <SafeView>
                {header}
                {children}
            </SafeView>
        </>
    )
}

export default ComposedSafeView