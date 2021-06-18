import { createAction, props } from "@ngrx/store";
import { RegisterRequest } from "../types/registerRequest";
import { ActionTypes } from "./actionTypes";

export const registerAction=createAction(
    ActionTypes.REGISTER,
    props<{request:RegisterRequest}>()
)