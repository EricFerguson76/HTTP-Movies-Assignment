import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
  id: '',
  title: '',
  director: '',
  metascore: '',
  stars: []
};

// const id = props.match.params.id;

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/update-movies/${movie.id}`, movie)
      .then(res => {
        setMovie(res.data);
        props.history.push(`/update-movie/${movie.id}`);
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
          placeholder='Title'
          type='text'
          onChange={handleChange}
        />

        <input
          label='director'
          name='director'
          value={movie.director}
          placeholder='Director'
          type='text'
          onChange={handleChange}
        />

        <input
          label='metascore'
          name='metascore'
          value={movie.metascore}
          placeholder='Metascore'
          type='text'
          onChange={handleChange}
        />

        <input
          label='stars'
          name='stars'
          value={movie.stars}
          placeholder='Stars'
          type='text'
          onChange={handleChange}
        />

        <button type='submit'>Edit</button>
        <button type='submit'>Delete</button>
      </div>
    </form>
  );
};

export default UpdateMovie;
