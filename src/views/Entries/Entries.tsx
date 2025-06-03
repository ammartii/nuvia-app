import { useState, useEffect } from "react";
import "./Entries.scss";

import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import MonthSelector from "../../components/layout/MonthSelector/MonthSelector";
import EntryCard from "../../components/ui/cards/EntryCard/EntryCard";
import DailyQuiz from "../../components/ui/modals/DailyQuiz/DailyQuiz";

import { Entry } from "../../models/entry.model";
import { useActiveUser } from "../../hooks/useActiveUser";
//import { useModal } from "../../hooks/useModal";

const Entries = () => {
  const { user, updateActiveUser } = useActiveUser();
  //const { modalToShow, openModal, closeModal } = useModal(); // esto se borra

  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Nueva forma para abrir los popups
  const [showQuizModal, setShowQuizModal] = useState(false);
  const openQuizModal = () => setShowQuizModal(true);
  const onCloseQuizModal = () => setShowQuizModal(false);

  useEffect(() => {
    if (user?.entries) {
      setEntries(user.entries);
    } else {
      setEntries([]);
    }
  }, [user]);

  const addNewEntrie = (newEntrie: Entry) => {
    if (!user) return;

    const updatedEntries = [newEntrie, ...(user.entries || [])];
    setEntries(updatedEntries);
    updateActiveUser({ entries: updatedEntries });
  };

  const prevMonth = () => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() - 1,
      1
    );
    setSelectedDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      1
    );
    setSelectedDate(newDate);
  };

  const filteredEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getFullYear() === selectedDate.getFullYear() &&
      entryDate.getMonth() === selectedDate.getMonth()
    );
  });

  if (!user) {
    return <p>Cargando usuario activo...</p>;
  }

  return (
    <>
      <GoToAppModal />
      <NuviaHeader title="Entries" />

      <div className="entries__page">
        <MonthSelector
          month={selectedDate.getMonth()}
          year={selectedDate.getFullYear()}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
        />

        <section className="start-quiz" onClick={() => openQuizModal()}>
          <span className="material-symbols-rounded">add_circle</span>
          <p>¿Cómo te sientes hoy?</p>
        </section>

        <div className="entries__container">
          {filteredEntries.length === 0 ? (
            <p>No hay entradas para este mes.</p>
          ) : (
            filteredEntries.map((entry) => (
              <EntryCard
                key={entry.id}
                id={entry.id}
                image={entry.image}
                text={entry.text}
                date={entry.date}
              />
            ))
          )}
        </div>
      </div>

      {showQuizModal && (
        <DailyQuiz
          onClose={onCloseQuizModal}
          addNewEntrie={addNewEntrie}
          openModal={openQuizModal}
        />
      )}

      <Nav />
    </>
  );
};

export default Entries;
