import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();
export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE =
    {
        chatId: "null",
        user: {}
    }
    const chatReducer = (state, action) => {
        let lund = currentUser.uid > action.payload.uid
        ? currentUser.uid + action.payload.uid
        : action.payload.uid + currentUser.uid
        console.log("lol1 chatContext : ", action, typeof action, action.type)
        console.log("lol2 chatContext : ", currentUser.uid, action.payload.uid, lund)
        console.log("lol3 chatContext : ", currentUser.uid > action.payload.uid)
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user:action.payload,
                    chatId: currentUser.uid > action.payload.uid
                    ? currentUser.uid + action.payload.uid
                    : action.payload.uid + currentUser.uid,

                };
            default:
                return state;
        }

    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    // console.log("state", state)
    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};