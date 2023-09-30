import { InputBase, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { searchUser } from "../../store/atoms/search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: `groove ${theme.palette.text.secondary} 0.2px`,
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.default, 0.5),
  },
  marginLeft: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: "10px",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const SearchBar = () => {
  const [username, setUsername] = useRecoilState(searchUser);
  return (
    <Search>
      <StyledInputBase
        placeholder="Enter username.."
        value={username}
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => setUsername(e.target.value)}
      />
    </Search>
  );
};
export default SearchBar;
