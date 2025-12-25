import HandoverListForm from "../components/HandoverListForm.jsx";
import {useEffect, useState} from "react";
import HandoverFilter from "../components/HandoverFilter.jsx";
import {dispatchHandoverList} from "../services/handoverServices.js";


function HandoverList() {
    const [handoverList, setHandoverList] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [globalFilters, setGlobalFilters] = useState('');
    const [filters, setFilters] = useState({
        region: { value: '', matchMode: 'equals'},
        shift: { value: '', matchMode: 'equals'},
        date: { value: '', matchMode: 'equals'}
    })


    useEffect(() => {
        const getHandoverList = async() => {
            try {
                const response = await dispatchHandoverList()
                const handoverList = response.data
                setHandoverList(handoverList);

            } catch (error) {
                // Ignoring error - Will add functionality later to show to user.
            }
        }

        getHandoverList()
    }, []);


    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <HandoverFilter
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                globalFilters={globalFilters}
                setGlobalFilters={setGlobalFilters}
                filters={filters}
                setFilters={setFilters}

            />
            <HandoverListForm
                globalFilters={globalFilters}
                filters={filters}
                handoverList={handoverList}

            />
        </div>
    )
}

export default HandoverList