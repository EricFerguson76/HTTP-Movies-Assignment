import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);

  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e, id) => {
    console.log(id);
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movie).then(res => {
      props.history.push('/');
    });
  };

  const deleteItem = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        props.history.push('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          label='title'
          name='title'
          value={movie.title}
          onChange={handleChange}
        />

        <input
          label='director'
          name='director'
          value={movie.director}
          onChange={handleChange}
        />

        <input
          label='metascore'
          name='metascore'
          value={movie.metascore}
          onChange={handleChange}
        />

        <input
          label='stars'
          name='stars'
          value={movie.stars}
          onChange={handleChange}
        />

        <button onClick={e => handleSubmit(e, id)}>Edit</button>
        <button onClick={deleteItem}>Delete</button>
      </div>
    </form>
  );
};

export default UpdateMovie;
