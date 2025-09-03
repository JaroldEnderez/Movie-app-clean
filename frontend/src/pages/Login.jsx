import React from 'react'
import MovieImage from '../assets/Movie.png'; // Import the image
import axios from 'axios'; // Added axios import

const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your backend login API
      const response = await axios.post('/api/users/login', { email, password });
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Login failed:', error.response.data);
      // Handle login error (e.g., display error message)
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your backend signup API
      const response = await axios.post('/api/users/signup', { username, email, password });
      console.log('Signup successful:', response.data);
      // Handle successful signup (e.g., automatically log in, redirect)
      setIsLogin(true); // Switch to login form after successful signup
    } catch (error) {
      console.error('Signup failed:', error.response.data);
      // Handle signup error (e.g., display error message)
    }
  };

  return (
    <div className='flex h-screen w-screen'> {/* Changed to flex for side-by-side, removed centering for now */}
      {/* Movie Landing Page Section */}
      <div className='w-1/2 h-full relative p-6 flex items-center justify-center flex-col gap-4 shadow-2xl'
      style={{backgroundImage: `url(${MovieImage})`, backgroundSize: 'cover', backgroundPosition:'center' }}>
        <div className='absolute inset-0 bg-black opacity-60'></div> {/* Dark overlay */}
        <div className='relative text-center z-10'>
          <h1 className='text-white text-5xl font-bold mb-4'>Welcome to Netflix!</h1>
          <p className='text-gray-300 text-lg text-center max-w-lg mx-auto'>Discover your next favorite movie or TV show. Dive into a world of entertainment tailored just for you.</p>
          <button className='mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded transition duration-300 text-xl'>Explore Movies</button>
        </div>
      </div>

      {/* Login/Signup Form Section */}
      <div className='w-1/2 h-full relative bg-gray-900 p-8 flex flex-col gap-6 rounded-lg shadow-2xl justify-center items-center'>
        {/* Netflix Logo Placeholder */}
        <img src="https://assets.nflxext.com/us/email/logo_netflix_415X114.png" alt="Netflix Logo" className="w-40 mb-6" />
        
         <div className='w-full max-w-sm'> {/* Wrapper for form elements to control width */}
           <h1 className='text-white text-3xl font-bold text-left mb-6'>{isLogin ? 'Sign In' : 'Sign Up'}</h1>
           <form className='flex flex-col gap-4 w-full' onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
              {!isLogin && (
                <input 
                  type='text' 
                  placeholder='Username' 
                  className='bg-gray-700 p-3 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              )}
              <input 
                type='email' 
                placeholder='Email or phone number' 
                className='bg-gray-700 p-3 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type='password' 
                placeholder='Password' 
                className='bg-gray-700 p-3 rounded text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className='bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-300 text-lg'>{isLogin ? 'Sign In' : 'Sign Up'}</button>
           </form>
           <div className='flex justify-between items-center text-gray-400 text-sm mt-4'>
             {isLogin && (
               <label className='flex items-center'>
                 <input type='checkbox' className='mr-2 bg-gray-600 border-gray-500 rounded focus:ring-red-600' />
                 Remember me
               </label>
             )}
             <a href="#" className='hover:underline'>Need help?</a>
           </div>
           <div className='text-gray-400 mt-8 text-lg'>
             {isLogin ? 'New to Netflix?' : 'Already have an account?'}
             <a href="#" onClick={() => setIsLogin(!isLogin)} className='text-white hover:underline ml-2'>{isLogin ? 'Sign up now' : 'Sign In'}</a>.
           </div>
         </div>
      </div>
    </div>
  )
}

export default Login
