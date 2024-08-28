sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
function (Controller,MessageBox,MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.women", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("women").attachPatternMatched(function (oEvent) {
            },this);
            var oModel = this.getOwnerComponent().getModel("rawData");
            this.getView().setModel(oModel);
        },
        onClickHome: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("View1");
		},
        onClicklogoutpage : function(){
            var oModel = this.getView().getModel("rawData");
            oModel.setProperty("/isLoggedIn", false);
        },
        onClickloginpage: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("loginpage");
        },
        onBuyDress : function(oEvent) {
            this.getView().getModel("rawData").setProperty("/SelectedItem", []);
            var oModel = this.getView().getModel("rawData");
            var oSelectedItem = oEvent.getSource().getBindingContext("rawData").getObject();
            this.getView().getModel("rawData").setProperty("/SelectedItem", oSelectedItem);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("buy");
        },
        onAddToCart: function (oEvent) {
            var oModel = this.getView().getModel("rawData");
            var isLoggedIn = oModel.getProperty("/isLoggedIn");

            if (!isLoggedIn) {
                // If the user is not logged in, show a message box prompting them to log in
                sap.m.MessageBox.warning("Please log in to add items to the cart.");
            } else {
                // If the user is logged in, proceed to add the item to the cart
                var oSelectedItem = oEvent.getSource().getBindingContext("rawData").getObject();
                var aCartItems = oModel.getProperty("/CartItems") || [];
                aCartItems.push(oSelectedItem);
                oModel.setProperty("/CartItems", aCartItems);

                // Show message toast indicating the item was added to the cart
                sap.m.MessageToast.show("Item added to cart successfully");
            }
        },
        onClickCart: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("cart");
        },
        onClickMyOrders: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("myOrders"); // Navigate to the new My Orders page
        }
    });
});
