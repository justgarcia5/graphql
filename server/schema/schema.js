const graphql = require('graphql');
const { resolve } = require('path');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// Dummy data
var books = [
  { name: 'Name of the Wind', genre: 'Fantasy', id: '1'},
  { name: 'THe Final Empire', genre: 'Fantasy', id: '2'},
  { name: 'The Long Earth', genre: 'Sci-Fi', id: '3'}
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString }},
      resolve(parent, args) {
        //code to get data from db / other source
        return _.find(books, { id: args.id });
        console.log(args.id)
        // return  books.find(book => book.id === id)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
