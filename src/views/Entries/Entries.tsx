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

const Entries = () => {
  const { user, updateActiveUser } = useActiveUser();

  // Estado para controlar visibilidad del quiz diario
  const [showQuiz, setShowQuiz] = useState(false);

  // Entradas locales del usuario (sincronizadas con el hook)
  const [entries, setEntries] = useState<Entry[]>([]);

  // Carga inicial de entradas desde el usuario activo
  useEffect(() => {
    if (user?.entries) {
      setEntries(user.entries);
    } else {
      setEntries([]);
    }
  }, [user]);

  // Añadir nueva entrada y actualizar el usuario activo
  const addNewEntrie = (newEntrie: Entry) => {
    if (!user) return;

    const updatedEntries = [newEntrie, ...(user.entries || [])];
    setEntries(updatedEntries);
    updateActiveUser({ entries: updatedEntries });
  };

  // Mostrar mensaje de carga si el usuario aún no está disponible
  if (!user) {
    return <p>Cargando usuario activo...</p>;
  }

  return (
    <>
      {/* Modal sugerido para móvil */}
      <GoToAppModal />

      {/* Cabecera con título de sección */}
      <NuviaHeader title="Entries" />

      <div className="entries__page">
        {/* Selector del mes (opcionalmente funcional) */}
        <MonthSelector />

        {/* Botón para iniciar quiz */}
        <section className="start-quiz" onClick={() => setShowQuiz(true)}>
          <span className="material-symbols-rounded">add_circle</span>
          <p>¿Cómo te sientes hoy?</p>
        </section>

        {/* Listado de entradas */}
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

      {/* Modal de quiz diario */}
      {showQuiz && (
        <DailyQuiz
          onClose={() => setShowQuiz(false)}
          addNewEntrie={addNewEntrie}
        />
      )}

      {/* Barra de navegación inferior */}
      <Nav />
    </>
  );
};

export default Entries;
