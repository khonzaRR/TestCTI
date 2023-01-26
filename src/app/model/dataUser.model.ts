import { DobModel } from "./dob.model";
import { IdModel } from "./id.model";
import { LocationModel } from "./location.model";
import { LoginModel } from "./login.model";
import { NameModel } from "./name.model";
import { PictureModel } from "./picture.model";
import { RegisteredModel } from "./registered.model";

export interface DataUser{
    gender : string;
    name : NameModel;
    location: LocationModel;
    email : string;
    login : LoginModel;
    dob : DobModel;
    registered: RegisteredModel;
    phone : string;
    cell : string;
    id : any;
    picture : PictureModel;
    nat : string;

}