import { Inngest } from "inngest";
import prisma from "../prisma/index.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "estate.com" });

//Inngest function to save user data
export const saveUserData = inngest.createFunction(
    {id:'save-user-from-clerk'},
    {event: "clerk/user.created"},

    async ({ event }) => {
        const {id, name, email_addresses, phone, password, location, userType, image_url} = event.data;
        const userData = {
            id : id,
            email : email_addresses[0].email_address,
            name : name,
            phone : phone,
            password : password,
            location : location,
            userType : userType,
            avatar: image_url
        }
        await prisma.user.create({data: userData});
    }
)

//Inngest function to delete user data
export const deleteUserData = inngest.createFunction(
    {id:'delete-from-clerk'},
    {event: "clerk/user.deleted"},

    async ({ event }) => {
        const {id} = event.data;
        await prisma.user.delete({where: {id}});
    }
)

//Inngest function to update user data
export const updateUserData = inngest.createFunction(
    {id:'update-from-clerk'},
    {event: "clerk/user.updated"},

    async ({ event }) => {
        const {id, name, email_addresses, phone, password, location, userType, image_url} = event.data;
        const userData = {
            email : email_addresses[0].email_address,
            name : name,
            phone : phone,
            password : password,
            location : location,
            userType : userType,
            avatar: image_url
        }
        await prisma.user.update({where: {id}, data: userData});
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [saveUserData, deleteUserData, updateUserData];
