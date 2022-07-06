
import get from 'lodash/get';
import { FC } from 'react';
import * as _ from 'lodash'

interface ITableProps
{
    isLoading: boolean,
    isNo?: boolean,
    pageSize?: number,
    initialPage?: number,
    columns: Array<any>,
    data: Array<any>,
    onRowClick?: () => void
}

interface IArray<T>
{
    data?: T[]
}

interface ICellProps
{
    accessor?: any,
    data?: IArray<any>,
    onClick?: () => void,
    className?: string

}

const TableCell = (props: ICellProps) =>
{
    const { accessor, data, onClick, className } = props;
    const label = typeof accessor === 'function' ? accessor(data) : get(data, accessor);
    return (
        <td onClick={onClick} className={className}>
            {label || ''}
        </td>
    );
};
export const BasicTable: FC<ITableProps> = (props) =>
{

    const {
        isLoading = false,
        isNo = true,
        pageSize = 10,
        initialPage = 1,
        onRowClick,
        columns,
        data,

    } = props
    const tableStyle = {
        tableWrapper: `w-full clear-both`,
        tableContain: `w-full text-left border-separate border-spacing-0`,
        tableHeader: `table-header-group align-middle border-inherit`,
        tableColHead: `position-relative text-zinc-900 bg-slate-200 font-medium bg-slate-50 `,
        tableBody: `table-row-group align-middle border-inherit`,
        tableRow: `table-row`,
        tableCol: `position-relative text-zinc-900 font-medium bg-slate-50`
    }
 

    console.log("data", data)

    return (
        <div className={tableStyle.tableWrapper}>
            <table className={tableStyle.tableContain}>
                <thead className={tableStyle.tableHeader}>
                    <tr>
                        {isNo ? <th className={tableStyle.tableColHead}>No</th> : null}

                        {
                            _.map(columns, ({ label }, index) =>
                            {
                                return (
                                    <th key={index} className={tableStyle.tableColHead}>{label}</th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody className={tableStyle.tableBody}>
                    {
                        _.size(data) > 0 && !isLoading ? (
                            _.map(data, (d, index) => (
                                <tr className={tableStyle.tableRow} key={index}>
                                    {isNo && (
                                        <td className="align-middle text-center">{index + 1 + pageSize * (initialPage - 1)}</td>
                                    )}

                                    {_.map(columns, ({ accessor, cellClickable = true }, i) => (
                                        <TableCell
                                            key={i}
                                            className={tableStyle.tableCol}
                                            onClick={cellClickable && onRowClick ? () => onRowClick(d) : undefined}
                                            accessor={accessor}
                                            data={d}
                                        />
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>

                                {isLoading ? <p>Loading...</p> : <p>No record</p>}

                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}


// import Pagination from './Pagination';
// import CustomDropdown from './CustomDropdown';
// import { Dropdown } from 'react-bootstrap';
// import get from 'lodash/get';

// function TableList(props) {
//   const {
//     columns,
//     isLoading,
//     data,
//     totals,
//     onChangePage,
//     initialPage = 1,
//     pageSize = 10,
//     isSetting = true,
//     isNo = true,
//     onRowClick,
//     isEdit = true,
//     isView = true,
//     isDelete = true,
//     onEdit,
//     onView,
//     isStatus = false,
//     changeStatus
//   } = props;

//   const colSpan = !(isSetting && isNo) ? (isSetting || isNo ? 1 : 0) : 2;

//   const TableCell = props => {
//     const { accessor, data, onClick } = props;
//     const label = typeof accessor === 'function' ? accessor(data) : get(data, accessor);
//     return (
//       <td onClick={onClick} className="align-middle">
//         {label || ''}
//       </td>
//     );
//   };

//   return (
//     <>
//       <div className="table-responsive">
//         <table className="table cmcb-table-list">
//           <thead>
//             <tr>
//               {isNo ? <th className="text-center">No</th> : null}
//               {columns.map(({ label }, index) => (
//                 <th key={index}>{label}</th>
//               ))}
//               {isSetting ? <th className="text-center">Setting</th> : null}
//             </tr>
//           </thead>
//           <tbody>
//             {data?.length && !isLoading ? (
//               data.map((d, index) => (
//                 <tr key={index}>
//                   {isNo ? (
//                     <td className="align-middle text-center">{index + 1 + pageSize * (initialPage - 1)}</td>
//                   ) : null}
//                   {columns.map(({ accessor, cellClickable = true }, i) => (
//                     <TableCell
//                       onClick={cellClickable && onRowClick ? () => onRowClick(d) : undefined}
//                       key={i}
//                       accessor={accessor}
//                       data={d}
//                     />
//                   ))}
//                   {isSetting ? (
//                     <td className="text-center align-middle">
//                       <CustomDropdown
//                         Toggle={
//                           <img className="img-fluid icons-setting" src="/images/icons/setting.png" alt="setting" />
//                         }
//                         Menu={
//                           <>
//                             {isView && d.status !== 'Inactive' && (
//                               <Dropdown.Item onClick={() => onView(d)}>View</Dropdown.Item>
//                             )}
//                             {isEdit && d.status !== 'Inactive' && (
//                               <Dropdown.Item onClick={() => onEdit(d)}>Edit</Dropdown.Item>
//                             )}
//                             {isStatus && (
//                               <Dropdown.Item onClick={() => changeStatus(d)}>
//                                 {d.status !== 'Inactive' ? 'Inactive' : 'Active'}
//                               </Dropdown.Item>
//                             )}
//                           </>
//                         }
//                       />
//                     </td>
//                   ) : null}
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={columns.length + colSpan} className="text-center">
//                   {isLoading ? <p>Loading...</p> : <p>No record</p>}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {totals <= pageSize ? null : (
//         <Pagination totals={totals} onChangePage={onChangePage} initialPage={initialPage} pageSize={pageSize} />
//       )}
//     </>
//   );
// }

// export default TableList;

