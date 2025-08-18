sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "Shoor_Floor/util/Formatter"
], function (Controller, Filter, FilterOperator, Formatter) {
    "use strict";

    return Controller.extend("Shoor_Floor.controller.PlannedOrdersMonth", {
        Formatter: Formatter,

        onInit: function () {
            const now = new Date();
            const currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);

            // Set default month
            this.byId("plannedMonthSelect").setSelectedKey(currentMonth);

            // Load data
            this._loadData(currentMonth);
        },

        onMonthSubmit: function () {
            const month = this.byId("plannedMonthSelect").getSelectedKey();
            this._loadData(month);
        },

        _loadData: function (month) {
            const oTable = this.byId("plannedMonthTable");

            if (!oTable) {
                console.error("⚠️ Table not found");
                return;
            }

            const aFilters = [
                new Filter("OrderType", FilterOperator.EQ, "P"),
                new Filter("PlannedMonth", FilterOperator.EQ, month)
            ];

            const oBinding = oTable.getBinding("items");

            if (oBinding) {
                oBinding.filter(aFilters);
            } else {
                setTimeout(() => {
                    const oRetryBinding = oTable.getBinding("items");
                    if (oRetryBinding) {
                        oRetryBinding.filter(aFilters);
                    } else {
                        console.error("❌ Binding not ready for plannedMonthTable.");
                    }
                }, 500);
            }
        }
    });
});
