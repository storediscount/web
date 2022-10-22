import data from "../assets/data.json"

export function getObjectByID(id){
    console.log(id)
    return data.find(ele => ele.id === id)
}