import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Box, Button, Chip, Grid, Stack, TextField, Typography } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import { useAIAssistantState } from './state.js'

function AssistantIllustration() {
  return (
    <Box
      sx={{
        width: { xs: 180, md: 240 },
        height: { xs: 180, md: 240 },
        borderRadius: '32px',
        display: 'grid',
        placeItems: 'center',
        mx: 'auto',
        color: 'common.white',
        background: 'linear-gradient(135deg, #4c6fff 0%, #7b61ff 100%)',
        boxShadow: '0px 24px 50px rgba(76, 111, 255, 0.28)',
      }}
    >
      <SmartToyRoundedIcon sx={{ fontSize: { xs: 72, md: 96 } }} />
    </Box>
  )
}

function AIAssistantPage() {
  const { suggestedQuestions } = useAIAssistantState()

  return (
    <Stack spacing={3}>
      <PageIntro
        title="AI Expense Assistant"
        description="Ask natural-language questions about your spending, categories, trends, and financial guidance."
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <SectionCard title="Hello Mohan 👋" subtitle="I can analyze your expenses history, explain spending patterns, compare budgets, and provide financial guidance.">
            <Stack spacing={3}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Suggested questions</Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {suggestedQuestions.map((question) => (
                    <Chip key={question} label={question} clickable color="secondary" variant="outlined" />
                  ))}
                </Stack>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <TextField
                  fullWidth
                  placeholder="Ask a question about your expenses..."
                />
                <Button variant="contained" endIcon={<SendRoundedIcon />} sx={{ minWidth: 140 }}>
                  Send
                </Button>
              </Stack>
            </Stack>
          </SectionCard>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <SectionCard title="Your personal finance companion" subtitle="Illustration placeholder" minHeight={420}>
            <AssistantIllustration />
          </SectionCard>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default AIAssistantPage
