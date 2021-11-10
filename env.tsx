const variables = {
  development: {
    googleApiKey: "AIzaSyClZQBT6Eek3xcDN8IG8niywrZWVQnjDg0",
  },
  production: {
    googleApiKey: "AIzaSyClZQBT6Eek3xcDN8IG8niywrZWVQnjDg0",
  },
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
