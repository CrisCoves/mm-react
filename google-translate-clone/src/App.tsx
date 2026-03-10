import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';

import { useStore } from './hooks/useStore.ts';
import { AUTO_LANGUAGE } from './constants.ts';
import { ArrowsIcon } from './components/Icons.tsx';
import { LanguageSelector } from './components/LanguageSelector.tsx';
import { TextArea } from './components/TextArea.tsx';
import { SectionType } from './types.d';

function App() {
  const {
    fromLanguage,
    fromText,
    toLanguage,
    result,
    loading,
    setFromLanguage,
    setToLanguage,
    setFromText,
    interchangeLanguages,
    setResult,
  } = useStore();

  return (
    <Container fluid>
      <h1>Google translate clone</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <h2>From</h2>
            <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />

            <TextArea type={SectionType.From} onChange={setFromText} value={fromText} />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            variant={'link'}
            type={'button'}
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowsIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <h2>To</h2>
            <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />

            <TextArea type={SectionType.To} loading={loading} value={result} onChange={setResult} />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
