sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
    "use strict";

    return Controller.extend("project1.controller.loginpage", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("loginpage").attachPatternMatched(function (oEvent) {
                // Add any necessary logic for when the route is matched
            }, this);
            
        },

        onLoginUser: function () {
            var oModel = this.getView().getModel("rawData");
            var aUsers = oModel.getProperty("/Users");
            var sUsername = this.getView().byId("inp_usernameId").getValue();
            var sPassword = this.getView().byId("inp_passwordId").getValue();

            if (sUsername === "") {
                MessageBox.error("Please Enter UserName!");
                return;
            } else if (sPassword === "") {
                MessageBox.error("Please Enter Password!");
                return;
            }

            var bUserExists = aUsers.some(function (user) {
                return user.username === sUsername && user.password === sPassword;
            });

            if (bUserExists) {
                var oCurrentUser = aUsers.find(function (user) {
                    return user.username === sUsername && user.password === sPassword;
                });
                oModel.setProperty("/CurrentUser", oCurrentUser);
                oModel.setProperty("/isLoggedIn", true);
                MessageBox.success("Login Successful!");
                
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("View1");
            } else {
                MessageBox.error("Invalid Credentials!");
            }
        },

        onSignUpUser: function () {
            var oModel = this.getView().getModel("rawData");
            var aUsers = oModel.getProperty("/Users");
            var sUsername = this.getView().byId("signUp_usernameId").getValue();
            var sPassword = this.getView().byId("signUp_passwordId").getValue();
            var sConfirmPassword = this.getView().byId("signUp_confirmPasswordId").getValue();

            if (sUsername === "") {
                MessageBox.error("Please Enter UserName!");
                return;
            } else if (sPassword === "") {
                MessageBox.error("Please Enter Password!");
                return;
            } else if (sPassword !== sConfirmPassword) {
                MessageBox.error("Passwords do not match!");
                return;
            }

            var bUserExists = aUsers.some(function (user) {
                return user.username === sUsername;
            });

            if (bUserExists) {
                MessageBox.error("Username already exists!");
                return;
            }

            aUsers.push({ username: sUsername, password: sPassword });
            oModel.setProperty("/Users", aUsers);
            MessageToast.show("Sign Up Successful!");

            // Switch back to login form
            this._toggleForms(false);
        },

        onSwitchToSignUp: function () {
            this._toggleForms(true);
        },

        onSwitchToLogin: function () {
            this._toggleForms(false);
        },
        tohome :function(){
            this.getView().byId("homee").setVisible(true);
        },
        onSwitchTohome : function(){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("View1");
        },
        _toggleForms: function (bShowSignUp) {
            var oView = this.getView();
            oView.byId("signUpForm").setVisible(bShowSignUp);
            oView.byId("signUpButton").setVisible(bShowSignUp);
            oView.byId("switchToLoginButton").setVisible(bShowSignUp);
            oView.byId("loginButton").setVisible(!bShowSignUp);
            oView.byId("switchToSignUpButton").setVisible(!bShowSignUp);
            oView.byId("loginForm").setVisible(!bShowSignUp);
        }
        
    });
});
