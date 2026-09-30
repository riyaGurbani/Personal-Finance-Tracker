import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import { Box, Button, Stack, Typography } from '@mui/material'
import PageIntro from '../../components/common/PageIntro.jsx'
import SectionCard from '../../components/common/SectionCard.jsx'
import { useKnowledgeCenterState } from './state.js'

function KnowledgeCenterPage() {
  const { knowledgeItems } = useKnowledgeCenterState()

  return (
    <Stack spacing={3}>
      <PageIntro
        title="Financial Knowledge Center"
        description="Explore the trusted financial documents used by the AI assistant to generate grounded recommendations."
      />

      <SectionCard title="Knowledge sources" subtitle="Future RAG content hub">
        <Stack spacing={2}>
          {knowledgeItems.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              spacing={1.5}
              alignItems="center"
              justifyContent="space-between"
              sx={{
                p: item.isIntro ? 0 : 2,
                borderRadius: item.isIntro ? 0 : 4,
                border: item.isIntro ? 'none' : '1px solid rgba(148,163,184,0.18)',
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                {item.isIntro ? <MenuBookRoundedIcon color="primary" /> : <Box sx={{ width: 28, height: 28, borderRadius: 2, backgroundColor: 'rgba(76,111,255,0.12)' }} />}
                <Typography variant="body2" color="text.secondary">
                  {item.text}
                </Typography>
              </Stack>
              {item.isIntro ? null : <Button size="small" variant="outlined">Ask AI</Button>}
            </Stack>
          ))}
        </Stack>
      </SectionCard>
    </Stack>
  )
}

export default KnowledgeCenterPage
