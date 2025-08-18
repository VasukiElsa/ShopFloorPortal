sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("Shoor_Floor.controller.Login", {
    onLoginPress: function () {
      const oModel = this.getView().getModel();
      const sEmpId = this.byId("empIdInput").getValue();
      const sEmpPassword = this.byId("empPasswordInput").getValue();

      // Construct the OData URL with key properties
      const sPath = oModel.createKey("/ShopFloor_LoginSet", {
        EmpId: sEmpId,
        EmpPassword: sEmpPassword
      });

      oModel.read(sPath, {
        success: function (oData) {
          // Check if the login was successful based on the returned data
          if (oData.EmpPassword === "Login Successful") {
            MessageToast.show("Login Successful!");
            this.getOwnerComponent().getRouter().navTo("main");
            
          } else {
            MessageToast.show("Login Failed. Please check your credentials.");
          }
        }.bind(this),
        error: function () {
          MessageToast.show("An error occurred during login.");
        }
      });
    }
  });
});