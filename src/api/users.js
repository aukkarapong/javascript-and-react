import createFetcher from "./createFetcher";

// const host = process.env.REACT_APP_HOST || ''
const useMock = true;

const fetchUsers = (params) =>
  createFetcher({
    useMock: !useMock,
    method: "get",
    // url: `${host}/your-api-context`,
    url: "https://jsonplaceholder.typicode.com/posts",
    params,
    jsonMock: "users.json",
    delay: 2,
  });

// call method post
/*
const fetchUsers = (params) =>
  createFetcher({
    useMock: !useMock,
    method: "post",
    // url: `${host}/your-api-context`,
    url: "https://jsonplaceholder.typicode.com/posts",
    data: params,
    jsonMock: "users.json",
    delay: 2,
  });
*/

export { fetchUsers };
