sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "Shoor_Floor/util/Formatter"
], function (Controller, Filter, FilterOperator, MessageToast, Formatter) {
    "use strict";

    return Controller.extend("Shoor_Floor.controller.PlannedOrders", {
        Formatter: Formatter,

        onInit: function () {
            const currentYear = new Date().getFullYear().toString();
            this.byId("plannedYearInput").setValue(currentYear);
            this._loadPlannedOrders(currentYear);
        },

        onYearSubmit: function () {
            const year = this.byId("plannedYearInput").getValue();
            if (year && /^\d{4}$/.test(year)) {
                this._loadPlannedOrders(year);
            } else {
                MessageToast.show("Please enter a valid year (YYYY)");
            }
        },

        _loadPlannedOrders: function (year) {
            const oTable = this.byId("plannedTable");
            const oBinding = oTable.getBinding("items");

            const aFilters = [
                new Filter("OrderType", FilterOperator.EQ, "P"),
                new Filter("PlannedYear", FilterOperator.EQ, year)
            ];

            if (oBinding) {
                oBinding.filter(aFilters);
            } else {
                oTable.bindItems({
                    path: "/Plan_OrderSet",
                    filters: aFilters,
                    template: oTable.getItems()[0].clone() // reuse columnListItem
                });
            }
        }
    });
});
