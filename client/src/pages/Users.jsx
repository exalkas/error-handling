import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [ageRange, setAgeRange] = useState([18, 70]);

  const [gender, setGender] = useState("any");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const query = `?username=${username}&ageMin=${ageRange[0]}&ageMax=${ageRange[1]}&gender=${gender}`;
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/auth/get/all${query}`
      );
      console.log("🚀 ~ response:", response);
      setUsers(response.data.users);
      setTotal(response.data.total);
    };

    // console.log("🚀 ~ username, ageRange, gender:", username, ageRange, gender);
    fetchUsers();
  }, [username, ageRange, gender]);

  const handleLoadmore = async () => {
    const query = `?username=${username}&ageMin=${ageRange[0]}&ageMax=${ageRange[1]}&gender=${gender}&skip=${users.length}&limit=5`;
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/auth/get/all${query}`
    );
    console.log("🚀 ~ response:", response);
    setUsers((prev) => [...prev, ...response.data.users]);
    setTotal(response.data.total);
  };

  console.log("🚀 ~ total:", total, "users:", users.length);
  return (
    <div className="flex flex-col items-center justify-center gap-[20px] mt-[40px]">
      <div className="flex justify-center items-center gap-[20px] flex-wrap">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          id="outlined-basic"
          label="username"
          variant="outlined"
          placeholder="Search by Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "white" }, // Border color
              "&:hover fieldset": { borderColor: "white" }, // Border color on hover
              "&.Mui-focused fieldset": { borderColor: "white" }, // Border color on focus
              color: "white", // Text color
            },
            "& .MuiInputLabel-outlined": {
              color: "white", // Label color
            },
            "& .MuiOutlinedInput-input": {
              color: "white", // Input text color
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // Notched outline color
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "white", // Focused label color
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white", // Placeholder color
              opacity: 1, // Make placeholder fully opaque
            },
          }}
        />
        {/* </Box> */}
        <div>
          <Box sx={{ width: 150 }}>
            <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
              Age
            </InputLabel>
            <Slider
              getAriaLabel={() => "Age range"}
              value={ageRange}
              onChange={(e, newValue) => setAgeRange(newValue)}
              valueLabelDisplay="auto"
              getAriaValueText={() => ageRange}
              min={20}
              max={70}
            />
          </Box>
        </div>
        <div>
          <Box sx={{ width: 150 }}>
            <FormControl
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "red" },
                  "&.Mui-focused fieldset": { borderColor: "red" },
                  color: "white",
                },
              }}
            >
              <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
                Gender
              </InputLabel>
              <Select
                sx={{ color: "white", borderColor: "white" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem sx={{ color: "red" }} value={"any"}>
                  Any
                </MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <hr className="w-full" />
      <div id="usersList">
        {users?.map((user) => (
          <div
            className="border w-full border-gray-300 rounded-md m-2 p-2 shadow-md flex flex-col items-center"
            key={user._id}
          >
            <div>Username: {user.username}</div>
            <div>Age: {user.age}</div>
            <div>Gender: {user.gender}</div>
          </div>
        ))}
      </div>

      {users.length < total && (
        <button
          type="submit"
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          onClick={handleLoadmore}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default UsersPage;
