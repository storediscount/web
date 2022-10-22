import {List, ListItem} from "konsta/react";

const invoiceList = [
    {
        "id":"1",
        "date": "2022-09-22"
    }
]

export default function UserStoreInvoiceList({ store, user}) {
    return (
        <div>
            <List strongIos outlineIos>
                <ListItem title="" link />
                <ListItem title="Link 2" link />
                <ListItem title="Link 3" link />
            </List>
        </div>
    )
}