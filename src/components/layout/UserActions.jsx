import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AIProviderSelect from "./AIProviderSelect.jsx";

function UserActions({ pageTitle }) {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="center"
      sx={{ justifyContent: "flex-end" }}
    >
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <AIProviderSelect />
      </Box>
      <IconButton aria-label="notifications">
        <Badge color="error" variant="dot">
          <NotificationsNoneRoundedIcon />
        </Badge>
      </IconButton>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "secondary.main",
            fontSize: 14,
          }}
        >
          M
        </Avatar>
        <Box sx={{ display: { xs: "none", lg: "block" } }}>
          <Typography variant="subtitle2">Mohan</Typography>
        </Box>
        <KeyboardArrowDownRoundedIcon
          sx={{
            display: { xs: "none", lg: "block" },
            color: "text.secondary",
            fontSize: 18,
          }}
        />
      </Stack>
    </Stack>
  );
}

export default UserActions;
