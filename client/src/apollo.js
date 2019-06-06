// Apollo imports
import ApolloClient from 'apollo-boost';

// Initialise ApolloClient
const client = new ApolloClient({
    // initialise uri endpoints
    uri: "http://localhost:4444/graphql",

    // Send authorisation details whenever the API's uri is called
    fetchOptions: {
        credentials: "include"
    },
    request: operation => {
        //request for user's token to authenticate
        const token = localStorage.getItem("token");

        if (token !== null || token !== undefined) {
            operation.setContext({
                headers: { 
                    authorization: token
                }
            })
        }
    },

    // Issue when the is an error
    onError: ({ networkError }) => {
        if (networkError) {
            console.log('Network Error', networkError);

            if (networkError.statusCode === 401) {
                localStorage.removeItem("token")
            }
        }
    }
});

export default client;