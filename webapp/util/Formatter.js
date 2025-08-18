sap.ui.define([], function () {
    "use strict";

    return {
        defaultNA: function (value) {
            return (value && value !== "") ? value : "NA";
        },

        formatDate: function (value) {
            if (value) {
                const oDate = new Date(value);
                if (!isNaN(oDate)) {
                    return oDate.toISOString().split("T")[0]; // yyyy-MM-dd
                }
            }
            return "NA";
        }
    };
});
