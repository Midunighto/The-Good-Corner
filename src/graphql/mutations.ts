import { gql } from "@apollo/client";

export const CREATE_NEW_AD = gql`
  mutation CreateNewAd($data: AdInput!) {
    createNewAd(data: $data) {
      id
      title
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CategoryInput!) {
    createCategory(data: $data) {
      id
      name
    }
  }
`;

export const CREATE_TAG = gql`
  mutation CreateTag($data: TagsInput!) {
    createTag(data: $data) {
      id
      name
    }
  }
`;
