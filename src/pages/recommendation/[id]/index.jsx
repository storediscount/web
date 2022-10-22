export default function Recommand() {
    return (
        <>
        </>
    )
}

export function getStaticPaths() {
    return {
        paths: [],
        fallback: false
    }
}

export function getStaticProps(context) {
    const { id } = context.params
    return {
        props: {}
    }
}