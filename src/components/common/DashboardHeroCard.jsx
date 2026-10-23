import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded'
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded'
import { alpha } from '@mui/material/styles'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'

function DashboardHeroCard({ greeting, topCategory, potentialSavings, onAddExpense, onAskAi, onSetBudget, onViewReports }) {
  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 6,
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 'auto', md: 240 },
        background: (theme) =>
          `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.16)} 0%, ${alpha(theme.palette.secondary.main, 0.14)} 100%)`,
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
        boxShadow: '0px 24px 60px rgba(76, 111, 255, 0.12)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at top right, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 34%), radial-gradient(circle at bottom right, rgba(123,97,255,0.18) 0%, rgba(123,97,255,0) 32%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: { xs: -30, md: 24 },
          bottom: { xs: -40, md: -18 },
          width: { xs: 140, md: 220 },
          height: { xs: 140, md: 220 },
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.22)',
          filter: 'blur(2px)',
        }}
      />

      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        spacing={{ xs: 3, lg: 2 }}
        justifyContent="space-between"
        sx={{ position: 'relative' }}
      >
        <Stack spacing={2.25} sx={{ maxWidth: 720 }}>
          <Chip label="Daily overview" color="primary" variant="outlined" sx={{ alignSelf: 'flex-start', bgcolor: 'rgba(255,255,255,0.45)' }} />
          <Stack spacing={1}>
            <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {greeting?.title || 'Welcome back'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 620 }}>
              {greeting?.description || 'Track spending, review AI guidance, and take action from one place.'}
            </Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap flexWrap="wrap">
            <Button variant="contained" startIcon={<AddCircleOutlineRoundedIcon />} onClick={onAddExpense}>
              Add Expense
            </Button>
            <Button variant="outlined" startIcon={<AutoAwesomeRoundedIcon />} onClick={onAskAi} sx={{ bgcolor: 'rgba(255,255,255,0.55)' }}>
              Ask AI
            </Button>
            <Button variant="outlined" startIcon={<SavingsRoundedIcon />} onClick={onSetBudget} sx={{ bgcolor: 'rgba(255,255,255,0.55)' }}>
              Set Budget
            </Button>
            <Button variant="outlined" startIcon={<AssessmentRoundedIcon />} onClick={onViewReports} sx={{ bgcolor: 'rgba(255,255,255,0.55)' }}>
              View Reports
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={1.5} sx={{ width: { xs: '100%', lg: 260 }, alignSelf: 'stretch', justifyContent: 'center' }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.62)',
              border: '1px solid rgba(255,255,255,0.5)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Top category
            </Typography>
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              {topCategory?.label || 'No category data'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {topCategory ? `${topCategory.formattedAmount} • ${topCategory.percentage}% of spend` : 'Track more expenses to unlock category insights.'}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.62)',
              border: '1px solid rgba(255,255,255,0.5)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Potential savings
            </Typography>
            <Typography variant="h5" sx={{ mt: 0.5 }}>
              {potentialSavings || '—'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              AI-identified opportunities based on your recent spending patterns.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default DashboardHeroCard
