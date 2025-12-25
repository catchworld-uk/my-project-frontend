export default function HandoverListStyling({ children }) {
    return (
        <>
            <style>{`
                .p-datatable {
                    background: rgb(30 41 59) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    border-radius: 0.75rem !important;
                    overflow: hidden;
                }
    
                .p-datatable .p-datatable-header {
                    background: rgb(51 65 85) !important;
                    border-bottom: 1px solid rgb(71 85 105) !important;
                    color: white !important;
                    padding: 1rem 1.5rem !important;
                }
    
                .p-datatable .p-datatable-thead > tr > th {
                    background: rgba(51, 65, 85, 0.5) !important;
                    border-bottom: 1px solid rgb(71 85 105) !important;
                    color: rgb(226 232 240) !important;
                    padding: 1rem 1.5rem !important;
                    font-weight: 600 !important;
                    font-size: 0.875rem !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.05em !important;
                }
    
                .p-datatable .p-datatable-tbody > tr {
                    background: transparent !important;
                    border-bottom: 1px solid rgba(71, 85, 105, 0.5) !important;
                    transition: background-color 0.15s ease !important;
                }
    
                .p-datatable .p-datatable-tbody > tr:hover {
                    background: rgba(51, 65, 85, 0.3) !important;
                }
    
                .p-datatable .p-datatable-tbody > tr > td {
                    padding: 1rem 1.5rem !important;
                    color: white !important;
                    border: none !important;
                }
    
                .p-paginator {
                    background: rgb(30 41 59) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    border-top: none !important;
                    color: white !important;
                    padding: 0.75rem 1.5rem !important;
                    border-radius: 0 0 0.75rem 0.75rem !important;
                }
    
                .p-paginator .p-paginator-current {
                    color: rgb(203 213 225) !important;
                    font-size: 0.875rem !important;
                    margin: 0 1rem !important;
                }
    
                .p-paginator .p-dropdown {
                    background: rgb(51 65 85) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    color: white !important;
                    border-radius: 0.375rem !important;
                    height: 1.75rem !important;
                    min-height: 1.75rem !important;
                    font-size: 0.875rem !important;
                }
    
                .p-paginator .p-dropdown .p-dropdown-label {
                    padding: 0.125rem 0.5rem !important;
                    font-size: 0.875rem !important;
                }
    
                .p-paginator .p-dropdown .p-dropdown-trigger {
                    width: 1.5rem !important;
                    border-left: 1px solid rgb(71 85 105) !important;
                }
    
                .p-paginator .p-paginator-page {
                    background: rgb(51 65 85) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    color: rgb(203 213 225) !important;
                    margin: 0 0.25rem !important;
                    min-width: 1.75rem !important;
                    height: 1.75rem !important;
                    font-size: 0.875rem !important;
                    border-radius: 0.375rem !important;
                }
    
                .p-paginator .p-paginator-page:hover {
                    background: rgb(71 85 105) !important;
                }
    
                .p-paginator .p-paginator-page.p-highlight {
                    background: rgb(37 99 235) !important;
                    border-color: rgb(29 78 216) !important;
                    color: white !important;
                }
    
                .p-paginator .p-paginator-first,
                .p-paginator .p-paginator-prev,
                .p-paginator .p-paginator-next,
                .p-paginator .p-paginator-last {
                    background: rgb(51 65 85) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    color: rgb(203 213 225) !important;
                    margin: 0 0.25rem !important;
                    min-width: 1.75rem !important;
                    height: 1.75rem !important;
                    font-size: 0.875rem !important;
                    border-radius: 0.375rem !important;
                }
    
                .p-paginator .p-paginator-first:hover,
                .p-paginator .p-paginator-prev:hover,
                .p-paginator .p-paginator-next:hover,
                .p-paginator .p-paginator-last:hover {
                    background: rgb(71 85 105) !important;
                }
    
                .p-paginator .p-paginator-first:disabled,
                .p-paginator .p-paginator-prev:disabled,
                .p-paginator .p-paginator-next:disabled,
                .p-paginator .p-paginator-last:disabled {
                    opacity: 0.5 !important;
                    cursor: not-allowed !important;
                }
    
                .p-inputtext {
                    background: rgb(51 65 85) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    color: white !important;
                    border-radius: 0.5rem !important;
                    padding: 0.75rem 1rem !important;
                    height: 48px !important;
                    min-height: 48px !important;
                    box-sizing: border-box !important;
                }
    
                .p-dropdown {
                    background: rgb(51 65 85) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    color: white !important;
                    border-radius: 0.5rem !important;
                    height: 48px !important;
                    min-height: 48px !important;
                }
    
                .p-dropdown:focus {
                    border-color: rgb(59 130 246) !important;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important;
                }
    
                .p-dropdown .p-dropdown-label {
                    color: white !important;
                    padding: 0.75rem 1rem !important;
                }
    
                .p-dropdown .p-dropdown-trigger {
                    color: rgb(148 163 184) !important;
                    width: 2.5rem !important;
                    position: absolute !important;
                    right: 0 !important;
                    top: 0 !important;
                    bottom: 0 !important;
                    border-left: 1px solid rgb(71 85 105) !important;
                    border-radius: 0 0.5rem 0.5rem 0 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
    
                .p-dropdown .p-dropdown-trigger:hover {
                    color: white !important;
                    background: rgba(71, 85, 105, 0.5) !important;
                }
    
                .p-dropdown-panel {
                    background: rgb(51 65 85) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    border-radius: 0.5rem !important;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3) !important;
                }
    
                .p-dropdown-item {
                    color: white !important;
                    padding: 0.75rem 1rem !important;
                }
    
                .p-dropdown-item:hover {
                    background: rgb(71 85 105) !important;
                }
    
                .p-dropdown-item.p-highlight {
                    background: rgb(37 99 235) !important;
                    color: white !important;
                }
                
                .p-column-filter-menu-button {
                  display: none !important;
                }
    
                .p-calendar .p-inputtext {
                    background: rgb(51 65 85) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    color: white !important;
                    padding: 0.75rem 1rem !important;
                    border-radius: 0.5rem !important;
                    height: 48px !important;
                    min-height: 48px !important;
                    box-sizing: border-box !important;
                }
                .p-calendar .p-inputtext::placeholder {
                  color: white !important;
                  opacity: 1; /* Ensure full opacity on some browsers */
                }
                
                .p-inputtext:focus {
                      outline: none !important;
                      box-shadow: 0 0 0 2px #3b82f6; !important;
                      border-color: #3b82f6;
                    }
   
    
                .p-calendar .p-datepicker-trigger {
                    color: rgb(148 163 184) !important;
                    background: rgb(51 65 85) !important;
                    border: none !important;
                    width: 2.5rem !important;
                    position: absolute !important;
                    right: 0 !important;
                    top: 0 !important;
                    bottom: 0 !important;
                    border-left: 1px solid rgb(71 85 105) !important;
                    border-radius: 0 0.5rem 0.5rem 0 !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
    
                .p-calendar .p-datepicker-trigger:hover {
                    color: white !important;
                    background: rgba(71, 85, 105, 0.5) !important;
                }
    
                .p-datepicker {
                    background: rgb(51 65 85) !important;
                    border: 1px solid rgb(71 85 105) !important;
                    border-radius: 0.5rem !important;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3) !important;
                }
    
                .p-datepicker .p-datepicker-header {
                    background: rgb(30 41 59) !important;
                    color: white !important;
                    border-bottom: 1px solid rgb(71 85 105) !important;
                    padding: 1rem !important;
                }
    
                .p-datepicker .p-datepicker-header .p-datepicker-title {
                    color: white !important;
                }
    
                .p-datepicker .p-datepicker-header .p-datepicker-prev,
                .p-datepicker .p-datepicker-header .p-datepicker-next {
                    color: rgb(148 163 184) !important;
                    background: transparent !important;
                    border: none !important;
                    width: 2rem !important;
                    height: 2rem !important;
                }
    
                .p-datepicker .p-datepicker-header .p-datepicker-prev:hover,
                .p-datepicker .p-datepicker-header .p-datepicker-next:hover {
                    color: white !important;
                    background: rgba(71, 85, 105, 0.5) !important;
                }
    
                .p-datepicker table {
                    margin: 0.5rem !important;
                }
    
                .p-datepicker table th {
                    color: rgb(148 163 184) !important;
                    font-weight: 600 !important;
                    padding: 0.5rem !important;
                }
    
                .p-datepicker table td {
                    padding: 0.25rem !important;
                }
    
                .p-datepicker table td > span {
                    color: white !important;
                    width: 2.5rem !important;
                    height: 2.5rem !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    border-radius: 0.375rem !important;
                    transition: all 0.15s ease !important;
                }
    
                .p-datepicker table td > span:hover {
                    background: rgb(71 85 105) !important;
                    color: white !important;
                }
    
                .p-datepicker table td > span.p-highlight {
                    background: rgb(37 99 235) !important;
                    color: white !important;
                }
    
                .p-datepicker table td > span.p-datepicker-other-month {
                    color: rgb(148 163 184) !important;
    
    
                    .p-datepicker table td > span.p-datepicker-today {
                        background: rgba(37, 99, 235, 0.2) !important;
                        color: rgb(96 165 250) !important;
                        font-weight: 600 !important;
                    }
                }
    
                .p-datepicker table td > span {
                    color: white !important;
                }
    
                .p-datepicker table td > span:hover {
                    background: rgb(71 85 105) !important;
                }
    
                .p-datepicker table td > span.p-highlight {
                    background: rgb(37 99 235) !important;
                    color: white !important;
                }
                
          `}</style>
    {children}
    </>

    )
}