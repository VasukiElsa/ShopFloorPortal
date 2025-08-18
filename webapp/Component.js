sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, Device, JSONModel) {
    "use strict";

    return UIComponent.extend("Shoor_Floor.Component", {
        metadata: {
            // This is where the framework loads the manifest.json file
            // The manifest.json file contains all the app's configuration,
            // including routing and data sources.
            manifest: "json"
        },

        /**
         * The component is initialized by calling the init method on UIComponent.
         * @public
         * @override
         */
        init: function () {
            // Call the init function of the parent. This is a mandatory step.
            UIComponent.prototype.init.apply(this, arguments);

            // Set the device model. This model provides information about the device
            // and is used for responsive design.
            var oDeviceModel = new JSONModel(Device);
            oDeviceModel.setDefaultBindingMode("OneWay");
            this.setModel(oDeviceModel, "device");

            // Create the main container for the views (the root view).
            // This is the control that the router will place the views into.
            // The ID "app" must match the controlId in the manifest.json routing config.
            this._oRootControl = new sap.m.App({
                id: "app"
            });

            // Set the root control of the component to the sap.m.App.
            this.setAggregation("rootControl", this._oRootControl);

            // Initialize the router. This starts the routing and navigation process,
            // loading the initial view based on the URL pattern defined in manifest.json.
            this.getRouter().initialize();
        }
    });
});
