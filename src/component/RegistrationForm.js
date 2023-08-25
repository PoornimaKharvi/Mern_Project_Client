import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


const RegistrationForm = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: '',
  });



  const PostData = async (formData) => {
    const url = "http://localhost:7000/user/registerUserDetails"
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify( formData ),
    });

    const data = await res.json();

    if (res.status === 409 || !data) {
      alert("Email  exits");
    } else if(res.status === 201) {
      alert(" registration succesfull");
      history.push("/home");
    }else{
      alert("something went wrong");

    }
    
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMobileNumberChange = (event) => {
    const { name, value } = event.target;
    const numericValue = value.replace(/\D/g, '');
    setFormData({ ...formData, [name]: numericValue });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData({ ...formData, image: imageFile });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    // Validate fields
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      validationErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }


    if (!formData.mobile) {
      validationErrors.mobile = 'Mobile is required';
    } else if (!/^\d+$/.test(formData.mobile)) {
      validationErrors.mobile = 'Mobile must contain only numbers';
    } else if (formData.mobile.length < 10) {
      validationErrors.mobile = 'Mobile must be at least 10 digits';
    }

    if (!formData.designation) {
      validationErrors.designation = 'Designation is required';
    }

    if (!formData.gender) {
      validationErrors.gender = 'Gender is required';
    }

    if (!formData.course) {
      validationErrors.course = 'Course is required';
    }

    // if (!formData.image) {
    //   validationErrors.image = 'Image is required';
    // }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data:', formData);
      PostData(formData)
    } else {
      console.log("empty");

    }
  };

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-input">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="register-input">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="register-input">
          <label>Mobile:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleMobileNumberChange}
          />
          {errors.mobile && <p className="error-message">{errors.mobile}</p>}
        </div>

        <div className="register-input">
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
          />
          {errors.designation && <p className="error-message">{errors.designation}</p>}
        </div>

        <div className="register-input">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="error-message">{errors.gender}</p>}
        </div>

        <div className="register-input">
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
          />
          {errors.course && <p className="error-message">{errors.course}</p>}
        </div>

        {/* <div className="register-input">
          <label>Image:</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {errors.image && <p className="error-message">{errors.image}</p>}
        </div> */}

        <button className="btn btn-primary button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
