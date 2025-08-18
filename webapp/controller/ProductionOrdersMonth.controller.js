sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "Shoor_Floor/util/Formatter"
], function (Controller, Filter, FilterOperator, Formatter) {
    "use strict";

    return Controller.extend("Shoor_Floor.controller.ProductionOrdersMonth", {
    	Formatter: Formatter,
    	
        onInit: function () {
            const now = new Date();
            const currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);

            // Set default dropdown to current month
            this.byId("monthSelect").setSelectedKey(currentMonth);

            // Load data for current month
            this._loadData(currentMonth);
        },

        onMonthSubmit: function () {
            const month = this.byId("monthSelect").getSelectedKey();
            this._loadData(month);
        },

        _loadData: function (month) {
            const oTable = this.byId("productionMonthTable");

            if (!oTable) {
                console.error("⚠️ Table with id 'productionMonthTable' not found.");
                return;
            }

            const aFilters = [
                new Filter("Ordertype", FilterOperator.EQ, "R"),
                new Filter("Filtertype", FilterOperator.EQ, "M"),
                new Filter("ProductionMonth", FilterOperator.EQ, month)
            ];

            const oBinding = oTable.getBinding("items");

            if (oBinding) {
                oBinding.filter(aFilters);
            } else {
                console.warn("⚠️ Table binding not ready yet. Retrying...");
                // Retry after 500ms if binding not available yet
                setTimeout(() => {
                    const oRetryBinding = oTable.getBinding("items");
                    if (oRetryBinding) {
                        oRetryBinding.filter(aFilters);
                    } else {
                        console.error("❌ Still no binding available for productionMonthTable.");
                    }
                }, 500);
            }
        }
    });
});
