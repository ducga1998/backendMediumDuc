/**
 * Custom scalars (data types, like Int, String,...) live in this file,
 * both their type definitions and their resolvers
 */
import GraphQLDate from 'graphql-date';
import GraphQLJSON from 'graphql-type-json';
// import { GraphQLUpload } from 'apollo-upload-server';
import LowercaseString from './custom-scalars/LowercaseString';

export const typeDefs = /* GraphQL */ `
	scalar Date
  	scalar LowercaseString
 	scalar JSON
`
//   scalar Upload
export const resolvers = {
    Date: GraphQLDate,
    // Upload: GraphQLUpload,
    LowercaseString,
    JSON: GraphQLJSON
}
