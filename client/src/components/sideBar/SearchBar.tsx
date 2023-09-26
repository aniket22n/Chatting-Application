import { InputBase, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import { MagnifyingGlass } from "phosphor-react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderBottom: `groove ${theme.palette.text.secondary} 0.2px`,
  borderRadius: "20px",
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  "&:hover": {
    backgroundColor: alpha(theme.palette.background.default, 0.5),
  },
  marginLeft: 0,
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: "10px",
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "18ch",
      },
    },
  },
}));

const SearchBar = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <MagnifyingGlass />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};
export default SearchBar;
