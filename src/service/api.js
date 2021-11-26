const PORT = process.env.REACT_APP_PORT || 8080;
const URL = `http://localhost:${PORT}`;

export const createUser = async (name, email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  };
  try {
    const request = await fetch(`${URL}/users`, requestOptions);
    const response = await request.json();
    return { message: response.message, status: request.status };
  } catch (err) {
    return err;
  }
};

export const login = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  try {
    const request = await fetch(`${URL}/users/login`, requestOptions);
    const response = await request.json();
    return {
      message: response.token || response.message,
      status: request.status,
    };
  } catch (err) {
    return err;
  }
};

export const createPost = async (title, description) => {
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-type': 'application/json', Authorization: `${token}` },
    body: JSON.stringify({
      title,
      description,
    }),
  };
  try {
    const request = await fetch(`${URL}/posts`, requestOptions);
    const response = await request.json();
    return { message: response.message, status: request.status };
  } catch (err) {
    return err;
  }
};

export const getAllPosts = async () => {
  try {
    const request = await fetch(`${URL}/posts`);
    const response = await request.json();
    return { posts: response, status: request.status };
  } catch (err) {
    return err;
  }
};

export const getPostsByUser = async () => {
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-type': 'application/json', Authorization: `${token}` },
  };
  try {
    const request = await fetch(`${URL}/posts/myposts`, requestOptions);
    const response = await request.json();
    return { posts: response, status: request.status };
  } catch (err) {
    return err;
  }
};

export const updatePost = async (title, description, id) => {
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-type': 'application/json', Authorization: `${token}` },
    body: JSON.stringify({
      title,
      description,
    }),
  };
  try {
    const request = await fetch(`${URL}/posts/${id}`, requestOptions);
    const response = await request.json();
    return { message: response.message, status: request.status };
  } catch (err) {
    return err;
  }
};

export const deletePost = async (id) => {
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json', Authorization: `${token}` },
  };
  try {
    const request = await fetch(`${URL}/posts/${id}`, requestOptions);
    const response = await request.json();
    return { message: response.message, status: request.status };
  } catch (err) {
    return err;
  }
};
