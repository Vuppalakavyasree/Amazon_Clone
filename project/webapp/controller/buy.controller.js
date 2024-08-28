sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
function (Controller,MessageBox) {
    "use strict";

    return Controller.extend("project1.controller.buy", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("buy").attachPatternMatched(function (oEvent) {
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
        onCashOnDelivery: function () {
            var oModel = this.getView().getModel("rawData");
            var bIsLoggedIn = oModel.getProperty("/isLoggedIn");
            var sAddress = oModel.getProperty("/currentorder/address");
        
            if (!bIsLoggedIn) {
                sap.m.MessageToast.show("Please log in to place an order.");
                return;
            }
        
            if (!sAddress || sAddress.trim() === "") {
                sap.m.MessageToast.show("Please enter your address.");
                return;
            }
        
            var oSelectedItem = oModel.getProperty("/SelectedItem");
        
            // Calculate the delivery date as 5 days from now
            var oCurrentDate = new Date();
            oCurrentDate.setDate(oCurrentDate.getDate() + 5);
            var sDeliveryDate = oCurrentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        
            var aOrderItems = oModel.getProperty("/currentorder/items") || [];
            aOrderItems.push({
                ...oSelectedItem,
                address: sAddress,
                deliveryDate: sDeliveryDate
            });
        
            oModel.setProperty("/currentorder/items", aOrderItems);
        
            // Reset the current address in the model
            oModel.setProperty("/currentorder/address", "");
        
            sap.m.MessageBox.confirm("Order placed successfully!", {
                onClose: function () {
                    var oMyOrdersBtn = this.getView().byId("myOrdersBtn");
                    if (oMyOrdersBtn) {
                        oMyOrdersBtn.setVisible(true);
                    }
                }.bind(this)
            });
        },
        onClickMyOrders: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("myOrders"); // Navigate to the new My Orders page
        },
        onClickCart: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("cart");
        }
    });
});
