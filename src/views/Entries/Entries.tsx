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
import { useModal } from "../../hooks/useModal";

const Entries = () => {
  const { user, updateActiveUser } = useActiveUser();
  const { modalToShow, openModal, closeModal } = useModal();

  const [entries, setEntries] = useState<Entry[]>([]);

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

  if (!user) {
    return <p>Cargando usuario activo...</p>;
  }

  return (
    <>
      <GoToAppModal />
      <NuviaHeader title="Entries" />

      <div className="entries__page">
        <MonthSelector />

        <section className="start-quiz" onClick={() => openModal("quiz")}>
          <span className="material-symbols-rounded">add_circle</span>
          <p>¿Cómo te sientes hoy?</p>
        </section>

        <div className="entries__container">
          {entries.map((entry) => (
            <EntryCard
              key={entry.id}
              id={entry.id}
              image={entry.image}
              text={entry.text}
              date={entry.date}
            />
          ))}
        </div>
      </div>

      {modalToShow === "quiz" && (
        <DailyQuiz onClose={closeModal} addNewEntrie={addNewEntrie}openModal={openModal}/>
      )}

      <Nav />
    </>
  );
};

export default Entries;
