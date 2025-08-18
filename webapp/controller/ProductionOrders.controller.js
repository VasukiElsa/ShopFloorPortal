sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "Shoor_Floor/util/Formatter"   // import
], function (Controller, Filter, FilterOperator, MessageToast, Formatter) {  // <-- added Formatter
    "use strict";

    return Controller.extend("Shoor_Floor.controller.ProductionOrders", {
        Formatter: Formatter,   // expose to XML view

        onInit: function () {
            // Load with current year automatically
            const currentYear = new Date().getFullYear().toString();
            this.byId("yearInput").setValue(currentYear);
            this._loadData(currentYear);
        },

        onYearSubmit: function () {
            const year = this.byId("yearInput").getValue();
            if (year && /^\d{4}$/.test(year)) {
                this._loadData(year);
            } else {
                MessageToast.show("Please enter a valid year (YYYY)");
            }
        },

        _loadData: function (year) {
            const oTable = this.byId("productionTable");
            const oBinding = oTable.getBinding("items");

            const aFilters = [
                new Filter("Ordertype", FilterOperator.EQ, "R"),
                new Filter("Filtertype", FilterOperator.EQ, "Y"),
                new Filter("ProductionYear", FilterOperator.EQ, year)
            ];

            if (oBinding) {
                // Update filter
                oBinding.filter(aFilters);
            } else {
                // First-time binding
                oTable.bindItems({
                    path: "/production_orderSet",
                    filters: aFilters,
                    template: oTable.getItems()[0].clone() // reuse ColumnListItem
                });
            }
        }
    });
});
