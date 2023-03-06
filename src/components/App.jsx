import { useEffect, useRef, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

import Card from '@/components/Card';
import CardHeader from '@/components/CardHeader';
import SearchForm from '@/components/SearchForm';
import TermsList from '@/components/TermsList';
import TitleBar from '@/components/TitleBar';
import Toggle from '@/components/Toggle';
import {
  hideCookies,
  hideHistoryItems,
  loadCovered,
  loadTermsList,
  restoreCookies,
  restoreHistoryItems,
  saveCovered,
  saveTermsList,
} from '@/utils/actions';

import styles from '@/styles/App.module.css';
import listStyles from '@/styles/TermsList.module.css';

export default function App() {
  const initialRender = useRef(true);
  const [covered, setCovered] = useState(loadCovered());
  const [showList, setShowList] = useState(false);
  const [termsList, setTermsList] = useState(new Set(loadTermsList()));

  const pillRef = useRef(null);
  const peachRef = useRef(null);
  const circleRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (initialRender.current) return;
    if (covered) {
      hideHistoryItems(10000);
      hideCookies();
    } else {
      restoreHistoryItems();
      restoreCookies();
    }
    saveCovered(covered);
  }, [covered]);

  useEffect(() => {
    if (initialRender.current) return;
    saveTermsList(Array.from(termsList));
  }, [termsList]);

  useEffect(() => {
    initialRender.current = false;
  }, []);

  const addTerm = (term) => {
    if (termsList.size >= 50) return; // * Maximum of 50 terms in list
    const newTermsList = structuredClone(termsList);
    newTermsList.add(term);
    setTermsList(newTermsList);
  };

  const removeTerm = (term) => {
    const newTermsList = structuredClone(termsList);
    if (!newTermsList.delete(term)) return;
    setTermsList(newTermsList);
  };

  return (
    <>
      <header>
        <TitleBar />
      </header>
      <main id={styles.main}>
        <Card>
          <section className={styles.spacer}>
            <Toggle
              covered={covered}
              setCovered={setCovered}
              pillRef={pillRef}
              peachRef={peachRef}
              circleRef={circleRef}
            />
          </section>
          <section className={styles.spacer}>
            <p>
              Your butt is
              <strong> {covered ? 'COVERED' : 'SHOWING '}</strong>
              {!covered && <FiAlertTriangle />}
            </p>
          </section>
        </Card>
        <Card>
          <CardHeader text={'Blocklist'} />
          <section className={styles.spacer}>
            <SearchForm
              addTerm={addTerm}
              tempSetShowList={() => {
                if (showList === false) {
                  setShowList(true);
                  setTimeout(() => setShowList(false), 5000);
                }
              }}
            />
          </section>
          <div
            id="expand_text"
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={() => {
              if (showList) {
                setTimeout(() => setShowList(() => false), 700);
                listRef.current.classList.remove(listStyles.expanded);
                listRef.current.classList.add(listStyles.collapsed);
              } else {
                setShowList(() => true);
              }
            }}
          >
            {!showList ? 'Expand' : 'Collapse'}
          </div>
          {showList && (
            <TermsList
              listRef={listRef}
              termsList={termsList}
              removeTerm={removeTerm}
            />
          )}
        </Card>
      </main>
    </>
  );
}
