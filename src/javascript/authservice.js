var authmodule=angular.module("authmodule",[]);

authmodule.service("authservice",function(){
            this.authenticate=function(username,password){
                if(this.username=="admin" && this.password=="admin"){
                    return 'admin';
                }

                else if(this.username=="user" && this.password=="user"){
                    return 'user';
                }

                else
                    return false;
            
            }

            this.setlogindetails=function(username,password){
                this.username=username;
                this.password=password;
                return true;
            }



});