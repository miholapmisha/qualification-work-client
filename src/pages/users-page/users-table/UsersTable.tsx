import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { User } from "../../../types/user"
import RoleCell from "./RoleCell"
import ActionOnUserCell from "./ActionOnUserCell"

type UserTableProps = {
    users: User[],
    onEditUser: (user: User) => void
}

type MetaType = {
    width: string
}

const columnHelper = createColumnHelper<User>()
const getColumns = (onEditUser: (user: User) => void) => {
    return [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: info => info.getValue(),
            meta: { width: 'w-1/5' } as MetaType
        }),
        columnHelper.accessor('roles', {
            header: 'Roles',
            cell: info => <RoleCell roles={info.getValue()} />,
            meta: { width: 'w-1/4' } as MetaType
        }),
        columnHelper.accessor('email', {
            header: 'Email',
            cell: info => info.getValue(),
            meta: { width: 'w-2/5' } as MetaType
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: (context) => {
                const user = context.row.original
                return <ActionOnUserCell onEditClick={() => onEditUser(user)} />
            },
            meta: { width: 'w-1/6' } as MetaType
        })
    ]
}
// const columns = [
//     columnHelper.accessor('name', {
//         header: 'Name',
//         cell: info => info.getValue(),
//         meta: { width: 'w-1/5' } as MetaType
//     }),
//     columnHelper.accessor('roles', {
//         header: 'Roles',
//         cell: info => <RoleCell roles={info.getValue()} />,
//         meta: { width: 'w-1/4' } as MetaType
//     }),
//     columnHelper.accessor('email', {
//         header: 'Email',
//         cell: info => info.getValue(),
//         meta: { width: 'w-2/5' } as MetaType
//     }),
//     columnHelper.display({
//         id: 'actions',
//         header: 'Actions',
//         cell: (context) => {
//             const user = context.row.original
//             return <ActionOnUserCell user={user} />
//         },
//         meta: { width: 'w-1/6' } as MetaType
//     })
// ]

const UsersTable = ({ users, onEditUser }: UserTableProps) => {
    const table = useReactTable({
        data: users,
        columns: getColumns(onEditUser),
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="flex-auto overflow-x-auto w-full">
            <table className={`w-full border-collapse bg-white`}>
                <thead className="bg-primary-100">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className={`border-b border-primary-200 p-4 text-left font-secondary font-medium text-primary-700 ${(header.column.columnDef.meta as MetaType)?.width || ''
                                        }`}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-primary-100">
                    {table.getRowModel().rows.map(row => (
                        <tr
                            key={row.id}
                            className="hover:bg-primary-50 transition-colors duration-150 ease-in-out"
                        >
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className={`p-4 font-main text-primary-800 ${(cell.column.columnDef.meta as MetaType)?.width || ''
                                        }`}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable