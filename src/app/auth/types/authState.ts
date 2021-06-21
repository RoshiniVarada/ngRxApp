import { ServiceErrors } from "src/app/shared/types/serviceErrors";
import { User } from "src/app/shared/types/user";

export interface authState{
    isSubmitting:boolean,
    user:User | null,
    isLoggedIn: boolean | null,
    validationErrors :ServiceErrors | string | null
}