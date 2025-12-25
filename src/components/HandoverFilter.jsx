import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import {ChevronDown, Filter, Search, X} from "lucide-react";
import HandoverListStyling from '../additonalStyling/HandoverListStyling.jsx'
import { Calendar as PrimeCalendar } from 'primereact/calendar';



function FilterHeaderSection({showFilters, setShowFilters, globalFilters, setGlobalFilters}) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/*Search Bar*/}
            <div className="flex-1 max-w-md">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <InputText
                        value={globalFilters}
                        onChange={(e) => setGlobalFilters(e.target.value)}
                        placeholder="Search by Dispatcher Name.."
                        className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{ paddingLeft: '2.5rem', paddingRight: '1rem', position: 'relative', zIndex: 10 }}
                    />
                </div>
            </div>

            {/*Filter Button*/}
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg
                hover:bg-slate-600 transition-colors border border-slate-600"
            >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
        </div>
    )
}

function DispatcherFilter({showFilters, filters, setFilters}) {
    const normalizeDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-CA');
    };

    const onFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [ field ]: {
                value: field === 'date' && value ? normalizeDate(value) : value,
                matchMode: field === 'date' ? 'equals' : 'contains'
            }
        }))
    }


    const regionOptions = [
        { label: 'East', value: 'east'},
        { label: 'West', value: 'west'},
        { label: 'Central', value: 'central'}
    ]

    const shiftOptions = [
        { label: 'Day Shift', value: 'day'},
        { label: 'Night Shift', value: 'night'}
    ]

    return (
        <>
            {showFilters && (
                <div className="mt-6 border-t border-slate-700">
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="filterType" className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                            <InputText
                                value="Handover Report"
                                id="filterType"
                                readOnly
                                className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                style={{ height: '48px'}}
                            />
                        </div>
                        <div>
                            <label htmlFor="filterDate" className="block text-sm font-medium text-slate-300 mb-2">Date (Local)</label>
                            <div className="relative">
                                <PrimeCalendar
                                    value={filters.date?.value ? new Date(filters.date.value) : null}
                                    id="filterDate"
                                    onChange={(e) => onFilterChange('date', e.value)}
                                    dateFormat="yy-mm-dd"
                                    placeholder="Select Date"
                                    className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    showIcon
                                    showOtherMonths={false}
                                />
                                {filters.date.value && (
                                    <button
                                        onClick={() => onFilterChange('date', '')}
                                        title="Date Filter"
                                        className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-slate-400
                                    hover:text-white transition-colors z-10"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="filterRegion" className="block text-sm font-medium text-slate-300 mb-2">Region</label>
                            <div className="relative">
                                <Dropdown
                                    value={filters.region.value}
                                    id="filterRegion"
                                    onChange={(e) => onFilterChange('region', e.value)}
                                    options={regionOptions}
                                    placeholder="Select Region"
                                    className="w-full"
                                    style={{ height: '48px' }}
                                />
                                {filters.region.value && (
                                    <button
                                        onClick={() => onFilterChange('region', '')}
                                        title="Region Filter"
                                        className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-slate-400
                                    hover:text-white transition-colors z-10"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="filterShift" className="block text-sm font-medium text-slate-300 mb-2">Shift</label>
                            <div className="relative">
                                <Dropdown
                                    value={filters.shift.value}
                                    id="filterShift"
                                    onChange={(e) => onFilterChange('shift', e.value)}
                                    options={shiftOptions}
                                    placeholder="Select Shift"
                                    className="w-full"
                                    style={{ height: '48px' }}
                                />
                                {filters.shift.value && (
                                    <button
                                        onClick={() => onFilterChange('shift', '')}
                                        title="Shift Filter"
                                        className="absolute right-10 top-1/2 transform -translate-y-1/2 p-1 text-slate-400
                                    hover:text-white transition-colors z-10"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


function HandoverFilter({showFilters, setShowFilters, globalFilters, setGlobalFilters, filters, setFilters}) {
    return (
        <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
            <HandoverListStyling >
                <FilterHeaderSection
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    globalFilters={globalFilters}
                    setGlobalFilters={setGlobalFilters}
                />
                <DispatcherFilter
                    showFilters={showFilters}
                    filters={filters}
                    setFilters={setFilters}
                />
            </HandoverListStyling>
        </div>
    )
}


export default  HandoverFilter