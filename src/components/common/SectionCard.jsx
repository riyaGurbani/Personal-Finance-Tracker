import { alpha } from "@mui/material/styles";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

function SectionCard({ title, subtitle, action, children, minHeight }) {
  return (
    <Card
      sx={{
        height: "100%",
        minHeight,
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,255,0.96) 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: (theme) =>
            `radial-gradient(circle at top right, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 32%)`,
        }}
      />
      <CardContent sx={{ p: { xs: 2.5, md: 3 }, position: "relative" }}>
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ justifyContent: "space-between" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1.5}
          >
            <Stack spacing={0.75}>
              <Typography
                variant="h6"
                sx={{ color: "text.primary", letterSpacing: "-0.02em" }}
              >
                {title}
              </Typography>
              {subtitle ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxWidth: 720 }}
                >
                  {subtitle}
                </Typography>
              ) : null}
            </Stack>
            {action ? (
              <Box
                sx={{
                  display: "flex",
                  alighnItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                {action}
              </Box>
            ) : null}
          </Stack>
          {children}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SectionCard;
