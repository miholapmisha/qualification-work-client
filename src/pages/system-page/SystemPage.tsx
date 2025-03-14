import { Outlet } from "react-router-dom";
import Button from "../../components/ui/Button";
import { Category, CategoryType } from "../../types/category";

// const universityCategories: Category[] = [
//     {
//         name: "Faculty of Computer Science",
//         type: CategoryType.FACULTY,
//         children: [
//             {
//                 name: "Software Engineering",
//                 type: CategoryType.SPECIALTY,
//                 children: [
//                     {
//                         name: "Bachelor's Degree",
//                         type: CategoryType.DEGREE,
//                         children: [
//                             {
//                                 name: "1",
//                                 type: CategoryType.YEAR,
//                                 children: [
//                                     { name: "Group SE-101", type: CategoryType.GROUP, children: [] },
//                                     { name: "Group SE-102", type: CategoryType.GROUP, children: [] },
//                                 ],
//                             },
//                             {
//                                 name: "2",
//                                 type: CategoryType.YEAR,
//                                 children: [
//                                     { name: "Group SE-201", type: CategoryType.GROUP, children: [] },
//                                     { name: "Group SE-202", type: CategoryType.GROUP, children: [] },
//                                 ],
//                             },
//                             {
//                                 name: "3",
//                                 type: CategoryType.YEAR,
//                                 children: [
//                                     { name: "Group SE-301", type: CategoryType.GROUP, children: [] },
//                                 ],
//                             },
//                             {
//                                 name: "4",
//                                 type: CategoryType.YEAR,
//                                 children: [
//                                     { name: "Group SE-401", type: CategoryType.GROUP, children: [] },
//                                 ],
//                             },
//                         ],
//                     },
//                     {
//                         name: "Master's Degree",
//                         type: CategoryType.DEGREE,
//                         children: [
//                             {
//                                 name: "1",
//                                 type: CategoryType.YEAR,
//                                 children: [
//                                     { name: "Group SE-M1", type: CategoryType.GROUP, children: [] },
//                                 ],
//                             },
//                             {
//                                 name: "2",
//                                 type: CategoryType.YEAR,
//                                 children: [
//                                     { name: "Group SE-M2", type: CategoryType.GROUP, children: [] },
//                                 ],
//                             },
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         name: "Faculty of Business and Economics",
//         type: CategoryType.FACULTY,
//         children: [
//             {
//                 name: "Finance",
//                 type: CategoryType.SPECIALTY,
//                 children: [
//                     {
//                         name: "Bachelor's Degree",
//                         type: CategoryType.DEGREE,
//                         children: [
//                             {
//                                 name: "1",
//                                 type: CategoryType.YEAR,
//                                 children: [
//                                     { name: "Group FIN-101", type: CategoryType.GROUP, children: [] },
//                                 ],
//                             },
//                             {
//                                 name: "2",
//                                 type: CategoryType.YEAR,
//                                 children: [
//                                     { name: "Group FIN-201", type: CategoryType.GROUP, children: [] },
//                                 ],
//                             },
//                         ],
//                     },
//                 ],
//             },
//         ],
//     },
// ];

const SystemPage = () => {



    return (
        <div className="flex-auto rounded-2xl bg-primary-50 overflow-y-auto p-16 space-y-10 flex flex-col">
            <h1 className="font-secondary text-6xl">University categories</h1>
            <Outlet/> 
            {/* <div className="flex-1 flex flex-col items-center px-14 pt-12 pb-5 border-1 rounded-xl border-primary-400 w-full space-y-4">
                <div className="flex-auto min-w-full flex flex-col font-secondary">
                    <h1 className="m-auto text-primary-300 text-4xl lowercase">no faculties in your system</h1>
                </div>
                <div className="max-w-[132px]">
                    <Button>+ Add faculty</Button>
                </div>
            </div> */}

        </div>
    )
}



export default SystemPage