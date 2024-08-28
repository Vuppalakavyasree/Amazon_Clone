sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",

],
function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit: function () {
            // Initialize JSON Model with initial data
            // var oData = {
            //     Products: [],
            //     Users: [],
            //     LoggedInUser: null
            // };
            // var oModel = new JSONModel(oData);
            // this.getView().setModel(oModel, "viewModel");

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("View1").attachPatternMatched(function (oEvent) {}, this);
            // next 
            var oModel = this.getOwnerComponent().getModel("rawData");
            this.getView().setModel(oModel);
            
        },
        
        onClicklogoutpage : function(){
            var oModel = this.getView().getModel("rawData");
            oModel.setProperty("/isLoggedIn", false);
        },
        onClickloginpage: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("loginpage");
        },
        onClick: function(oEvent){
                this.getView().getModel("rawData").setProperty("/SelectedData", []);
                let aSelectedData;
                const sId = oEvent.getSource().sId;
                console.log(sId);
                if(sId.includes("btWomen")){
                    aSelectedData = this.getView().getModel("rawData").getProperty("/DressesWomen");
                } else if(sId.includes("btMen")){
                    aSelectedData = this.getView().getModel("rawData").getProperty("/DressesMen");
                }else if(sId.includes("btKid")){
                    aSelectedData = this.getView().getModel("rawData").getProperty("/DressesKids");
                }
                this.getView().getModel("rawData").setProperty("/SelectedData", aSelectedData);
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("women");
        } ,
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
