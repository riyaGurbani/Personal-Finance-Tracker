import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import { Box, Button, Stack, Typography } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'

function KnowledgeCenterPage() {
  return (
    <Stack spacing={3}>
      <PageIntro
        title="Financial Knowledge Center"
        description="Explore the trusted financial documents used by the AI assistant to generate grounded recommendations."
      />

      <SectionCard title="Knowledge sources" subtitle="Future RAG content hub">
        <Stack spacing={2}>
          {[
            'The AI assistant retrieves relevant information from these documents before generating financial recommendations.',
            'Monthly Budgeting Guide',
            'Emergency Fund Basics',
            'Reducing Unnecessary Expenses',
            'Understanding the 50/30/20 Rule',
            'Personal Savings Strategies',
            'Credit Card Management',
          ].map((item, index) => (
            <Stack
              key={item}
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: index === 0 ? 0 : 2,
                borderRadius: index === 0 ? 0 : 4,
                border: index === 0 ? 'none' : '1px solid rgba(148,163,184,0.18)',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                {index === 0 ? <MenuBookRoundedIcon color="primary" /> : <Box sx={{ width: 28, height: 28, borderRadius: 2, backgroundColor: 'rgba(76,111,255,0.12)' }} />}
                <Typography variant="body2" color="text.secondary">
                  {item}
                </Typography>
              </Stack>
              {index === 0 ? null : <Button size="small" variant="outlined">Ask AI</Button>}
            </Stack>
          ))}
        </Stack>
      </SectionCard>
    </Stack>
  )
}

export default KnowledgeCenterPage
