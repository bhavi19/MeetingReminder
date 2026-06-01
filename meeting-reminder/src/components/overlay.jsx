export default function Overlay() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background:"rgba(0,0,0,0.18)",
                backdropFilter: "blur(2px)",
                zIndex: 100,
            }}
        />
    );
}