import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import { Alert, Button, FormControlLabel, Grid, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material'
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
    isSaving,
    updateField,
    submitExpense,
  } = useAddExpenseState()

  return (
    <Stack spacing={3}>
      <PageIntro
        title="Add New Expense"
        description="Enter an expense manually or allow AI to identify its category."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SectionCard title="Expense form" subtitle="Save expenses to the backend and use them across dashboard and AI flows.">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Description / Merchant *"
                  placeholder="Swiggy dinner order"
                  value={form.merchant}
                  onChange={(event) => updateField('merchant', event.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Transaction Date *"
                  value={form.date}
                  onChange={(event) => updateField('date', event.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount *"
                  placeholder="450"
                  value={form.amount}
                  onChange={(event) => updateField('amount', event.target.value)}
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
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
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
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
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
                <FormControlLabel
                  control={
                    <Switch
                      checked={form.isAiCategorized}
                      onChange={(event) => updateField('isAiCategorized', event.target.checked)}
                    />
                  }
                  label="Enable AI Categorization"
                />
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
              <Stack direction="row" spacing={1.5} alignItems="center">
                <SmartToyRoundedIcon color="primary" />
                <Typography variant="body2" color="text.secondary">
                  {aiSuggestion.description}
                </Typography>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button variant="outlined">Cancel</Button>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineRoundedIcon />}
                  onClick={submitExpense}
                  disabled={isSaving}
                >
                  Save Expense
                </Button>
                <Button variant="outlined">Save and Add Another</Button>
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default AddExpensePage
