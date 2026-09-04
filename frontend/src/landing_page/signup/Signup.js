import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");

        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
        });
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Unable to connect to backend");
    }
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="/media/images/signup.png"
            alt="Signup"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <h1 className="mb-4">Open a free demat and trading account online</h1>

          <p className="text-muted mb-4">
            Start investing brokerage-free and join millions of investors and
            traders.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mobile Number</label>

              <input
                type="tel"
                name="mobile"
                className="form-control"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Create Account
            </button>
          </form>

          <p className="mt-3 text-muted">
            By signing up, you agree to our Terms & Conditions and Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
