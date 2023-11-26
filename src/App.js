import './index.css';
import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = { blogs: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      const newBlog = { ...action.payload.blog, date: new Date().toISOString() };
      return { ...state, blogs: [...state.blogs, newBlog] };
    case 'DELETE_BLOG':
      return { ...state, blogs: state.blogs.filter((_, index) => index !== action.payload.index) };
    case 'UPDATE_BLOG':
      const updatedBlogs = state.blogs.map((blog, index) =>
        index === action.payload.index ? { ...blog, body: action.payload.updatedBlog } : blog
      );
      return { ...state, blogs: updatedBlogs };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addBlog = (blog) => {
    dispatch({ type: 'ADD_BLOG', payload: { blog } });
  };

  return (
    <Router>
      <div className="body">
        <div className="Task-Bar">
        <h1>Blogs & Explore</h1>
          <div className='Content'>
            <Link to="/">
              <button type='button' className="btn btn-warning">Home</button>
            </Link>
            <Link to="/add">
              <button type='button' className="btn btn-success">Add</button>
            </Link>
            <Link to="/search">
              <button type='button' className="btn btn-info">Search</button>
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<BlogList blogs={state.blogs} dispatch={dispatch} />} />
          <Route path="/add" element={<BlogForm addBlog={addBlog} />} />
          <Route path="/search" element={<Search blogs={state.blogs} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;