import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    // Page Layout
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 10,
        lineHeight: 1.4,
    },

    // Header Section
    header: {
        marginBottom: 30,
        borderBottom: '2 solid #1e293b',
        paddingBottom: 20,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 18,
        textAlign: 'center',
    },

    headerSubtitle: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 5,
    },

    dispatcherNameSubTitle: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        marginBottom: 20,
    },

    // Main Header Section
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    infoItem: {
        flex: 1,
        marginHorizontal: 5,
    },

    infoLabel: {
        fontSize: 9,
        color: '#64748b',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 3,
    },

    infoValue: {
        fontSize: 12,
        color: '#1e293b',
        fontWeight: 'bold',
        backgroundColor: '#f8fafc',
        padding: 8,
        borderRadius: 4,
        border: '1 solid #e2e8f0',
    },

    // Header Content Section
    section: {
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 12,
        paddingBottom: 5,
        borderBottom: '1 solid #e2e8f0',
    },

    // Checklist Items
    checklistItem: {
        marginBottom: 15,
        backgroundColor: '#ffffff',
        border: '1 solid #e2e8f0',
        borderRadius: 6,
        padding: 12,
        breakInside: 'avoid',
    },

    checklistItemCompleted: {
        backgroundColor: '#f0fdf4',
        borderColor: '#22c55e',
    },

    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },

    itemTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#1e293b',
        flex: 1,
        marginRight: 10,
    },

    itemBadges: {
        flexDirection: 'row',
        gap: 5,
    },

    badge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        fontSize: 7,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    requiredBadge: {
        backgroundColor: '#fef2f2',
        color: '#dc2626',
        border: '1 solid #fecaca',
    },

    completedBadge: {
        backgroundColor: '#f0fdf4',
        color: '#059669',
        border: '1 solid #bbf7d0',
    },

    pendingBadge: {
        backgroundColor: '#f8fafc',
        color: '#64748b',
        border: '1 solid #e2e8f0',
    },

    itemDescription: {
        fontSize: 9,
        color: '#64748b',
        marginBottom: 8,
        fontStyle: 'italic',
    },

    // Text Content
    textContent: {
        fontSize: 10,
        color: '#374151',
        backgroundColor: '#f9fafb',
        padding: 8,
        borderRadius: 4,
        border: '1 solid #e5e7eb',
        minHeight: 20,
    },

    emptyContent: {
        fontSize: 9,
        color: '#9ca3af',
        fontStyle: 'italic',
    },

    // Table
    table: {
        marginTop: 8,
    },

    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderBottom: '1 solid #cbd5e1',
        paddingVertical: 6,
        paddingHorizontal: 8,
    },

    tableHeaderCell: {
        flex: 1,
        fontSize: 8,
        fontWeight: 'bold',
        color: '#475569',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },

    tableRow: {
        flexDirection: 'row',
        borderBottom: '1 solid #e2e8f0',
        paddingVertical: 6,
        paddingHorizontal: 8,
    },

    tableCell: {
        flex: 1,
        fontSize: 9,
        color: '#374151',
        paddingRight: 5,
    },

    // Checkboxes
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },

    checkbox: {
        width: 12,
        height: 12,
        borderRadius: 2,
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkboxChecked: {
        backgroundColor: '#22c55e',
        border: '1 solid #16a34a',
    },

    checkboxUnchecked: {
        backgroundColor: '#ffffff',
        border: '1 solid #d1d5db',
    },

    checkmark: {
        fontSize: 8,
        color: '#ffffff',
        fontWeight: 'bold',
    },

    // Footer
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        fontSize: 8,
        color: '#9ca3af',
        borderTop: '1 solid #e5e7eb',
        paddingTop: 10,
    },
});

