import CustomSelect from "./CustomSelect.jsx";
import {Plus, Table, Trash2} from "lucide-react";

export const textareaType = (row, column, currentValue, updateCell) => {
    return (
        <textarea
            value={currentValue}
            onChange={(e) => updateCell(row.id, column.key, e.target.value)}
            placeholder={column.placeholder}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={2}
        />
    );
}

export const textType = (row, column, currentValue, updateCell) => {
    return (
        <input
            type="text"
            value={currentValue}
            onChange={(e) => updateCell(row.id, column.key, e.target.value)}
            placeholder={column.placeholder}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    )
}


export const selectType = (column, currentValue, updateCell) => {
    return (
        <CustomSelect
            value={currentValue}
            onChange={(newValue) => updateCell(row.id, column.key, newValue)}
            options={column.options || []}
            placeholder={column.placeholder}
        />
    );
}


function DataTables ({data, onChange, title}) {
    const createEmptyRow = (rowId) => ({
        id: rowId,
        ...Object.fromEntries(data.columns.map(col => [col.key, '']))
    })

    // Adds an empty row.
    const addRow = () => {
        // Allows unique ID per timestamp.
        const uniqueId = `row-${Date.now()}`;
        onChange({
            ...data,
            rows: [...data.rows, createEmptyRow(uniqueId)]
        });
    };

    // Remove the row.
    const removeRow = (rowId) => {
        const updatedRows = data.rows.filter(row => row.id !== rowId)
        onChange({
            ...data,
            rows: updatedRows
        })

    }

    // Update the cell.
    const updateCell = (rowId, columnKey, newValue) => {
        const updateRows = data.rows.map(row => {
            if (row.id === rowId) {
                return {
                    ...row,
                    [columnKey]: newValue
                };
            }

            return row;
        })

        onChange({
            ...data,
            rows: updateRows
        });
    }

    const renderCell = (row, column) => {
        const currentValue = row[column.key] || "";

        switch(column.type) {
            case 'textarea':
                return textareaType(row, column, currentValue, updateCell)
            case 'select':
                return selectType(row, column, currentValue, updateCell)
            case 'text':
                return textType(row, column, currentValue, updateCell)
            default:
                return (
                    <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => updateCell(row.id, column.key, e.target.value)}
                        placeholder={column.placeholder}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white
                        placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                )
        }
    }

    return (
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4 border-b border-slate-600">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-600/20 rounded-lg">
                            <Table className="h-5 w-5 text-blue-400"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white text-lg">{title}</h4>
                            <p className="text-sm text-slate-400">
                                {data.rows.length} {data.rows.length === 1 ? 'entry': 'entries'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={addRow}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg
                        hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                    <Plus className="h-4 w-4" />
                    <span className="font-medium">Add Entry</span>
                    </button>
                </div>
            </div>
            {data.rows.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="p-4 bg-slate-700/50 rounded-full">
                            <Table className="h-8 w-8 text-slate-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-lg font-medium">No Entries Yet</p>
                            <p className="text-slate-500 text-sm mt-1">Click "Add Entry" to get started</p>
                        </div>
                    </div>
                </div>
            ): (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-700/50">
                                {data.columns.map((column, columnIndex) => (
                                    <th
                                        key={column.key}
                                        className={`px-6 py-4 text-left ${columnIndex === 0 ? 'rounded-tl-lg' : ''}`}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                                                {column.label}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                                <th className="px-6 py-4 text-left w-20 rounded-tr-lg">
                                    <span className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                                        Action
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {data.rows.map((row, rowIndex) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-slate-700/30 transition-colors duration-150"
                                >
                                    {data.columns.map(column => (
                                        <td key={column.key} className="px-6 py-4">
                                            {renderCell(row, column)}
                                        </td>
                                    ))}

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => removeRow(row.id)}
                                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20
                                            rounded-lg transition-all duration-200 transform hover:scale-110"
                                            title="Remove Entry"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default DataTables