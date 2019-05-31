'use strict'

// Enlazar al cliente con el backend de GraphQL
import gql from 'graphql-tag'

export const createProduct = gql`
  mutation createProduct($name: String!, $descripcion: String!){
    createProduct(name: $name, descripcion:$descripcion){
      id,
      name,
      descripcion
    }
  }
`

export const updateProduct = gql`
  mutation updateProduct($id: Int!, $name:String!, $descripcion:String!){
    updateProduct(id: $id, name:$name, descripcion:$descripcion){
      id,
      name,
      descripcion
    }
  }
`

export const deleteProduct = gql`
  mutation deleteProduct($id:Int!){
    deleteProduct(id:$id){
      id,
      name,
      descripcion
    }
  }
`

export const Products = gql`
  query{
    products{
      id,
      name,
      descripcion
    }
  }
`
