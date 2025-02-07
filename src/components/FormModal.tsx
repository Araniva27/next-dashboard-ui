"use client"

const FormModal = ({ table, type, data, id } :{
    table: 
    "teacher" 
    | "student" 
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
    type: "create" | "update" | "delete";
    data? : any;
    id: number;
}) => {

    const size = type === "create" ? "h-8 w-8": "h-7 w-7"
    const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky" : "bg-lamaPurple"
    return(
        <>
            <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}></button>
        </>
    )
}

export default FormModal