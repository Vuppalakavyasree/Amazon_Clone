sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("project1.controller.myOrders", {
        onInit: function () {
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
        onClickCart: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("cart");
        }
    });
});
