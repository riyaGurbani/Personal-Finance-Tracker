import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Box, Button, Chip, Grid, Stack, TextField, Typography, Paper } from '@mui/material'
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
  const { suggestedQuestions, input, setInput, messages, sendQuestion, isLoading } = useAIAssistantState()

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
                    <Chip
                      key={question}
                      label={question}
                      clickable
                      color="secondary"
                      variant="outlined"
                      onClick={() => sendQuestion(question)}
                    />
                  ))}
                </Stack>
              </Stack>

               <Paper
                 variant="outlined"
                 sx={{
                   mt: 2,
                   mb: 1,
                   p: 2,
                   borderRadius: 2,
                   minHeight: 160,
                   display: 'flex',
                   flexDirection: 'column',
                   gap: 1.5,
                   bgcolor: 'background.default',
                 }}
               >
                 {messages.length === 0 && (
                   <Typography variant="body2" color="text.secondary">
                     Ask a question to start the conversation. I will analyze your expenses and share a concise answer.
                   </Typography>
                 )}
                 {messages.map((msg, index) => (
                   <Stack
                     key={index}
                     alignItems={msg.role === 'user' ? 'flex-end' : 'flex-start'}
                     sx={{ wordBreak: 'break-word' }}
                   >
                     <Box
                       sx={{
                         px: 1.5,
                         py: 1,
                         borderRadius: 2,
                         maxWidth: '100%',
                         bgcolor: msg.role === 'user' ? 'primary.main' : 'grey.100',
                         color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                       }}
                     >
                       <Typography variant="body2">{msg.text}</Typography>
                     </Box>
                   </Stack>
                 ))}
                 {isLoading && (
                   <Typography variant="caption" color="text.secondary">
                     Analyzing your expenses...
                   </Typography>
                 )}
               </Paper>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                 <TextField
                   fullWidth
                   placeholder="Ask a question about your expenses..."
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                       e.preventDefault()
                       sendQuestion()
                     }
                   }}
                 />
                 <Button
                   variant="contained"
                   endIcon={<SendRoundedIcon />}
                   sx={{ minWidth: 140 }}
                   onClick={() => sendQuestion()}
                   disabled={isLoading}
                 >
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
