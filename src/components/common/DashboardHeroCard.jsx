import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import { alpha } from "@mui/material/styles";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";

function DashboardHeroCard({
  greeting,
  topCategory,
  potentialSavings,
  onAddExpense,
  onAskAi,
  onSetBudget,
  onViewReports,
}) {
  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 4 },
        borderRadius: 1,
        backgroundColor: "common.white",
        border: "1px solid rgba(148, 163, 184, 0.16)",
        boxShadow: "0px 18px 40px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack
            spacing={3}
            sx={{ height: "100%", justifyContent: "space-between" }}
          >
            <Stack spacing={3.5}>
              <Typography
                variant="h3"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                {greeting?.title || "Welcome back"}
              </Typography>

              <Stack spacing={2}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    lineHeight: 1.1,
                    letterSpacing: "-0.04em",
                    maxWidth: 760,
                  }}
                >
                  {potentialSavings && potentialSavings !== "—"
                    ? `You could save ${potentialSavings} this month with 2 quick changes.`
                    : "Your finances look healthy this month with a few areas worth reviewing."}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ maxWidth: 720 }}
                >
                  {greeting?.description ||
                    "AI reviewed your recent spending and highlighted the most important changes to review today."}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              useFlexGap
              flexWrap="wrap"
              alignItems={{ xs: "stretch", sm: "center" }}
            >
              <Button
                variant="contained"
                sx={{ borderRadius: 0.5 }}
                startIcon={<AutoAwesomeRoundedIcon />}
                onClick={onAskAi}
              >
                Review Insights
              </Button>
              <Button
                variant="outlined"
                startIcon={<AddCircleOutlineRoundedIcon />}
                onClick={onAddExpense}
                sx={{
                  borderColor: "rgba(148, 163, 184, 0.28)",
                  borderRadius: 0.5,
                }}
              >
                Add Expense
              </Button>
              <Button
                variant="text"
                onClick={onSetBudget}
                sx={{ px: 0.5, minWidth: "auto", borderRadius: 0.5 }}
                startIcon={<SavingsRoundedIcon />}
              >
                Ask AI
              </Button>
              <Button
                variant="text"
                startIcon={<AssessmentRoundedIcon />}
                onClick={onViewReports}
                sx={{ borderRadius: 0.5 }}
              >
                View Reports
              </Button>
            </Stack>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Box
            sx={{
              height: "100%",
              p: 3,
              borderRadius: 1,
              background: (theme) =>
                `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, rgba(255,255,255,1) 100%)`,
              border: "1px solid rgba(148, 163, 184, 0.16)",
            }}
          >
            <Stack spacing={2.5}>
              <Stack spacing={0.75}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  Financial health score
                </Typography>
                <Stack direction="row" spacing={1.25} alignItems="baseline">
                  <Typography
                    variant="h3"
                    sx={{ lineHeight: 1, letterSpacing: "-0.04em" }}
                  >
                    87
                  </Typography>
                  <Typography variant="h3" color="text.secondary" sx={{ lineHeight: 1, letterSpacing: "-0.04em" }}>
                    / 100
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: "success.main", fontWeight: 700 }}
                >
                  On Track
                </Typography>
              </Stack>

              <Divider />

              <Stack spacing={1.75}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography variant="body2" color="text.secondary">
                    Budget planning
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    Review budget
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography variant="body2" color="text.secondary">
                    Top spending risk
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, textAlign: "right" }}
                  >
                    {topCategory?.label || "No category data"}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography variant="body2" color="text.secondary">
                    Risk detail
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, textAlign: "right" }}
                  >
                    {topCategory
                      ? `${topCategory.formattedAmount} • ${topCategory.percentage}%`
                      : "Track more expenses"}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Typography variant="body2" color="text.secondary">
                    Potential savings
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                      textAlign: "right",
                    }}
                  >
                    {potentialSavings || "—"}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardHeroCard;
