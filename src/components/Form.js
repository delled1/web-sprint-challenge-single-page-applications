//ICE
import React, { useState, useEffect} from "react"
import StyledComponents from "../style"
import { Link } from "react-router-dom"
import axios from "axios"
import * as yup from "yup"

export default function Form(props) {

    const initialFormState = {
        name:"",
        size:"",
        cheese:false,
        pepperoni:false,
        mushrooms:false,
        sausage:false,
        specialInstructions:""
    }

    //inital form state
    const [form, setForm] = useState({initialFormState});

    //temp state used to set state
    const [post, setPost] = useState([]);

    //server error
    const [serverError, setServerError] = useState("");

    //managing state from form inputs 
    const [formState, setFormState] = useState(initialFormState);
    
   //control whether or not the form can be submitted if if there are errors in form validation
   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

   //managing state for errors, empty unless inline validation (validateInput) updates key/value pair to have error
   const [errors, setErrors] = useState(initialFormState);    

    //schema used for all validation to determine whether the input is valid or not   
   const formSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(2, "Please input at least 2 characters"),
    size: yup.boolean().oneOf([true], "Please select a size"),
    cheese: yup.boolean(),
    pepperoni: yup.boolean(),
    mushrooms: yup.boolean(),
    sausage: yup.boolean(),
    specialInstructions: yup.string().required('Please write any special instructions, or "N/A" if nothing is needed.')
})

  // inline validation, validating one key/value pair

  const validateChange = e => {
    yup
    //get the value of schema at key "e.value.name" -> "name="
    .reach(formSchema, e.target.name)
    //value in input
    .validate(e.target.value)
    .then(valid => {
        //if passing validation, clear errors
        setErrors({...errors, [e.target.name]: ""})
    })
    .catch(error => {
        //if failing validation, set error in state
        console.log("error", error);
        setErrors({...errors, [e.target.name]: error.errors[0]})
    })
};

   //whenever state updates, validate the entire form. if valid, then change the button to be enabled

   useEffect(() => {
    formSchema.isValid(formState).then(valid => {
        console.log("valid?", valid)
        setIsButtonDisabled(!valid)
    });
},[formState]);

const formSubmit = e => {
    e.preventDefault();

    //send out POST request with object as second param (formState)

    axios
    .post('https://reqres.in/api/users', formState)
    .then(response => {
        //update temp state with value to display
        setPost(response.data);

        //clear state
        setFormState({
            name:"",
            size:"",
            cheese:false,
            pepperoni:false,
            mushrooms:false,
            sausage:false,
            specialInstructions:""
          });

        //clear any server error
        setServerError(null);
    })
    .catch(error => {
        setServerError("Some error happened")
    });
};
    //onChange function
    const inputChange = e => {
        e.persist();
        const newformData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ?e.target.checked : e.target.value
        };
        validateChange(e);
        setFormState(newformData);  
    };


    return(
        <StyledComponents>
            <div className="headerContainer">
                <h1>Lambda Eats</h1>
                <div className="nav">
                    <Link to="/">
                        Home
                    </Link>
                    <Link to="/Pizza">
                        Order
                    </Link>
                </div>
            </div>
            <div className="bodyContainer">
                <div className="bodyTitle">
                <h2>Customize your pizza!</h2>
                </div>
            </div>
            <br />
            <form onSubmit={formSubmit}>
            {serverError ? <p className="error">{serverError}
            </p> : null}
            <label htmlFor="name">
                Name
                <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={inputChange}
                    value={formState.name}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <br/>
            <label htmlFor="size">
                Size
                <select id="size" name="size" onChange={inputChange} value={formState.size}>
                    <option value="0"> Select Size</option>
                    <option value="1">Small</option>
                    <option value="2">Medium</option>
                    <option value="3">Large</option>
                </select>
                {errors.size.length > 0 ? (
          <p className="error">{errors.size}</p>
        ) : null}
            </label>
            <br/>
            <label htmlFor="cheese" className="toppings">
                <input 
                type="checkbox"
                name="cheese"
                checked={formState.terms}
                onChange={inputChange}
                />
                Cheese
            </label>
            <label htmlFor="pepperoni" className="toppings">
                <input 
                type="checkbox"
                name="pepperoni"
                checked={formState.terms}
                onChange={inputChange}
                />
                Pepperoni
            </label>
            <label htmlFor="mushrooms" className="toppings">
                <input 
                type="checkbox"
                name="mushrooms"
                checked={formState.terms}
                onChange={inputChange}
                />
                Mushrooms
            </label>
            <label htmlFor="sausage" className="toppings">
                <input 
                type="checkbox"
                name="sausage"
                checked={formState.terms}
                onChange={inputChange}
                />
                Sausage
            </label>
            <br />
            <label htmlFor="specialInstructions">
                Special Instructions
                <input
                    id="specialInstructions"
                    type="text"
                    name="specialInstructions"
                    onChange={inputChange}
                    value={formState.specialInstructions}
                />
                {errors.specialInstructions.length > 0 ? <p className="error">{errors.specialInstructions}</p> : null}
            </label>
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button  id="submit" disabled={isButtonDisabled} type="submit">
                Submit
            </button>
            
        </form>
        </StyledComponents>
    )
}