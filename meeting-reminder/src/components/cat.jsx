export default function Cat() {
    return (
        <div
            style={{
                width: "500px",
                zIndex: 200,
                position: "fixed"
            }}
        >
            <img
                src="/cat.gif"
                alt="MeetCat"
                style={{
                    width: "500px",
                }}
            />
        </div>
    );
}