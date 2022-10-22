export default function DetailRecord({items, total}) {
    return(
        <div className={"flex flex-col"}>
            {items.map((item) => (
                <div key={item.name} className={"flex flex-row justify-between"}>
                    <div>
                        {item.name} x {item.number}
                    </div>
                    <div>
                        ${item.cost}
                    </div>
                </div>
            ))}
            <div className="text-xl">Total: ${total}</div>
        </div>
    )
}