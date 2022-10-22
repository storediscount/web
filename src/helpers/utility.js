import data from "../assets/data.json"

export function getObjectByID(id){
    return data.find(ele => ele.id.toString() === id.toString())
}