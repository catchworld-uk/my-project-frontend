import HandoverForm from "../components/HandoverForm.jsx";
import { useParams } from "react-router-dom";

function Handover() {
    const { region } = useParams();

    return (
        <HandoverForm region={region} />
    )
}

export default Handover