import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import './Home.css';
import Alert from '../../ui-components/Alert/Alert';
import Categories from '../../data/category';
import Quiz from '../../assets/svgs/quiz.svg';
import { fetchQuestions } from '../../service/get'; // Assuming you import this correctly
import { QuizContext } from '../../context'; // Update the import path accordingly
const Home = () => {
    const { setLoading,questions, setQuestions,setName } = useContext(QuizContext);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        difficulty: '0', // Default level
    });
     const [error, setError] = useState(false);  
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleFetchQuestions = async () => {
        questions.length > 0 && navigate('/quiz') ;
        try {
            await fetchQuestions(formData, setQuestions, setLoading);
            setName(formData.name);
            if(questions.length === 0){
                setError(true);
            }else{
                setError(false);
            }            
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
       
    };
   const validate = () => {
       if (!formData.name || !formData.category || formData.difficulty === '0') {
           return false;
       }else{
           return true;
       }
   } 
    return (
        <div className='home_page'>
            <div className='title'>Home Page</div>
            <div className='d-flex p-4 flex-column flex-md-row align-items-center'>
                <div className='settings mb-3 text-center col-12 col-md-6'>
                    <img src={Quiz} alt='' />
                </div>
                <div className='register d-flex flex-column text-end col-12 col-md-6'> 
                  {
                    error && <Alert>hasn't questions try again</Alert>
                  }                                    
                    <div className='form-floating'>
                        <input
                            type='text'
                            className='form-control'
                            id='nameInput'
                            placeholder='Ismingiz . .'
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <label htmlFor='nameInput'>Ismingiz</label>
                    </div>
                    <div className='form-floating'>
                        <select
                            className='form-select'
                            id='levelSelect'
                            name='difficulty'
                            value={formData.difficulty}
                            onChange={handleInputChange}
                        >
                            <option value='0'>Level</option>
                            <option value='easy'>Easy</option>
                            <option value='medium'>Medium</option>
                            <option value='hard'>Hard</option>
                        </select>
                        <label htmlFor='levelSelect'>Level</label>
                    </div>
                    <div className='form-floating'>
                        <select
                            className='form-select'
                            id='categorySelect'
                            name='category'
                            value={formData.category}
                            onChange={handleInputChange}
                        >
                            <option value=''>Choose a category</option>
                            {Categories.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.category}
                                </option>
                            ))}
                        </select>
                        <label htmlFor='categorySelect'>Category</label>
                    </div>
                    <button
                        className='btn btn-primary mt-3 w-100'
                        onClick={handleFetchQuestions}
                        disabled={!validate}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
