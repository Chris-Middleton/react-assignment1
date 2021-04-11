import React, {useState, useEffect} from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios';

function MyApp() {
	const [characters, setCharacters] = useState([]);
	async function makeDeleteCall(person){
		try {
			const response = await axios.delete('http://localhost:5000/users', {data: person});
			if(response.status==204){
				return person;
			}else{
				return false;
			}
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}
	function removeOneCharacter (index) {
		makeDeleteCall(characters[index]).then( result => {
			if (result)
				setCharacters(characters.filter((character, i) => {return character !== result}));
		});
	}
	async function fetchAll(){
		try {
			const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;     
		}
		catch (error){
      //We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
		}
	}
	useEffect(() => {
		fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
	}, [] );
	async function makePostCall(person){
		try {
      const response = await axios.post('http://localhost:5000/users', person);
			if(response.status==201){
				return response.data;
			}else{
				return false;
			}
		}
		catch (error) {
      console.log(error);
      return false;
		}
	}
	function updateList(person) { 
		makePostCall(person).then( result => {
		if (result)
			setCharacters([...characters, result] );
		});
	}
  return(
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
			<Form handleSubmit={updateList} />
    </div> 
  )
}

export default MyApp;