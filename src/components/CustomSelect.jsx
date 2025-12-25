import {useState, useRef, useEffect} from "react";
import {Check, ChevronDown, Plus} from "lucide-react";


function CustomSelect({value, onChange, options, placeholder="Select or enter custom value"}) {
    const [isOpen, setIsOpen] = useState(false);
    const [customInput, setCustomInput] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);

    // Allows us to interact with DOM Elements directly
    const dropDownRef = useRef(null);
    const inputRef = useRef(null);


    // Close dropdown if user clicks outside of dropdown
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsOpen(false);
                setShowCustomInput(false);
                setCustomInput('');
            }
        }

        // Check for clicks.
        document.addEventListener('mousedown', handleOutsideClick)

        // Remove unused event clicks.
        return () => document.removeEventListener('mousedown', handleOutsideClick)

    }, []);


    // Focus on Custom Inputs
    useEffect(() => {
        if (showCustomInput && inputRef.current) inputRef.current.focus();
    }, [showCustomInput]);


    // Handler for predefined options
    const handleOptionSelect = (option) => {
        onChange(option);
        setIsOpen(false);
        setShowCustomInput(false);
        setCustomInput('');
    }

    // Handler for custom option.
    const handleCustomOption = () => {
        if (customInput.trim()) {
            onChange(customInput.trim());
            setIsOpen(false);
            setShowCustomInput(false);
            setCustomInput('');
        }
    }

    // Handle ENTER & ESC on custom option
    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleCustomOption()
        if (e.key === "Escape") {
            setShowCustomInput(false);
            setCustomInput('');
        }
    }

    // What to show in the box.
    const displayValue = value || placeholder;

    // Ensure that the new value is not existing value.
    const isCustomValue = value && !options.includes(value)

    return (
        <div className="relative" ref={dropDownRef}>
            <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                value ? 'text-white' : 'text-slate-400'
            } hover:border-slate-500`}
            >
                <div className="flex items-center justify-between">
                    <span className="truncate">
                        {/*Show Custom Value*/}
                        {isCustomValue && value ? (
                            <span className="flex items-center space-x-2">
                                <span>{value}</span>
                                <span className="px-2 py-0.5 text-xs bg-blue-600/20 text-blue-400 rounded-full border border-blue-400">
                                    Custom
                                </span>
                            </span>
                        ) : (
                            // Show regular dropdown value
                            displayValue
                        )}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/*Only show when its open*/}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-slate-700 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                    {options && (
                        <div className="py-2">
                            {options.map(optionItem => (
                                <button
                                    key={optionItem}
                                    onClick={() => handleOptionSelect(optionItem)}
                                    className="w-full px-4 py-2 text-left text-white hover:bg-slate-600 transition-colors flex items-center justify-between"
                                >
                                    <span>{optionItem}</span>
                                    {/*Show checkmark if selected*/}
                                    {value === optionItem && <Check className="h-4 w-4 text-green-400" />}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="border-t border-slate-600">
                        <div className="p-2">
                            {/*Option to open custom input*/}
                            {!showCustomInput ? (
                                <button
                                    onClick={() => setShowCustomInput(true)}
                                    className="w-full px-3 py-2 text-left text-blue-400 hover:bg-slate-600 rounded-md transition-colors flex items-center space-x-2"
                                >
                                    <Plus className="h-4 w-4"/>
                                    <span>Add Custom Value</span>
                                </button>
                            ) : (
                                // Show Form for custom input
                                <div className="space-y-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        id="customInput"
                                        value={customInput}
                                        onChange={(e) => setCustomInput(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                        placeholder="Enter Custom Value.."
                                        className="w-full px-3 py-2 bg-slate-800 border border-slate-500 rounded-md
                                        text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <div className="flex space-x-2">
                                        {/*Add Button*/}
                                        <button
                                            onClick={handleCustomOption}
                                            disabled={!customInput.trim()}
                                            className="flex-1 px-3 py-1.5 bg-blue-600 text-white rounded-md
                                            hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
                                            transition-colors text-sm"
                                        >
                                            Add
                                        </button>
                                        {/*Cancel Button*/}
                                        <button
                                        onClick={() => {
                                            setShowCustomInput(false);
                                            setCustomInput('');
                                        }}
                                        className="flex-1 px-3 py-1.5 bg-slate-600 text-slate-300 rounded-md hover:bg-slate-500 transition-colors text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>


    )
}

export default CustomSelect