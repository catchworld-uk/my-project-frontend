import {useEffect, useState} from "react";
import {dispatchHandoverList} from "../services/handoverServices.js";
import {Calendar, Clock, Edit, Eye, FileText, User} from "lucide-react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function HandoverListForm({globalFilters, filters, handoverList}) {
    if (!handoverList || handoverList.length === 0) {
        return (
            <div style={{ minHeight: '400px' }} className="text-center text-slate-400 py-10">
                Loading handover data...
            </div>
        );
    }

    const formatDate = (dateString, includesTime=false) => {
        if (!includesTime) {
            return new Date(dateString).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        }
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);

        return date.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-CA', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const regionColor = (region) => {
        switch (region) {
            case 'east':
                return 'bg-blue-900/30 text-blue-400 border-blue-700/50';
            case 'west':
                return 'bg-green-900/30 text-green-400 border-green-700/50';
            case 'central':
                return 'bg-purple-900/30 text-purple-400 border-purple-700/50';
            default:
                return 'bg-slate-700 text-slate-300 border-slate-600';
        }
    }

    const dateShiftTemplate = (rowData) => (
        <div>
            <div className="flex items-center space-x-2">
               <Calendar className="h-4 w-4 text-slate-400" />
               <span className="font-medium text-white">{formatDate(rowData.date, true)}</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
               <Clock className="h-3 w-3 text-slate-500" />
               <span className="text-sm text-slate-400 capitalize">{rowData.shift} Shift</span>
            </div>
        </div>
    );

    const dispatcherTemplate = (rowData) => (
        <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-slate-400" />
            <span className="font-medium text-white">{rowData.dispatcher_name}</span>
        </div>
    )

    const regionTemplate = (rowData) => (
        <span className={`px-3 text-xs font-medium rounded-full border ${
            regionColor(rowData.region)
        }`}>{rowData?.region.charAt(0).toUpperCase() + rowData?.region.slice(1)}</span>
    )

    const lastModifiedTemplate = (rowData) => (
        <div className="text-sm text-slate-400">
            <div>{formatDate(rowData.modified_at)}</div>
            <div className="text-xs text-slate-500">{formatTime(rowData.modified_at)}</div>
        </div>
    )


    const actionsTemplate = (rowData) => (
        <div className="flex items-center space-x-2">
            <button
                onClick={undefined}
                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-lg transition-all
                duration-200 transform hover:scale-110"
                title="View Handover"
            >
                {new Date(rowData.date).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10) ? (
                    <Eye className="h-4 w-4 text-blue-400" />
                ) : (

                    <Eye className="h-4 w-4 text-gray-500" />

                )}
            </button>
            <button
                onClick={undefined}
                className="p-2 text-green-400 hover:text-green-300 hover:bg-green-900/20 rounded-lg transition-all
                duration-200 transform hover:scale-110"
                title="View Handover"
            >
                {new Date(rowData.date).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10) ? (
                    <Edit className="h-4 w-4 text-blue-400" />
                ) : (
                    <Edit className="h-4 w-4 text-gray-500" />
                )}
            </button>
        </div>
    )

    return (
        <div style={{ minHeight: '400px' }}>
            <DataTable
                value={handoverList}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                globalFilter={globalFilters}
                globalFilterFields={['dispatcher_name', 'region', 'shift', 'date']}
                filters={filters}
                emptyMessage="No Handover Records Found"
                className="custom-datatable"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
                <Column
                    field="date"
                    header="Date & Shift"
                    body={dateShiftTemplate}
                    sortable
                    filter
                    filterElement={<span />}
                />
                <Column
                    field="dispatcher_name"
                    header="Dispatcher"
                    body={dispatcherTemplate}
                    sortable
                />
                <Column
                    field="region"
                    header="Region"
                    body={regionTemplate}
                    sortable
                    filter
                    filterElement={<span />}
                    filterFunction={(value, filter) => {
                        if (!filter || filter === '') return true;
                        return value === filter;
                    }}
                />
                <Column
                    field="shift"
                    header="Shift"
                    sortable
                    filter
                    filterElement={<span />}
                    filterFunction={(value, filter) => {
                        if (!filter || filter === '') return true;
                        return value === filter;
                    }}
                    body={(rowData) => (
                        <span className="capitalize text-slate-300">{rowData.shift} Shift</span>
                    )}
                />
                <Column
                    field="lastModified"
                    header="Last Modified"
                    body={lastModifiedTemplate}
                />
                <Column
                    header="Actions"
                    body={actionsTemplate}
                    style={{ width: '8rem' }}
                />

            </DataTable>

        </div>
    )
}


export default HandoverListForm