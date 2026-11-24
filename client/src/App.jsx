import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    course: ""
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setMessage(result.message || "Student registered successfully!");

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        course: ""
      });
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition";

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-5 border border-gray-100"
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Student Registration
          </h1>
          <p className="text-sm text-gray-500">
            Fill in the details below to enroll
          </p>
        </div>

        {/* First & Last Name side-by-side on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={inputStyle}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={inputStyle}
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className={inputStyle}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className={inputStyle}
        />

        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
          className={inputStyle}
        >
          <option value="" disabled>
            Select Course
          </option>
          <option value="Software Development">Software Development</option>
          <option value="Networking">Networking</option>
          <option value="Database Management">Database Management</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg shadow-sm transition cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Register Student"}
        </button>

        {message && (
          <div
            className={`p-3 rounded-lg text-sm text-center font-medium ${
              isError
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
