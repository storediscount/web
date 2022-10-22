export default function DetailRecord({items, total}) {
    return(
        <>
            {items.map((item) => (
                <div key={item.name}>
                    <div className="float-left">
                        {item.name} x {item.number}
                    </div>
                    <div className="float-right">
                        {item.cost}
                    </div>
                </div>
            ))}
            <div className="text-xl">Total: {total}</div>
        </>
    )
}