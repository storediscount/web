export default function DetailRecord({items, total, discount}) {
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
            <div className={"flex flex-row justify-between"}>
                    <div>
                        折扣
                    </div>
                    <div>
                        -{discount}
                    </div>
                </div>
            <div className="text-xl">Total: ${total-discount}</div>
        </div>
    )
}