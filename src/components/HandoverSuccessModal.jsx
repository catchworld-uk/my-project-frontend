import {CheckCircle, FileDown, FileText, Mail} from "lucide-react";
import {useState} from "react";
import { pdf } from '@react-pdf/renderer';
import MyDocument from "./ChecklistPDF.jsx";
import ChecklistPDF from "./ChecklistPDF.jsx";
import {sendPDFEmail} from "../services/handoverServices.js";


function HandoverSuccessModal({submissionModalOpen, setSubmissionModal, modalStatus, modalMessage, modalDetails, handoverData, user}) {
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [pdfBlob, setPdfBlob] = useState(null);
    const [emailData, setEmailData] = useState({
        to: '',
        cc: '',
        subject: 'Handover Report',
        message: 'Please find the attached Handover Report'
    });


    const handleDownloadPDF = async (downloadFile=true) => {
        setIsGeneratingPDF(true);
        try {
            const blob = await pdf(<ChecklistPDF data={handoverData} user={user} />).toBlob();
            const url = URL.createObjectURL(blob);
            if(downloadFile){
                const link = document.createElement('a');
                link.href = url;
                link.download = 'handover.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url)

                setPdfBlob(blob);
            } else {
                setPdfBlob(blob)
                return blob
            }
        } catch (error) {
            console.error('PDF generation failed', error);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    const handleSendEmail = async() => {
        setIsSendingEmail(true);
        try {
            let pdfBlobLocal = pdfBlob;

            if (!pdfBlobLocal) {
                pdfBlobLocal = await handleDownloadPDF(false);
                setPdfBlob(pdfBlobLocal)
            }

            await sendPDFEmail({
                to: emailData.to,
                cc: emailData.cc,
                subject: emailData.subject,
                message: emailData.message,
                pdfblob: pdfBlobLocal,
                pdfFileName: `${handoverData.region}-${handoverData.shift}-Handover-Report`
            });

        } catch (error) {

        } finally {
            setIsSendingEmail(false);
            setPdfBlob(null);
        }
    }


    return (
        <>
            {submissionModalOpen && (
                <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-md shadow-2xl">
                        {/* MODAL HEADER */}
                        <div className={`p-6 border-b border-slate-700 ${
                            modalStatus === 'success'
                                ? 'bg-gradient-to-r from-green-900/30 to-green-800/30'
                                : 'bg-gradient-to-r from-red-900/30 to-red-800/30'
                        }`}>
                            <div className="flex items-center space-x-3">
                                <div className={`p-3 rounded-full ${
                                    modalStatus === 'success'
                                        ? 'bg-green-600/20 text-green-400'
                                        : 'bg-red-600/20 text-red-400'
                                }`}>
                                    {modalStatus === 'success' ? (
                                        <CheckCircle className="h-6 w-6" />
                                    ) : (
                                        <FileText className="h-6 w-6" />
                                    )}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-semibold ${
                                        modalStatus === 'success' ? 'text-green-300' : 'text-red-300'
                                    }`}>
                                        {modalStatus === 'success' ? 'Submission Successful' : 'Submission Failed'}
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-1">{modalMessage}</p>
                                </div>
                            </div>
                        </div>

                        {/* MODAL CONTENT */}
                        <div className="p-6">
                            {modalStatus === 'success' ? (
                                <div className="space-y-4">
                                    {/* ✅ SUCCESS DETAILS */}
                                    <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-300">Submission ID</span>
                                                <span className="text-sm font-mono text-green-400">{modalDetails?.submissionId}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-300">Submitted At</span>
                                                <span className="text-sm text-white">{modalDetails?.timestamp}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-300">Items Completed</span>
                                                <span className="text-sm text-green-400">
                                                    {modalDetails?.completionStats.completed}/{modalDetails?.completionStats.total}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-300">Required Items</span>
                                                <span className="text-sm text-green-400">
                                                    {modalDetails?.completionStats.requiredCompleted}/{modalDetails?.completionStats.required}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SUCCESS MESSAGE */}
                                    <div className="text-center">
                                        <p className="text-slate-300 text-sm">
                                            Your handover has been successfully submitted and is now available for review.
                                        </p>
                                    </div>

                                    {/* EMAIL & PDF ACTIONS */}
                                    {!showEmailForm ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setShowEmailForm(true)}
                                                className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all duration-200 border border-blue-600/30"
                                            >
                                                <Mail className="h-4 w-4" />
                                                <span className="font-medium">Email PDF</span>
                                            </button>

                                            <button
                                                onClick={handleDownloadPDF}
                                                disabled={isGeneratingPDF}
                                                className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all duration-200 border border-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isGeneratingPDF ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="font-medium">Generating...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FileDown className="h-4 w-4" />
                                                        <span className="font-medium">Download PDF</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    ) : (
                                        /* EMAIL FORM */
                                        <div className="space-y-4">
                                            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                                                <h4 className="text-sm font-medium text-white mb-3 flex items-center space-x-2">
                                                    <Mail className="h-4 w-4 text-blue-400" />
                                                    <span>Email PDF Report</span>
                                                </h4>

                                                <div className="space-y-3">
                                                    {/* TO FIELD */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-slate-300 mb-1">To *</label>
                                                        <input
                                                            type="email"
                                                            value={emailData.to}
                                                            onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                                                            placeholder="recipient@example.com"
                                                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                            required
                                                        />
                                                    </div>

                                                    {/* CC FIELD */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-slate-300 mb-1">CC (Optional)</label>
                                                        <input
                                                            type="email"
                                                            value={emailData.cc}
                                                            onChange={(e) => setEmailData(prev => ({ ...prev, cc: e.target.value }))}
                                                            placeholder="cc@example.com"
                                                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                        />
                                                    </div>

                                                    {/* SUBJECT FIELD */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-slate-300 mb-1">Subject</label>
                                                        <input
                                                            type="text"
                                                            value={emailData.subject}
                                                            onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
                                                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                                        />
                                                    </div>

                                                    {/* MESSAGE FIELD */}
                                                    <div>
                                                        <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                                                        <textarea
                                                            value={emailData.message}
                                                            onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                                                            rows={3}
                                                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* EMAIL FORM BUTTONS */}
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => setShowEmailForm(false)}
                                                    className="flex-1 px-4 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500 transition-colors text-sm"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleSendEmail}
                                                    disabled={!emailData.to || isSendingEmail}
                                                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                                                >
                                                    {isSendingEmail ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                            <span>Sending...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Mail className="h-4 w-4" />
                                                            <span>Send Email</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* ERROR DETAILS */}
                                    <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-300">Error</span>
                                                <span className="text-sm text-red-400">{modalDetails?.error}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-slate-300">Time</span>
                                                <span className="text-sm text-white">{new Date().toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-slate-700 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowEmailForm(false);
                                    setSubmissionModal(false);
                                    setPdfBlob(null);
                                    setEmailData({
                                        to: '',
                                        cc: '',
                                        subject: 'Handover Report',
                                        message: 'Please find the attached Handover Report'
                                    })
                                }}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    modalStatus === 'success'
                                        ? 'bg-green-600 text-white hover:bg-green-500'
                                        : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                                }`}
                            >
                                {modalStatus === 'success' ? 'Continue' : 'Close'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}



export default HandoverSuccessModal