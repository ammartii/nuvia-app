import { useState, useEffect } from "react";
import "./Entries.scss";
import Nav from "../../components/layout/Nav/Nav";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import EntrieCard from "../../components/ui/cards/EntrieCard/EntrieCard";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import MonthSelector from "../../components/layout/MonthSelector/MonthSelector";
import DailyQuiz from "../../components/ui/modals/DailyQuiz/DailyQuiz";
import { Entrie } from "../../models/entrie.model";
import { useActiveUser } from "../../hooks/useActiveUser";

const Entries = () => {
  const { user, updateActiveUser } = useActiveUser();

  // Estado para mostrar/ocultar DailyQuiz modal
  const [showQuiz, setShowQuiz] = useState(false);

  // Estado local para manejar las entradas (se sincroniza con user)
  const [entries, setEntries] = useState<Entrie[]>([]);

  // Al montar o cuando cambia user, cargar entradas del user activo
  useEffect(() => {
    if (user?.entries) {
      setEntries(user.entries);
    } else {
      setEntries([]);
    }
  }, [user]);

  // Función para añadir nueva entrada y actualizar user activo
  const addNewEntrie = (newEntrie: Entrie) => {
    if (!user) return;

    const updatedEntries = [newEntrie, ...(user.entries || [])];
    setEntries(updatedEntries);

    // Actualiza usuario activo con las entradas nuevas
    updateActiveUser({ entries: updatedEntries });
  };

  if (!user) {
    return <p>Cargando usuario activo...</p>;
  }

  return (
    <div>
      <GoToAppModal />
      <NuviaHeader title="Entries" />

      <div className="entries-page">
        <MonthSelector />

        <section className="start-quiz" onClick={() => setShowQuiz(true)}>
          <span className="material-symbols-rounded">add_circle</span>
          <p>¿Cómo te sientes hoy?</p>
        </section>

        <div className="entries__container">
          {entries.map((entry) => (
            <EntrieCard
              key={entry.id}
              id={entry.id}
              image={entry.image}
              text={entry.text}
              date={entry.date}
            />
          ))}
        </div>
      </div>

      {showQuiz && (
        <DailyQuiz
          onClose={() => setShowQuiz(false)}
          addNewEntrie={addNewEntrie}
        />
      )}

      <Nav />
    </div>
  );
};

export default Entries;
