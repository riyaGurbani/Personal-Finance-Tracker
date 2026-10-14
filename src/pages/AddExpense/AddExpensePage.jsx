import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded'
import { alpha } from '@mui/material/styles'
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import { useAddExpenseState } from './state.js'

function AddExpensePage() {
  const {
    form,
    paymentMethods,
    categories,
    aiSuggestion,
    submitMessage,
    errors,
    isSaving,
    updateField,
    submitExpense,
    resetForm,
  } = useAddExpenseState()

  return (
    <Stack spacing={3}>
      <PageIntro
        eyebrow="Capture a new transaction"
        title="Add New Expense"
        description="Enter an expense manually or allow AI to identify its category."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SectionCard title="Expense form" subtitle="Save expenses to the backend and use them across dashboard and AI flows.">
            <Box
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 4,
                background: (theme) =>
                  `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
              }}
            >
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', md: 'center' }}>
                <TaskAltRoundedIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  Add complete transaction details once and reuse them across the dashboard, insights, and history views.
                </Typography>
              </Stack>
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Description / Merchant *"
                  placeholder="Swiggy dinner order"
                  value={form.merchant}
                  onChange={(event) => updateField('merchant', event.target.value)}
                  error={Boolean(errors.merchant)}
                  helperText={errors.merchant}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    border: '1px solid rgba(148,163,184,0.18)',
                    backgroundColor: 'rgba(248,250,252,0.9)',
                  }}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarMonthRoundedIcon color="primary" fontSize="small" />
                      <Typography variant="subtitle2">Transaction schedule</Typography>
                    </Stack>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 7 }}>
                        <TextField
                          fullWidth
                          type="date"
                          label="Transaction Date *"
                          value={form.date}
                          onChange={(event) => updateField('date', event.target.value)}
                          slotProps={{ inputLabel: { shrink: true } }}
                          error={Boolean(errors.date)}
                          helperText={errors.date || 'Choose the calendar date for this expense.'}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 5 }}>
                        <TextField
                          fullWidth
                          type="time"
                          label="Time *"
                          value={form.time}
                          onChange={(event) => updateField('time', event.target.value)}
                          slotProps={{ inputLabel: { shrink: true } }}
                          error={Boolean(errors.time)}
                          helperText={errors.time || 'Add the approximate transaction time.'}
                        />
                      </Grid>
                    </Grid>
                  </Stack>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount *"
                  placeholder="450"
                  value={form.amount}
                  onChange={(event) => updateField('amount', event.target.value)}
                  error={Boolean(errors.amount)}
                  helperText={errors.amount}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>₹</Typography>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Payment Method"
                  value={form.paymentMethod}
                  onChange={(event) => updateField('paymentMethod', event.target.value)}
                >
                  {paymentMethods.map((method) => (
                    <MenuItem key={method.value} value={method.value}>{method.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  value={form.category}
                  onChange={(event) => updateField('category', event.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Notes (Optional)"
                  placeholder="Dinner order with friends"
                  value={form.notes}
                  onChange={(event) => updateField('notes', event.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={form.isAiCategorized}
                        onChange={(event) => updateField('isAiCategorized', event.target.checked)}
                      />
                    }
                    label="Enable AI Categorization"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={form.isRecurring}
                        onChange={(event) => updateField('isRecurring', event.target.checked)}
                      />
                    }
                    label="Mark as recurring"
                  />
                </Stack>
              </Grid>
              {submitMessage ? (
                <Grid size={{ xs: 12 }}>
                  <Alert severity={submitMessage.includes('successfully') ? 'success' : 'error'}>
                    {submitMessage}
                  </Alert>
                </Grid>
              ) : null}
            </Grid>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <SectionCard title={aiSuggestion.title} subtitle={aiSuggestion.subtitle}>
            <Stack spacing={2}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 4,
                  background: (theme) =>
                    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0.08)} 100%)`,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <SmartToyRoundedIcon color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {aiSuggestion.description}
                  </Typography>
                </Stack>
              </Box>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                <Chip label={form.isAiCategorized ? 'AI categorization on' : 'Manual categorization'} color={form.isAiCategorized ? 'secondary' : 'default'} variant="outlined" />
                <Chip label={form.isRecurring ? 'Recurring expense' : 'One-time expense'} color={form.isRecurring ? 'primary' : 'default'} variant="outlined" />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button
                  variant="contained"
                  startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <AddCircleOutlineRoundedIcon />}
                  onClick={submitExpense}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Expense'}
                </Button>
                <Button variant="outlined" startIcon={<AutorenewRoundedIcon />} onClick={resetForm}>
                  Reset Form
                </Button>
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default AddExpensePage
