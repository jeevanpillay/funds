import { gql } from 'apollo-boost';

export const GET_ALL_RECIPES = gql`
    query {
        getAllRecipes {
            name,
            _id,
            description
        }
    }
`;