// import {FileText, Calendar, Component, User, ChevronDown} from "lucide-react";
// import {useEffect, useState} from "react";
// import {UseAuth} from "./Auth.jsx";
// import CheckListItems from "./HandoverCheckListItem.jsx";
// import { fetchCDDUsers } from "../services/handoverServices.js";
//
//
// function HandoverDetails({region, currentDate, shift, setShift, cddName, cddOptions, setCddName, fullName}) {
//     return (
//         <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
//             <div className="flex items-center space-x-3 mb-6">
//                 <FileText className="h-6 w-6 text-blue-400"/>
//                 <h2 className="text-xl font-semibold capitalize">Handover {region} Details</h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div>
//                     <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="handoverDate">Date (Local Time)</label>
//                     <input
//                         id="handoverDate"
//                         type="text"
//                         value={currentDate}
//                         readOnly={true}
//                         className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="handoverShift" className="block text-sm font-medium text-slate-300 mb-2">Shift</label>
//                     <select
//                         name="handoverShift"
//                         id="handoverShift"
//                         value={shift}
//                         onChange={(e) => setShift(e.target.value)}
//                         className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                         <option value="">Select Shift</option>
//                         <option value="day">Day Shift</option>
//                         <option value="night">Night Shift</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="dispatcherName" className="block text-sm font-medium text-slate-300 mb-2">Dispatcher Name</label>
//                     <input
//                         type="text"
//                         id="dispatcherName"
//                         value={fullName}
//                         readOnly={true}
//                         className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg
//                         text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="cddName" className="block text-sm font-medium text-slate-300 mb-2">
//                         Chief Duty Dispatcher
//                     </label>
//                     <div className="relative">
//                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400"/>
//                         <select
//                             name="cddName"
//                             id="cddName"
//                             value={cddName}
//                             onChange={(e) => setCddName(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg
//                             text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                             appearance-none"
//                         >
//                             <option value="">Select Chief Duty Dispatcher</option>
//                             {cddOptions.map((option) => (
//                                 <option
//                                     key={option}
//                                     value={option}
//                                 >
//                                     {option}
//                                 </option>
//                             ))}
//                         </select>
//                         <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// function HandoverChecklist({region, statistics, setStatistics, checkListItems, setCheckListItems}) {
//     // Ignores the values. Just changes completed/uncompleted. Only used for single checkboxes
//     const handleToggleItem = (id) => {
//         // Loop through checklist items.
//         const newItems = checkListItems.map((item) =>
//             // Finds the id (meaning finds the item), toggle it to be complete / uncompleted
//             item.id === id ? { ...item, completed: !item.completed } : item
//         );
//         // Update the checklist with the new data.
//         setCheckListItems(newItems);
//
//     };
//
//     const handleUpdateItem = (id, value) => {
//         const newItems = checkListItems.map(item => {
//             if (item.id === id) {
//                 let completed;
//                 if (item.type === "checkbox") {
//                     completed = Boolean(value);
//                 } else if (item.type === "table") {
//                     completed = value?.rows?.length > 0;
//                 } else if (item.type === "select") {
//                     completed = value.toString().trim().length > 0;
//                 } else {
//                     completed = Boolean(value);
//                 }
//                 return { ...item, value, completed };
//             }
//             return item;
//         });
//         setCheckListItems(newItems);
//     };
//
//
//     return(
//         <div className="bg-slate-800 rounded-xl border border-slate-700">
//             <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-semibold text-white capitalize">Handover {region} Checklist</h3>
//                     <div className="flex items-center space-x-4">
//                         {/*Progress Indicators*/}
//                         <div className="flex items-center space-x-4 text-sm">
//                             {/*Completed Indicator*/}
//                             <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                                 <span className="text-slate-300">Completed: {statistics.completed}/{statistics.total}</span>
//                             </div>
//                             {/*Required Indicator*/}
//                             <div className="flex items-center space-x-2">
//                                 <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//                                 <span className="text-slate-300">Required: {statistics.requiredCompleted}/{statistics.required}</span>
//                             </div>
//                         </div>
//                     </div>
//
//                 </div>
//
//                 <div className="space-y-6">
//                     {/*Checklist Items*/}
//                     {checkListItems.map(item => (
//                         <CheckListItems
//                             key={item.id}
//                             item={item}
//                             onToggle={handleToggleItem} // Only used for single checkboxes.
//                             onUpdate={handleUpdateItem} // Used for everything, as we take the value.
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export const checkList = (region) => ([
//     {
//         id: `-shift_highlights`,
//         title: 'Shift Highlights',
//         type: 'textarea',
//         description: 'Shift Highlights detailing issues or events that happened during the shift.',
//         required: true,
//         completed: false,
//         placeholder: "Insert any shift highlights",
//         value: ""
//     },
//     {
//         id: `-non-standard-flights`,
//         title: 'Non-Standard Flights',
//         type: 'table',
//         description: 'Add details of any flight that is non-standard, for example non optimum route and additional fuel.',
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-non-standard-flight`, label: 'Flight', type: 'text', placeholder: 'Insert Flight' },
//                 { key: `-non-standard-alternate`, label: 'Alternate', type: 'text', placeholder: 'Insert Alternate' },
//                 { key: `-non-standard-extra-fuel`, label: 'Extra Fuel', type: 'text', placeholder: 'Insert Extra Fuel' },
//                 { key: `-non-standard-remarks`, label: 'Remarks', type: 'textarea', placeholder: 'Insert Remarks' }
//             ],
//             rows: []
//         },
//     },
//     {
//         id: `-naifr`,
//         title: 'NAIFR',
//         type: 'table',
//         description: 'List the flights that are planned NAIFR.',
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-naifr-flight`, label: "Flight", type: 'text', placeholder: 'Insert Flight'},
//                 { key: `-naifr-destination`, label: 'Destination', type: 'text', placeholder: 'Insert Destination'},
//                 { key: `-naifr-remarks`, label: 'Remarks', type: 'textarea', placeholder: 'Insert Remarks'}
//             ],
//             rows:[]
//         }
//     },
//     {
//         id: `-aog`,
//         title: 'AOG or U/S Aircraft',
//         type: 'table',
//         description: 'Provide details of AOG | U/S Aircraft',
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-ago-tail`, label: "Tail", type: 'text', placeholder: 'Enter A/C Tail'},
//                 { key: `-ago-fob`, label: 'FOB', type: 'text', placeholder: 'Enter FOB'},
//                 { key: `-ago-issue`, label: 'Issue(s)', type: 'textarea', placeholder: 'Enter Issue(s)'}
//             ],
//             rows:[]
//         }
//     },
//     {
//         id: `-comat`,
//         title: 'COMAT Flights',
//         type: 'table',
//         description: 'Provide details about any COMAT Flights',
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-comat-flight`, label: 'Flight', type: 'text', placeholder: 'Insert Flight'},
//                 { key: `-comat-remarks`, label: 'Remarks', type: 'textarea', placeholder: 'Insert Remarks'}
//             ],
//             rows:[]
//         }
//     },
//     {
//         id: `-fob-co-notam-created`,
//         title: 'Has an FOB CO NOTAM been created for all AOG or U/S Aircraft',
//         type: 'checkbox',
//         required: true,
//         completed: false,
//     },
//     {
//         id: `-comat-request-created`,
//         title: 'Have the remarks been added, or a CO NOTAM created for all COMAT Requests?',
//         type: 'checkbox',
//         required: true,
//         completed: false,
//     },
//     {
//         id: `-fuel-payload-critical-flights`,
//         title: 'Fuel or Payload Critical Flights',
//         type: 'table',
//         description: 'Provide details about any Fuel or Payload Critical Flights',
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-fuel-payload-critical-flights-flight`, label: 'Flight', type: 'text', placeholder: 'Insert Flight'},
//                 { key: `-fuel-payload-critical-flights-alternate`, label: 'Alternate', type: 'text', placeholder: 'Insert Alternate'},
//                 { key: `-fuel-payload-critical-flights-fuel`, label: 'Extra Fuel', type: 'text', placeholder: 'Insert Extra Fuel'},
//                 { key: `-fuel-payload-critical-flights-remarks`, label: 'Remarks', type: 'textarea', placeholder: 'Insert Remarks'}
//             ],
//             rows: []
//         }
//     },
//     {
//         id: `-weather-issues`,
//         title: 'Weather Issues',
//         type: 'table',
//         description: 'Stations with marginal weather (actual or forecast).',
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-weather-issues-station`, label: 'Station', type: 'text', placeholder: 'Insert Station'},
//                 { key: `-weather-issues-details`, label: 'Weather Details', type: 'textarea', placeholder: 'Insert Weather Details'}
//             ],
//             rows: []
//         }
//     },
//     {
//         id: `-operational-notams`,
//         title: 'Operational NOTAMS',
//         type: 'table',
//         description: 'Any operational NOTAMS',
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-operational-notams-station`, label: 'Station', type: 'text', placeholder: 'Insert Station'},
//                 { key: `-operational-notams-details`, label: 'NOTAM Details', type: 'textarea', placeholder: 'Insert NOTAM Details'}
//             ],
//             rows: []
//         }
//     },
//     {
//         id: `-performance-mels`,
//         title: "Performance Limiting MEL's",
//         type: 'table',
//         description: "Any performance limiting MEL's",
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-performance-mels-tail`, label: 'Tail', type: 'text', placeholder: 'Insert A/C Tail'},
//                 { key: `-performance-mels-mel`, label: 'MEL', type: 'text', placeholder: 'Insert MEL'},
//                 { key: `-performance-mels-details`, label: 'Restriction Details', type: 'textarea', placeholder: 'Insert Restriction Details'},
//
//             ],
//             rows: []
//         }
//     },
//     {
//         id: `-nvb`,
//         title: 'NavBlue Support Tickets Raised or in Progress',
//         type: 'table',
//         description: 'Any NavBlue Support Tickets',
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-nvb-ticket-no`, label: 'Ticket Number', type: 'text', placeholder: 'Insert Ticket Number'},
//                 { key: `-nvb-details`, label: 'Issue Details', type: 'textarea', placeholder: 'Insert Issue Details'},
//
//             ],
//             rows: []
//         }
//     },
//     {
//         id: `-tmi`,
//         title: 'Traffic Management Initiatives',
//         type: 'table',
//         description: 'Any Traffic Management Initiatives',
//         required: false,
//         completed: false,
//         value: {
//             columns: [
//                 { key: `-tmi-airport`, label: 'Airport', type: 'text', placeholder: 'Insert Airport'},
//                 { key: `-tmi-advisory`, label: 'Advisory', type: 'text', placeholder: 'Insert Advisory'},
//                 { key: `-tmi-restriction`, label: 'Restriction', type: 'text', placeholder: 'Insert Restriction'},
//                 { key: `-tmi-affected-flights`, label: 'Affected Flights', type: 'textarea', placeholder: 'Insert Affected Flights'},
//
//             ],
//             rows: []
//         }
//     },
//     {
//         id: `-enroute-weather-pirep`,
//         title: 'Enroute Weather and PIREP',
//         type: 'textarea',
//         description: 'Any enroute weather and/or PIREP',
//         required: false,
//         completed: false,
//         placeholder: "Insert any details regarding enroute weather and/or PIREP",
//         value: ""
//     },
//     {
//         id: `-cdd-followup`,
//         title: 'Issues that Require CDD Follow Up or Should Be Added to the CDD Network Summary',
//         type: 'textarea',
//         description: 'Examples would include, but not limited to items that are ongoing and expected to continue beyond ' +
//             'the next shift, or items that require escalation or follow up. The CDD are required to check this section each shift.',
//         required: false,
//         completed: false,
//         placeholder: "Insert any issues",
//         value: ""
//     },
//     {
//         id: `-misc`,
//         title: 'Miscellaneous',
//         type: 'textarea',
//         description: 'Any Miscellaneous Details',
//         required: false,
//         completed: false,
//         placeholder: "Insert Miscellaneous Details",
//         value: ""
//     },
//     {
//         id: `-it-issues`,
//         title: 'IT Issues (ongoing or that occurred during the shift)',
//         type: 'textarea',
//         description: 'Any issues that involved IT',
//         required: false,
//         completed: false,
//         placeholder: "Insert IT issues",
//         value: ""
//     },
//     {
//         id: `-procedural-changes`,
//         title: 'Procedural Changes (memo, bulletin, email, etc.)',
//         type: 'textarea',
//         description: 'Provide any detail on new procedures or memos that may have been issued during the shift.',
//         required: false,
//         completed: false,
//         placeholder: "Insert any procedural changes",
//         value: ""
//     },
//
// ]);
//
//
// function HandoverForm({ region }) {
//     const { user } = UseAuth();
//     const [handoverData, setHandoverData] = useState({});
//     const [cddUsers, setCddUsers] = useState([]);
//     const [statistics, setStatistics] = useState({});
//
//     // Update the statistics.
//     useEffect(() => {
//         const items = handoverData[region]?.checklistItems;
//         setStatistics(
//             items
//                 ? {
//                     total: items.length,
//                     completed: items.filter(i => i.completed).length,
//                     required: items.filter(i => i.required).length,
//                     requiredCompleted: items.filter(i => i.required && i.completed).length,
//                 }
//                 : {}
//         );
//     }, [region, handoverData]);
//
//
//     // Grab CDD List of users.
//     useEffect(() => {
//         const getCddUsers = async() => {
//             const response = await fetchCDDUsers();
//             const cddUsers = response.data
//
//             setCddUsers(cddUsers.map((user) => user.full_name))
//         }
//
//         getCddUsers();
//
//     }, []);
//
//
//     // Reset the state based on when regions are switched.
//     useEffect(() => {
//         setHandoverData((prev) => ({
//             ...prev,
//             [region]: {
//                 shift: "",
//                 cddName: "",
//                 checklistItems: checkList(region),
//             },
//         }));
//     }, [region]);
//
//     // Set the handover data. Using field/value to make it more dynamic.
//     const setHandoverField = (field, value) => {
//         setHandoverData((prev) => ({
//             ...prev,
//             [region]: {
//                 ...prev[region],
//                 [field]: value,
//             },
//         }));
//     };
//
//
//     const currentDate = new Date().toISOString().split("T")[0];
//
//     // Grab the appropriate region
//     const regionData = handoverData[region] || {};
//
//
//     return (
//         <div className="max-w-7xl mx-auto px-6 py-8">
//             <HandoverDetails
//                 region={region}
//                 currentDate={currentDate}
//                 shift={regionData.shift || ""}
//                 setShift={(val) => setHandoverField("shift", val)}
//                 fullName={user?.userDetails.fullName || ""}
//                 // cddName={regionData.cddName || ""}
//                 cddOptions={cddUsers}
//                 cddName={regionData.cddName || ""}
//                 setCddName={(val) => setHandoverField("cddName", val)}
//             />
//             <HandoverChecklist
//                 region={region}
//                 checkListItems={regionData.checklistItems || []}
//                 setCheckListItems={(items) => setHandoverField("checklistItems", items)}
//                 statistics={statistics}
//                 setStatistics={setStatistics}
//             />
//         </div>
//     );
// }
//
//
// export default HandoverForm






import {FileText, Calendar, Component, User, ChevronDown, AlertCircle, CircleCheck} from "lucide-react";
import {useEffect, useState} from "react";
import {UseAuth} from "./Auth.jsx";
import CheckListItems from "./HandoverCheckListItem.jsx";
import {fetchCDDUsers, saveHandover} from "../services/handoverServices.js";
import HandoverSuccessModal from "./HandoverSuccessModal.jsx";


function HandoverDetails({currentDate, shift, setShift, region, setRegion, cddName, cddOptions, setCddName, fullName}) {
    return (
        <div className="bg-slate-800 rounded-xl p-6 mb-8 border border-slate-700">
            <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-6 w-6 text-blue-400"/>
                <h2 className="text-xl font-semibold capitalize">Handover Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="handoverDate">Date (Local Time)</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                            id="handoverDate"
                            type="text"
                            value={currentDate}
                            readOnly={true}
                            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg
                            text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="handoverShift" className="block text-sm font-medium text-slate-300 mb-2">Shift</label>
                    <select
                        name="handoverShift"
                        id="handoverShift"
                        value={shift}
                        onChange={(e) => setShift(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select Shift</option>
                        <option value="day">Day Shift</option>
                        <option value="night">Night Shift</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="region" className="block text-sm font-medium text-slate-300 mb-2">Region</label>
                    <div className="relative">
                        <select
                            name="region"
                            id="region"
                            onChange={(e) => setRegion(e.target.value)}
                            value={region}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg
                            text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            appearance-none"
                        >
                            <option value="">Select Region</option>
                            <option value="east">East</option>
                            <option value="west">West</option>
                            <option value="central">Central</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4
                        text-slate-400 pointer-events-none" />
                    </div>
                </div>
                <div>
                    <label htmlFor="dispatcherName" className="block text-sm font-medium text-slate-300 mb-2">Dispatcher Name</label>
                    <input
                        type="text"
                        id="dispatcherName"
                        value={fullName}
                        readOnly={true}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg
                        text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label htmlFor="cddName" className="block text-sm font-medium text-slate-300 mb-2">
                        Chief Duty Dispatcher
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400"/>
                        <select
                            name="cddName"
                            id="cddName"
                            value={cddName}
                            onChange={(e) => setCddName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg
                            text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            appearance-none"
                        >
                            <option value="">Select CDD</option>
                            {cddOptions.map((option) => (
                                <option
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function HandoverChecklist({statistics, checkListItems, setCheckListItems, handoverInfo, onSubmit}) {
    // Ignores the values. Just changes completed/uncompleted. Only used for single checkboxes
    const handleToggleItem = (id) => {
        // Loop through checklist items.
        const newItems = checkListItems.map((item) =>
            // Finds the id (meaning finds the item), toggle it to be complete / uncompleted
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        // Update the checklist with the new data.
        setCheckListItems(newItems);

    };

    const handleUpdateItem = (id, value) => {
        const newItems = checkListItems.map(item => {
            if (item.id === id) {
                let completed;
                if (item.type === "checkbox") {
                    completed = Boolean(value);
                } else if (item.type === "table") {
                    completed = value?.rows?.length > 0;
                } else if (item.type === "select") {
                    completed = value.toString().trim().length > 0;
                } else {
                    completed = Boolean(value);
                }
                return { ...item, value, completed };
            }
            return item;
        });
        setCheckListItems(newItems);
    };

    return(
        <div className="bg-slate-800 rounded-xl border border-slate-700">
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white capitalize">Handover Checklist</h3>
                    <div className="flex items-center space-x-4">
                        {/*Progress Indicators*/}
                        <div className="flex items-center space-x-4 text-sm">
                            {/*Completed Indicator*/}
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-slate-300">Completed: {statistics.completed}/{statistics.total}</span>
                            </div>
                            {/*Required Indicator*/}
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-slate-300">Required: {statistics.requiredCompleted}/{statistics.required}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/*Checklist Items*/}
                    {checkListItems.map(item => (
                        <CheckListItems
                            key={item.id}
                            item={item}
                            onToggle={handleToggleItem} // Only used for single checkboxes.
                            onUpdate={handleUpdateItem} // Used for everything, as we take the value.
                        />
                    ))}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-700">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            {statistics.requiredCompleted < statistics.required ||
                                !handoverInfo.shift || !handoverInfo.cddName || !handoverInfo.region ? (
                                <div className="text-sm text-slate-400">
                                    {!handoverInfo.shift || !handoverInfo.cddName || !handoverInfo.region ? (
                                        <p className="flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-red-700" />
                                            Please complete handover details before submitting.
                                        </p>
                                    ) : (
                                        <p className="flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-red-700" />
                                            Complete {statistics.required - statistics.requiredCompleted} more required
                                            items to submit.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="text-sm text-slate-400">
                                    <p className="flex items-center gap-2">
                                        <CircleCheck className="w-4 h-4 text-green-400" />
                                        All requirements met – ready to submit
                                    </p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onSubmit}
                            disabled={statistics.requiredCompleted < statistics.required || !handoverInfo.shift || !handoverInfo.cddName || !handoverInfo.region}
                            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all 
                            duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none 
                            disabled:opacity-50 disabled:cursor-not-allowed ${statistics.requiredCompleted === statistics.required &&
                                handoverInfo.shift && handoverInfo.cddName && handoverInfo.region ? 
                                'bg-blue-600 text-white hover:bg-blue-500' : 'bg-slate-600 text-slate-400'}`}
                        >
                            <FileText className="h-4 w-4"/>
                            <span>Submit Handover</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export const checkList = () => ([
    {
        id: `shift-highlights`,
        title: 'Shift Highlights',
        type: 'textarea',
        description: 'Shift Highlights detailing issues or events that happened during the shift.',
        required: true,
        completed: false,
        placeholder: "Insert any shift highlights",
        value: ""
    },
    {
        id: `non-standard-flights`,
        title: 'Non-Standard Flights',
        type: 'table',
        description: 'Add details of any flight that is non-standard, for example non optimum route and additional fuel.',
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `non-standard-flight`, label: 'Flight', type: 'text', placeholder: 'Insert Flight' },
                { key: `non-standard-alternate`, label: 'Alternate', type: 'text', placeholder: 'Insert Alternate' },
                { key: `non-standard-extra-fuel`, label: 'Extra Fuel', type: 'text', placeholder: 'Insert Extra Fuel' },
                { key: `non-standard-remarks`, label: 'Remarks', type: 'textarea', placeholder: 'Insert Remarks' }
            ],
            rows: []
        },
    },
    {
        id: `naifr`,
        title: 'NAIFR',
        type: 'table',
        description: 'List the flights that are planned NAIFR.',
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `naifr-flight`, label: "Flight", type: 'text', placeholder: 'Insert Flight'},
                { key: `naifr-destination`, label: 'Destination', type: 'text', placeholder: 'Insert Destination'},
                { key: `naifr-remarks`, label: 'Remarks', type: 'textarea', placeholder: 'Insert Remarks'}
            ],
            rows:[]
        }
    },
    {
        id: `aog`,
        title: 'AOG or U/S Aircraft',
        type: 'table',
        description: 'Provide details of AOG | U/S Aircraft',
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `ago-tail`, label: "Tail", type: 'text', placeholder: 'Enter A/C Tail'},
                { key: `ago-fob`, label: 'FOB', type: 'text', placeholder: 'Enter FOB'},
                { key: `ago-issue`, label: 'Issue(s)', type: 'textarea', placeholder: 'Enter Issue(s)'}
            ],
            rows:[]
        }
    },
    {
        id: `comat`,
        title: 'COMAT Flights',
        type: 'table',
        description: 'Provide details about any COMAT Flights',
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `comat-flight`, label: 'Flight', type: 'text', placeholder: 'Insert Flight'},
                { key: `comat-remarks`, label: 'Remarks', type: 'textarea', placeholder: 'Insert Remarks'}
            ],
            rows:[]
        }
    },
    {
        id: `fob-co-notam-created`,
        title: 'Has an FOB CO NOTAM been created for all AOG or U/S Aircraft',
        type: 'checkbox',
        required: true,
        completed: false,
    },
    {
        id: `comat-request-created`,
        title: 'Have the remarks been added, or a CO NOTAM created for all COMAT Requests?',
        type: 'checkbox',
        required: true,
        completed: false,
    },
    {
        id: `fuel-payload-critical-flights`,
        title: 'Fuel or Payload Critical Flights',
        type: 'table',
        description: 'Provide details about any Fuel or Payload Critical Flights',
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `fuel-payload-critical-flights-flight`, label: 'Flight', type: 'text', placeholder: 'Insert Flight'},
                { key: `fuel-payload-critical-flights-alternate`, label: 'Alternate', type: 'text', placeholder: 'Insert Alternate'},
                { key: `fuel-payload-critical-flights-fuel`, label: 'Extra Fuel', type: 'text', placeholder: 'Insert Extra Fuel'},
                { key: `fuel-payload-critical-flights-remarks`, label: 'Remarks', type: 'textarea', placeholder: 'Insert Remarks'}
            ],
            rows: []
        }
    },
    {
        id: `weather-issues`,
        title: 'Weather Issues',
        type: 'table',
        description: 'Stations with marginal weather (actual or forecast).',
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `weather-issues-station`, label: 'Station', type: 'text', placeholder: 'Insert Station'},
                { key: `weather-issues-details`, label: 'Weather Details', type: 'textarea', placeholder: 'Insert Weather Details'}
            ],
            rows: []
        }
    },
    {
        id: `operational-notams`,
        title: 'Operational NOTAMS',
        type: 'table',
        description: 'Any operational NOTAMS',
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `operational-notams-station`, label: 'Station', type: 'text', placeholder: 'Insert Station'},
                { key: `operational-notams-details`, label: 'NOTAM Details', type: 'textarea', placeholder: 'Insert NOTAM Details'}
            ],
            rows: []
        }
    },
    {
        id: `performance-mels`,
        title: "Performance Limiting MEL's",
        type: 'table',
        description: "Any performance limiting MEL's",
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `performance-mels-tail`, label: 'Tail', type: 'text', placeholder: 'Insert A/C Tail'},
                { key: `performance-mels-mel`, label: 'MEL', type: 'text', placeholder: 'Insert MEL'},
                { key: `performance-mels-details`, label: 'Restriction Details', type: 'textarea', placeholder: 'Insert Restriction Details'},

            ],
            rows: []
        }
    },
    {
        id: `nvb-tickets`,
        title: 'NavBlue Support Tickets Raised or in Progress',
        type: 'table',
        description: 'Any NavBlue Support Tickets',
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `nvb-ticket-no`, label: 'Ticket Number', type: 'text', placeholder: 'Insert Ticket Number'},
                { key: `nvb-details`, label: 'Issue Details', type: 'textarea', placeholder: 'Insert Issue Details'},

            ],
            rows: []
        }
    },
    {
        id: `tmi`,
        title: 'Traffic Management Initiatives',
        type: 'table',
        description: 'Any Traffic Management Initiatives',
        required: false,
        completed: false,
        value: {
            columns: [
                { key: `tmi-airport`, label: 'Airport', type: 'text', placeholder: 'Insert Airport'},
                { key: `tmi-advisory`, label: 'Advisory', type: 'text', placeholder: 'Insert Advisory'},
                { key: `tmi-restriction`, label: 'Restriction', type: 'text', placeholder: 'Insert Restriction'},
                { key: `tmi-affected-flights`, label: 'Affected Flights', type: 'textarea', placeholder: 'Insert Affected Flights'},

            ],
            rows: []
        }
    },
    {
        id: `enroute-weather-pirep`,
        title: 'Enroute Weather and PIREP',
        type: 'textarea',
        description: 'Any enroute weather and/or PIREP',
        required: false,
        completed: false,
        placeholder: "Insert any details regarding enroute weather and/or PIREP",
        value: ""
    },
    {
        id: `cdd-followup`,
        title: 'Issues that Require CDD Follow Up or Should Be Added to the CDD Network Summary',
        type: 'textarea',
        description: 'Examples would include, but not limited to items that are ongoing and expected to continue beyond ' +
            'the next shift, or items that require escalation or follow up. The CDD are required to check this section each shift.',
        required: false,
        completed: false,
        placeholder: "Insert any issues",
        value: ""
    },
    {
        id: `misc`,
        title: 'Miscellaneous',
        type: 'textarea',
        description: 'Any Miscellaneous Details',
        required: false,
        completed: false,
        placeholder: "Insert Miscellaneous Details",
        value: ""
    },
    {
        id: `it-issues`,
        title: 'IT Issues (ongoing or that occurred during the shift)',
        type: 'textarea',
        description: 'Any issues that involved IT',
        required: false,
        completed: false,
        placeholder: "Insert IT issues",
        value: ""
    },
    {
        id: `procedural-changes`,
        title: 'Procedural Changes (memo, bulletin, email, etc.)',
        type: 'textarea',
        description: 'Provide any detail on new procedures or memos that may have been issued during the shift.',
        required: false,
        completed: false,
        placeholder: "Insert any procedural changes",
        value: ""
    },

]);


