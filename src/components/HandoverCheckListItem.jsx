import {useState} from "react";
import {CheckCircle, ChevronDown, ChevronRight, ExternalLink, FileText, Link} from "lucide-react";
import CustomSelect from "./CustomSelect.jsx";
import DataTables from "./DataTables.jsx";


export const SelectInput = ({item, onUpdate}) => {
    return (
        <div className="mt-4">
            <CustomSelect
                value={item.value || ''}
                onChange={(value) => onUpdate(item.id, value)} // When selection changes, update the item
                options={item.options || []}
                placeholder="Select or enter custom value..."
            />
        </div>
    );
}

export const TableInput = ({ item, onUpdate }) => {
    return (
        <div className="mt-4">
            <DataTables
                data={item.value} // The table data (columns and rows)
                onChange={(data) => onUpdate(item.id, data)} // When table changes, update the item
                title={item.title} // Table title
            />
        </div>
    );
};

export const TextAreaInput = ({item, onUpdate}) => {
    return (
        <div className="mt-4">
            <textarea
                value={item.value || ""}
                onChange={(e) => onUpdate(item.id, e.target.value)}
                placeholder={item.placeholder}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white
                placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-transparent resize-none"
                rows={4}
            />
        </div>
    )
}


export const CheckListMapper = ({ type, item, onUpdate }) => {
    switch (type) {
        case "select":
            return <SelectInput item={item} onUpdate={onUpdate} />;
        case "table":
            return <TableInput item={item} onUpdate={onUpdate} />;
        case "textarea":
            return <TextAreaInput item={item} onUpdate={onUpdate} />;
        default:
            return null;
    }
};



function CheckListItems({item, onToggle, onUpdate}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const isCompleted = item.completed;


    // All items will have content other than checkboxes.
    const hasContent = item.type !== "checkbox"

    // Should have dropdown.
    const shouldShowDropdown = hasContent && (isCompleted || isExpanded)


    return (
        <div className={`rounded-lg border transition-all hover:shadow-lg ${
            isCompleted ? 'bg-green-900/20 border-green-700/50' :
                'bg-slate-700/50 border-slate-600 hover:border-slate-500'
        }`}>
            <div className="p-6">
                <div className="flex items-start space-x-4">
                    {item.type === 'checkbox' ? (
                        <button
                            onClick={() => onToggle(item.id)}
                            className={`mt-1 transition-colors ${item.completed ? 'text-green-400 hover:text-green-300' 
                                : 'text-slate-400 hover:text-blue-400'}`}
                        >
                            <CheckCircle className="h-5 w-5" />
                        </button>
                    ) : (
                        <div className={`mt-1 ${isCompleted ? 'text-green-400' : 'text-slate-400'}`}>
                            <FileText className="h-5 w-5" />
                        </div>
                    )}

                    {/*Item Area*/}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 mb-2">
                                {/*Title*/}
                                <h4 className={`font-medium ${isCompleted ? 'text-green-300' : 'text-white'}`}>
                                    {item.title}
                                </h4>
                                {/*Required*/}
                                {item.required && (
                                    <span className="px-2 py-1 text-xs bg-red-900/50 text-red-300 rounded-full border border-red-700/50">
                                Required
                                </span>
                                )}
                            </div>

                            {/*Collapsable if contains content*/}
                            {hasContent && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="flex items-center space-x-2 px-3 py-1 text-sm text-slate-400 hover:text-white hover:bg-slate-600 rounded-md transition-colors"
                                >
                                    <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
                                    {isExpanded ? (
                                        <ChevronDown className="h-4 w-4" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>
                            )}
                        </div>
                        {/*Description*/}
                        {item.description && (
                            <>
                                {item.hyperlink ? (
                                    <div className="flex items-center space-x-2 text-sm mb-3 text-slate-400">
                                        <span>{item.description}</span>
                                        <span>|</span>
                                        <ExternalLink className="text-slate-300" size={16}  />
                                        <a
                                            href={item.hyperlink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-slate-300"
                                        >
                                            Go to DPM Section
                                        </a>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                                )}
                            </>

                        )}
                    </div>
                    {/*Completed Badge*/}
                    <div className="flex items-center space-x-2 mt-1">
                        {isCompleted ? (
                            <span className="text-xs text-green-400 bg-green-900/30 px-3 py-1 rounded-full">
                                    Completed
                                </span>
                        ) : (
                            <span className="text-xs text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
                                    Pending
                                </span>
                        )}
                    </div>
                </div>
            </div>
            {shouldShowDropdown && (
                <div className={`transition-all duration-100 ease-in-out ${
                    isExpanded ? 'max-h-none opacity-100': 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="px-6 pb-6 border-t border-slate-600/50">
                        <CheckListMapper
                            type={item.type}
                            item={item}
                            onUpdate={onUpdate}
                        />
                    </div>
                </div>
            )}
        </div>

    )
}

export default CheckListItems