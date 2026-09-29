import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import { Box, Button, Grid, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'

function SettingsPage() {
  return (
    <Stack spacing={3}>
      <PageIntro
        title="Settings"
        description="Manage your preferences and application settings."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="Profile" subtitle="Visual-only profile settings">
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2">Mohan</Typography>
                  <Typography variant="body2" color="text.secondary">
                    mohan@example.com
                  </Typography>
                </Box>
                <Button variant="outlined" size="small">
                  Edit
                </Button>
              </Stack>
              <TextField select fullWidth label="Currency" defaultValue="inr">
                <MenuItem value="inr">INR (₹)</MenuItem>
                <MenuItem value="usd">USD ($)</MenuItem>
              </TextField>
              <TextField fullWidth label="Monthly Budget" defaultValue="₹ 65000" />
            </Stack>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SectionCard title="AI Preferences" subtitle="Visual-only toggles for now">
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Enable AI categorization</Typography>
                <Switch defaultChecked />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Enable spending insights</Typography>
                <Switch defaultChecked />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Enable anomaly detection</Typography>
                <Switch defaultChecked />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Enable budget predictions</Typography>
                <Switch defaultChecked />
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2">Enable proactive recommendations</Typography>
                <Switch defaultChecked />
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <SectionCard title="Data and Privacy" subtitle="Future configuration panel">
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TuneRoundedIcon color="primary" />
              <Typography variant="body2" color="text.secondary">
                Manage your data, privacy settings, and account controls here.
              </Typography>
            </Stack>
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default SettingsPage
