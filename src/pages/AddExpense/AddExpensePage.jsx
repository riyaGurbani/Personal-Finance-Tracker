import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import { Button, FormControlLabel, Grid, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import { useAddExpenseState } from './state.js'

function AddExpensePage() {
  const { paymentMethods, categories, aiSuggestion } = useAddExpenseState()

  return (
    <Stack spacing={3}>
      <PageIntro
        title="Add New Expense"
        description="Enter an expense manually or allow AI to identify its category."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <SectionCard title="Expense form" subtitle="Fields are visual only in this POC foundation.">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Description / Merchant *" placeholder="Swiggy dinner order" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Transaction Date *" placeholder="01-01-2025" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Amount *" placeholder="₹ 450" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField select fullWidth label="Payment Method" defaultValue="upi">
                  {paymentMethods.map((method) => (
                    <MenuItem key={method.value} value={method.value}>
                      {method.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField select fullWidth label="Category" defaultValue="food">
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField fullWidth multiline minRows={4} label="Notes (Optional)" placeholder="Dinner order with friends" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <FormControlLabel control={<Switch defaultChecked />} label="Enable AI Categorization" />
              </Grid>
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
                <Button variant="contained" startIcon={<AddCircleOutlineRoundedIcon />}>
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
