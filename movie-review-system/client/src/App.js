import React,{useState, useEffect} from "react";
import './App.css';
import Axios from "axios";

function App() {

  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() =>{
    Axios.get("http://localhost:3001/api/get").then((response)=>{
      setMovieReviewList(response.data);
    })
  }, [])

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
     movieName: movieName,
     movieReview: movieReview
    });
    setMovieReviewList([...movieReviewList, {movieName: movieName, movieReview: movieReview}
    ])
  };

  const updateReview = (movieName) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movieName,
      movieReview: newReview
     });
     setNewReview("")
     window.location.reload()
  };

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
    window.location.reload()
  };

  return (
    <div className='App'>
       <h1>Movie Review System</h1><br></br>
            <div className='form'>
            Movie Name<br/><input type="text" name='movieName' 
            onChange={(e) => { 
              setMovieName(e.target.value)
              }}
              /><br></br><br></br>
            Review<br/><input type="text" name='review'
            onChange={(e) => { 
              setReview(e.target.value)
              }}
            /><br/>
            <button class="submit" onClick={submitReview}>SUBMIT</button> <br></br><br></br><br></br><br></br><br></br>

            {movieReviewList.map((val) => {
              return (
                <div className="output">
                  <h2>{val.movieName}</h2>
                  <p>{val.movieReview}</p>

                  
                  <input type="text" id="update" onChange={(e)=>{
                    setNewReview(e.target.value)
                  }}/>
                  <button onClick = {() => {updateReview(val.movieName)}}>Update</button>
                  <button onClick = {() => {deleteReview(val.movieName)}}>Delete</button>
                </div>
              );
            })}
          </div>
    </div>
  );
}

export default App;
