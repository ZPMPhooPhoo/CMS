import React from "react";

type listProps ={
    name:string;
}

export const List: React.FC<listProps> =({name}) =>{
    return (
        <>
        <li>{name}</li>
        </>
    )
}