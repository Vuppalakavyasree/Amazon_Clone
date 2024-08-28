sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.cart", {
        onInit: function () {
            var oModel = this.getOwnerComponent().getModel("rawData");
            this.getView().setModel(oModel);
        },
        onBuyFromCart: function (oEvent) {
            var oModel = this.getView().getModel("rawData");
            var oSelectedItem = oEvent.getSource().getBindingContext("rawData").getObject();
            oModel.setProperty("/SelectedItem", oSelectedItem);
            
            // Navigate to the buy page
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("buy");
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
        onClickMyOrders: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("myOrders"); // Navigate to the new My Orders page
        },
        onRemoveFromCart: function (oEvent) {
            var oModel = this.getView().getModel("rawData");
            var oSelectedItem = oEvent.getSource().getBindingContext("rawData").getObject();
            var aCartItems = oModel.getProperty("/CartItems") || [];

            // Find the index of the item to remove
            var iIndex = aCartItems.indexOf(oSelectedItem);

            if (iIndex !== -1) {
                aCartItems.splice(iIndex, 1); // Remove the item from the array
                oModel.setProperty("/CartItems", aCartItems); // Update the cart items in the model

                // Show message toast indicating the item was removed from the cart
                MessageToast.show("Item removed from cart successfully");
            } else {
                MessageBox.error("Failed to remove item from cart.");
            }
        }
    });
});
