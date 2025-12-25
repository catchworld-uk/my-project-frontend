import api from './api.js'


export async function fetchCDDUsers() {
    return api.get('get-cdd-users/');
}

export async function sendPDFEmail({to, cc, subject, message, pdfblob, pdfFileName}) {
    const formData = new FormData();
    const toEmails = Array.isArray(to) ? to : [to].filter(Boolean);
    const ccEmails = Array.isArray(cc) ? cc : [cc].filter(Boolean);

    toEmails.forEach(email => formData.append('to', email));
    ccEmails.forEach(email => formData.append('cc', email));
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('pdf', pdfblob, pdfFileName);


    return api.post('send-pdf-email/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

}

export async function dispatchHandoverList() {
    return api.get('handover-list/')
}

export async function saveHandover(handover, user) {
    const checkListData = handover.checklistItems.reduce((acc, item) => {
        const key = item.id.replaceAll('-', '_');

        if (item.value && Array.isArray(item.value.rows)) {
            acc[key] = item.value.rows.map(row =>
                Object.fromEntries(
                    Object.entries(row)
                        .map(([k, v]) => [k,v])
                )
            );
        } else {
            acc[key] = item.value;
        }
        return acc;
    }, {});

    const payload = {
        date: new Date().toLocaleDateString('en-CA'),
        shift: handover.shift,
        region: handover.region,
        dispatcher_name: user.userDetails.fullName,
        chief_duty_name: handover.cddName,
        ...checkListData
    }

    return api.post('handover-save/', payload)
}