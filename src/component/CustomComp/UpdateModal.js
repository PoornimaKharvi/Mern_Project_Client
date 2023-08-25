import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table, Col, Row } from "react-bootstrap";


function UpdateModal({ setopenModal, openModal, userData,reload }) {
  const onhide = () => {
    setopenModal(false);
    reload()
  };

  const [update, setupdate] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
  });

  useEffect(() => {
    setupdate({
      name: userData?.name,
      email: userData?.email,
      mobile: userData?.mobile,
      designation: userData?.designation,
      gender: userData?.gender,
      course: userData?.course,
    });
  }, [userData,openModal]);

  const handleInputChange = (e) => {
    const updateCopy = { ...update };
    updateCopy[e.target.name] = e.target.value;
    setupdate(updateCopy);
  };

  const handleMobileNumberChange = (event) => {
    const { name, value } = event.target;
    const numericValue = value.replace(/\D/g, '');

    setupdate({ ...update, [name]: numericValue });
  };

const handleSubmit = (event) => {
  event.preventDefault();

  const validationErrors = {};

  // Validate fields
  if (!update.name) {
    validationErrors.name = 'Name is required';
  } else if (update.name.length < 3) {
    validationErrors.name = 'Name must be at least 3 characters';
  }

  if (!update.email) {
    validationErrors.email = 'Email is required';
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(update.email)) {
    validationErrors.email = 'Invalid email address';
  }


  if (!update.mobile) {
    validationErrors.mobile = 'Mobile is required';
  } else if (!/^\d+$/.test(update.mobile)) {
    validationErrors.mobile = 'Mobile must contain only numbers';
  } else if (update.mobile.length < 10) {
    validationErrors.mobile = 'Mobile must be at least 10 digits';
  }

  if (!update.designation) {
    validationErrors.designation = 'Designation is required';
  }

  if (!update.gender) {
    validationErrors.gender = 'Gender is required';
  }

  if (!update.course) {
    validationErrors.course = 'Course is required';
  }

  // if (!update.image) {
  //   validationErrors.image = 'Image is required';
  // }


  if (Object.keys(validationErrors).length === 0) {
    console.log('Form data:', update);
    changeUpdate()
    onhide();

  } else {
    console.log("empty");
       alert("Enter valid data");

  }
};


  const changeUpdate = async () => {
    const {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    } = update;
    try {
      const url = "http://localhost:7000/user/update";
      const res = await fetch(url, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          _id: userData._id,
         name,
          email,
          mobile,
          designation,
          gender,
          course
        }),
      });

      const data = await res.json();
      if (res.status === 200) {
        reload()
        alert("update succesfull");
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal show={openModal}>
        <Modal.Body>
          <h4>update user </h4>
          <Form style={{padding:"10px"}}>
            <Row className="my-4 row">
            Name:  <Col>
             <Form.Control
                  value={update.name}
                  onChange={handleInputChange}
                  name="name"
                  placeholder="name"
                />
              </Col>

           
            </Row>
            <Row className="my-4">Email:
            <Col>
                <Form.Control
                  value={update.email}
                  onChange={handleInputChange}
                  name="email"
                  placeholder="email"
                 
                />
              </Col>
             
            </Row>
            <Row className="my-4">Mobile:
            <Col>
                <Form.Control
                  value={update.mobile}
                  onChange={handleMobileNumberChange}
                  name="mobile"
                  placeholder="mobile"
                />
              </Col>
          
            </Row>


      <Row className="my-4">     Designation:   <Col>
               <Form.Control
                  value={update.designation}
                  onChange={handleInputChange}
                  name="designation"
                  placeholder="designation"
                />
              </Col>
              </Row>

               <Row className="my-4">Gender:<Col>
               <select name="gender" value={update.gender} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
              </Col>
              </Row>
        <Row className="my-4"> Course:      <Col>
                <Form.Control
                  value={update.course}
                  onChange={handleInputChange}
                  name="course"
                  placeholder="course"
                />
              </Col>
</Row>




          </Form>
          <Modal.Footer>
            <Button
              onClick={(event) => {
                handleSubmit(event);
              }}
            >
              Update
            </Button>
            <Button
              onClick={(e) => {
                onhide();
              }}
            >
              close
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateModal;
