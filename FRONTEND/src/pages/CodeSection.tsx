export function CodeSection(props) {
    return <div className="flex justify-between ">
        <div className="border rounded-xl p-4 bg-gray-900 w-full mr-4">
        {props.roomCode}
        </div>
        <div onClick={() => {
            copyToClipboard(props.roomCode)
        }} className="border rounded-2xl flex py-4 px-8">
        <button>COPY</button>
        </div>
  </div>
}

function copyToClipboard(room) {
    navigator.clipboard.writeText(room);
  }