export const ChecklistPDF = ({data, user}) => {
    const requiredItems = data.checklistItems.filter(item => item.required).length;
    const requiredCompleted = data.checklistItems.filter(item => item.required && item.completed).length;

    // Format Date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Render Specific Checklist Item Type
    const renderItemContent = (item) => {
        switch (item.type) {
            case 'textarea':
            case 'input':
                return (
                    <View style={styles.textContent}>
                        <Text style={item.value ? {} : styles.emptyContent}>
                            {item.value || 'No data entered'}
                        </Text>
                    </View>
                );

            case 'select':
                return (
                    <View style={styles.textContent}>
                        <Text style={item.value ? {} : styles.emptyContent}>
                            {item.value || 'No selection made'}
                        </Text>
                    </View>
                );

            case 'checkbox':
                return (
                    <View style={styles.checkboxContainer}>
                        <View style={[styles.checkbox, item.completed ? styles.checkboxChecked : styles.checkboxUnchecked]}>
                            {item.completed && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={{ fontSize: 10, color: item.completed ? '#059669' : '#64748b' }}>
                            {item.completed ? 'Completed' : 'Not completed'}
                        </Text>
                    </View>
                );

            case 'table':
                if (!item.value || !item.value.rows || item.value.rows.length === 0) {
                    return (
                        <View style={styles.textContent}>
                            <Text style={styles.emptyContent}>No entries</Text>
                        </View>
                    );
                }

                return (
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            {item.value.columns.map((column, index) => (
                                <Text key={index} style={styles.tableHeaderCell}>
                                    {column.label}
                                </Text>
                            ))}
                        </View>

                        {/* Table Rows */}
                        {item.value.rows.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.tableRow}>
                                {item.value.columns.map((column, colIndex) => (
                                    <Text key={colIndex} style={styles.tableCell}>
                                        {row[column.key] || '-'}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </View>
                );

            default:
                return (
                    <View style={styles.textContent}>
                        <Text style={styles.emptyContent}>Content not available</Text>
                    </View>
                );
        }
    };

    // Render the Checklist Item Content
    const renderChecklistItem = (item) => (
        <View
            key={item.id}
            style={[
                styles.checklistItem,
                item.completed && styles.checklistItemCompleted
            ]}
        >
            {/* Item Header */}
            <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemBadges}>
                    {item.required && (
                        <Text style={[styles.badge, styles.requiredBadge]}>Required</Text>
                    )}
                    <Text style={[
                        styles.badge,
                        item.completed ? styles.completedBadge : styles.pendingBadge
                    ]}>
                        {item.completed ? 'Completed' : 'Pending'}
                    </Text>
                </View>
            </View>

            {/* Item Description */}
            {item.description && (
                <Text style={styles.itemDescription}>{item.description}</Text>
            )}

            {/* Item Content */}
            {renderItemContent(item)}
        </View>
    );

    // Render Headers
    const renderHeader = (subtitle = null) => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>
                {`Handover ${data.region ? data.region[0].toUpperCase() + data.region.slice(1) : ""} Report`}
            </Text>
            <Text style={styles.headerSubtitle}>
                {subtitle || 'Handover Report'}
            </Text>
            <Text style={styles.dispatcherNameSubTitle}>
                Dispatcher: {user.userDetails.fullName}
            </Text>

            {/* Main Header Information */}
            {subtitle === "Handover Report" && (
                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Date</Text>
                        <Text style={styles.infoValue}>{formattedDate}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Shift</Text>
                        <Text style={styles.infoValue}>
                            {data.shift.charAt(0).toUpperCase() + data.shift.slice(1)}
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>CDD</Text>
                        <Text style={styles.infoValue}>{data.cddName}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Region</Text>
                        <Text style={styles.infoValue}>
                            {data.region.charAt(0).toUpperCase() + data.region.slice(1)}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );

    // Group Items
    const requiredItemsList = data.checklistItems.filter(item => item.required);
    const optionalItemsList = data.checklistItems.filter(item => !item.required);

    // Pagination Logic - Split Optional items into chunks
    const ITEMS_PER_PAGE = 4;
    const optionalItemsChunks = [];

    for (let i = 0; i < optionalItemsList.length; i += ITEMS_PER_PAGE) {
        optionalItemsChunks.push(optionalItemsList.slice(i, i + ITEMS_PER_PAGE));
    }

    // Calculate Page Total
    const totalPages = 1 + optionalItemsChunks.length;

    return (
        <Document>
            {/* Page 1 - Required Content */}
            <Page size="A4" style={styles.page}>
                {renderHeader('Handover Report')}

                {/* Required Item Section */}
                {requiredItemsList.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Required Items ({requiredCompleted}/{requiredItems} Completed)</Text>
                        {requiredItemsList.map(renderChecklistItem)}
                    </View>
                )}

                {/* Footer Page 1 */}
                <Text style={styles.footer}>
                    Generated on {formattedDate} at {formattedTime} | Flair Airlines | Page 1 of {totalPages}
                </Text>
            </Page>

            {/* Optional Item Pages - Create a page for each chunk */}
            {optionalItemsChunks.map((chunk, chunkIndex) => (
                <Page key={`optional-page-${chunkIndex}`} size="A4" style={styles.page}>
                    {renderHeader(`Optional Items - Page ${chunkIndex + 2}`)}

                    {/* Optional Items Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Optional Items ({optionalItemsList.filter(item => item.completed).length}/{optionalItemsList.length} Completed)
                            {optionalItemsChunks.length > 1 && (
                                <Text style={{ fontSize: 12, color: '#64748b', fontWeight: 'normal' }}>
                                    {' '}(Items {chunkIndex * ITEMS_PER_PAGE + 1}-{Math.min((chunkIndex + 1) * ITEMS_PER_PAGE, optionalItemsList.length)} of {optionalItemsList.length})
                                </Text>
                            )}
                        </Text>
                        {chunk.map(renderChecklistItem)}
                    </View>

                    {/* Footer for Optional Pages */}
                    <Text style={styles.footer}>
                        Generated on {formattedDate} at {formattedTime} | FlairDispatch System | Page {chunkIndex + 2} of {totalPages}
                    </Text>
                </Page>
            ))}
        </Document>
    );
};

export default ChecklistPDF;



