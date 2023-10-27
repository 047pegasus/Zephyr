import { Account,Client } from 'appwrite';

const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('65392381bb7b304646fc')

export const account = new Account(client)