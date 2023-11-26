import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../design/BlogForm.css';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  body: Yup.string().required('Body is required'),
});

const BlogForm = ({ addBlog }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addBlog(data);
    console.log('Blog post created successfully');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='Form'>
       <div className='form-content'>
      <div>
        <label>Title</label>
        <input type="text" {...register('title', { required: 'Title is required' })} />
        <p>{errors.title?.message}</p>
      </div>
      <div>
        <label>Body</label>
        <textarea {...register('body', { required: 'Body is required' })} />
        <p>{errors.body?.message}</p>
      </div>
      <div>
         <label>Date</label>
         <input type="text" value={new Date().toLocaleDateString()} readOnly />
      </div>
      <div>
        <button type="submit" class="btn btn-success">Submit</button>
      </div>
      </div>
    </form>
  );
};

export default BlogForm;
