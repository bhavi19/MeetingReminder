export default function Overlay() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background:"rgba(0,0,0,0.25)",
                backdropFilter: "blur(4px)",
                zIndex: 100,
            }}
        />
    );
}