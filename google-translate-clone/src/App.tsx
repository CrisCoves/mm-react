import { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';

import { useStore } from './hooks/useStore.ts';
import { useDebounce } from './hooks/useDebounce.ts';
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants.ts';
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector.tsx';
import { TextArea } from './components/TextArea.tsx';
import { SectionType } from './types.d';
import { translate } from './services/translate.ts';

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
  const debouncedFromText = useDebounce(fromText, 500);

  useEffect(() => {
    if (debouncedFromText === '') return;
    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        if (result == null) return;
        console.log('Hola mundo');
        setResult(result);
      })
      .catch(() => {
        setResult('Error');
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    console.log('utterance.lang:', utterance.lang);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

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

            <div style={{ position: 'relative' }}>
              <TextArea loading={loading} type={SectionType.To} value={result} onChange={setResult} />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button variant='link' onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
                <Button variant='link' onClick={handleSpeak}>
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