function HandoverForm() {
    const { user } = UseAuth();
    const [handoverData, setHandoverData] = useState({});
    const [cddUsers, setCddUsers] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [showSubmissionModal, setShowSubmissionModal] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submissionDetails, setSubmissionDetails] = useState(null);

    // Update the statistics.
    useEffect(() => {
        const items = handoverData?.checklistItems;
        setStatistics(
            items
                ? {
                    total: items.length,
                    completed: items.filter(i => i.completed).length,
                    required: items.filter(i => i.required).length,
                    requiredCompleted: items.filter(i => i.required && i.completed).length,
                }
                : {}
        );
    }, [handoverData]);


    // Grab CDD List of users.
    useEffect(() => {
        const getCddUsers = async() => {
            try {
                const response = await fetchCDDUsers();
                const cddUsers = response.data

                setCddUsers(cddUsers.map((user) => user.full_name))
            }
            catch (error) {
                // Ignoring error - Will add functionality later to show to user.
            }
        }

        getCddUsers();

    }, []);


    // Reset the state based on when regions are switched.
    useEffect(() => {
        setHandoverData({
            shift: "",
            cddName: "",
            region: "",
            checklistItems: checkList(),
        });
    }, []);

    // Set the handover data. Using field/value to make it more dynamic.
    const setHandoverField = (field, value) => {
        setHandoverData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async() => {
        try {
            const response = await saveHandover(handoverData, user);
            setShowSubmissionModal(true);
            setSubmissionResult('success')
            setSubmissionMessage('Handover submitted successfully')
            setSubmissionDetails({
                submissionId: response.data.handover_id.toUpperCase(),
                timestamp: new Date().toLocaleString(),
                completionStats: statistics
            });

        } catch (error) {
            errorMessage();
        }
    };

    const errorMessage = () => {
        setSubmissionResult('error');
        setSubmissionMessage('Failed to submit handover');
        setSubmissionDetails({
            error: 'Issue submitting handover',
            retryAvailable: true
        });

        setShowSubmissionModal(true);
    }


    const currentDate = new Date().toLocaleDateString('en-CA');

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <HandoverDetails
                currentDate={currentDate}
                shift={handoverData.shift || ""}
                setShift={(val) => setHandoverField("shift", val)}
                setRegion={(val) => setHandoverField('region', val)}
                region={handoverData.region || ""}
                fullName={user?.userDetails.fullName || ""}
                cddOptions={cddUsers}
                cddName={handoverData.cddName || ""}
                setCddName={(val) => setHandoverField("cddName", val)}
            />
            <HandoverChecklist
                checkListItems={handoverData.checklistItems || []}
                setCheckListItems={(items) => setHandoverField("checklistItems", items)}
                statistics={statistics}
                handoverInfo={{
                    shift: handoverData.shift,
                    cddName: handoverData.cddName,
                    region: handoverData.region,
                }}
                onSubmit={handleSubmit}
            />
            <HandoverSuccessModal
                submissionModalOpen={showSubmissionModal}
                setSubmissionModal={setShowSubmissionModal}
                modalStatus={submissionResult}
                modalMessage={submissionMessage}
                modalDetails={submissionDetails}
                handoverData={handoverData}
                user={user}

            />
        </div>
    );
}


export default HandoverForm