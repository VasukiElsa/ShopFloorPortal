sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("Shoor_Floor.controller.Main", {

		onLogoutPress: function() {
			MessageToast.show("You have been logged out.");
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("login");
		},

		onTilePress: function(oEvent) {
			const sHeader = oEvent.getSource().getHeader();
			const oRouter = this.getOwnerComponent().getRouter();

			if (sHeader === "Production Order By Year") {
				oRouter.navTo("productionOrders");
			} else if (sHeader === "Production Order By Month") {
				oRouter.navTo("productionOrdersMonth");
			} else if (sHeader === "Planned Order By Month") {
				oRouter.navTo("plannedOrdersMonth"); // <-- NEW
			} else if (sHeader === "Planned Order By Year") {
				oRouter.navTo("plannedOrders"); // <-- NEW
			}else {
				sap.m.MessageToast.show("Tile pressed: " + sHeader);
			}
		}

	});
});