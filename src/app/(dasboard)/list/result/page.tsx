import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch"
import { assignmentsData, classesData, examsData, lessonsData, parentsData, resultsData, role, studentsData, subjectsData, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Result = {
    id:number;
    subject:string;    
    class:string;
    teacher: string;
    student: string;
    type: "exam" | "assigment";
    date: string;
    score: number;                    
}

const columns = [
    {
        header: "Subject Name",
        accesor: "name"
    },
    {
        header: "Student", 
        accesor: "student",         
    },
    {
        header: "Score", 
        accesor: "score",
        className: "hidden md:table-cell"
    },
    {
        header: "Teacher", 
        accesor: "teacher", 
        className: "hidden md:table-cell"
    },
    {
        header: "Class", 
        accesor: "class",
        className: "hidden md:table-cell"         
    },                
    {
        header: "Date", 
        accesor: "dueDate", 
        className: "hidden md:table-cell"
    },           
    {
        header: "Actions", 
        accesor: "actions",         
    }
];
const ResultListPage = () => {

    const renderRow = (item:Result) =>(
        <tr key={ item.id } className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">                
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.subject}</h3>                    
                </div>
            </td>
            <td>{item.student}</td>
            <td className="hidden md:table-cell">{item.score}</td>
            <td className="hidden md:table-cell">{item.teacher}</td>
            <td>{item.class}</td>                                                            
            <td className="hidden md:table-cell">{item.date}</td>            
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                        {/* <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                            <Image src="/edit.png" alt="" width={16} height={16}  />
                        </button> */}
                    </Link>
                    {
                        role === "admin"  && (
                            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
                            //     <Image src="/delete.png" alt="" width={16} height={16}  />
                            // </button>
                            <>
                                <FormModal table="result" type="update" data={item} />
                                <FormModal table="result" type="delete" id={item.id} />
                            </>
                        )                        
                    }
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white rounded-md p-4 flex-1 m-4 mt-0">
            {/* TOP */}
            <div className="flex items-center justify-between">
                <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/filter.png" alt="" height={14} width={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/sort.png" alt="" height={14} width={14} />
                        </button>
                        {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                            <Image src="/plus.png" alt="" height={14} width={14} />
                        </button> */}
                        <FormModal table="result" type="create" />
                    </div>
                </div>                
            </div>
            {/* LIST */}
            <div className="">
                <Table columns = {columns} renderRow = {renderRow} data={resultsData} />
            </div>
            {/* PAGINATIOn */}            
            <Pagination />           
        </div>
    )
}

export default ResultListPage