import { gql } from "@apollo/client";

export const GET_ALL_CAT = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

export const GET_ALL_ADS = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner
      price
      pictures {
        url
      }
      location
      createdAt
      category {
        name
      }
      tags {
        name
      }
    }
  }
`;

export const GET_AD_BY_ID = gql`
  query Query($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      description
      owner
      price
      pictures {
        url
      }
      location
      createdAt
      category {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      name
    }
  }
`;

export const GET_TAG_BY_ID = gql`
  query GetTagById($getTagByIdId: Float!) {
    getTagById(id: $getTagByIdId) {
      name
    }
  }
`;
