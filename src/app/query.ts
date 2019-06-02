'use strict'

// Enlazar al cliente con el backend de GraphQL
import gql from 'graphql-tag'


// Queries
export const getAllEncuestas = gql`
  query
  {
    getAllEncuestas {
      id,
      name,
      description,
      creation_date,
      content,
      status,
      deleted
    } 
  }
`

export const getEncuestaByID= gql`
  query getEncuesta($id: Int!)
  {
    getEncuesta(id:$id)
    {
      id,
      name,
      description,
      creation_date,
      content,
      status,
      deleted
    }
  }
`

export const createEncuesta = gql`
  mutation createEncuesta($name: String!, $description: String!, $content: String!, $status:Boolean!)
  {
    createEncuesta(name: $name, description: $description, content: $content, status: $status)
    {
      id,
      name,
      description,
      creation_date,
      content,
      status,
      deleted
    }
  }
`

export const updateEncuesta = gql`
  mutation updateEncuesta($id: Int!, $name: String!, $description: String!, $content: String!, $status: Boolean!, $deleted: Boolean!)
  {
    updateEncuesta(id: $id, name: $name, description: $description, content: $content, status: $status, deleted: $deleted)
    {
      id,
      name,
      description,
      creation_date,
      content,
      status,
      deleted
    }
  }
`
export const deleteEncuesta = gql`
  query deleteEncuesta($id: Int!)
  {
    deleteEncuesta(id:$id)
    {
      id,
      name,
      description,
      creation_date,
      content,
      status,
      deleted
    }
  }
`

/*
export const deleteEncuesta = gql`
  mutation deleteEncuesta($id: Int!)
  {
    deleteEncuesta(id:$id)
    {
      id,
      name,
      description,
      creation_date,
      content,
      status,
      deleted
    }
  }
`
*/


/*
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
*/