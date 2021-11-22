const token = localStorage.getItem('token');

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
    const request = await fetch('http://localhost:3000/users', requestOptions);
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
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
    const request = await fetch('http://localhost:3000/login', requestOptions);
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const createPost = async (title, description) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-type': 'application/json', Authorization: `${token}` },
    body: JSON.stringify({
      title,
      description,
    }),
  };
  try {
    const request = await fetch('http://localhost:3000/posts', requestOptions);
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllPosts = async () => {
  try {
    const request = await fetch('http://localhost:3000/posts');
    console.log(request.status);
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getPostsByUser = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-type': 'application/json', Authorization: `${token}` },
  };
  try {
    const request = await fetch('http://localhost:3000/posts/myposts', requestOptions);
    console.log(request.status);
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const updatePost = async (title, description, id) => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-type': 'application/json', Authorization: `${token}` },
    body: {
      title,
      description,
    },
  };
  try {
    const request = await fetch(`http://localhost:3000/posts/${id}`, requestOptions);
    console.log(request.status);
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deletePost = async (id) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json', Authorization: `${token}` },
  };
  try {
    const request = await fetch(`http://localhost:3000/posts/${id}`, requestOptions);
    console.log(request.status);
    const response = await request.json();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};