import { useEffect, useState } from "react";

import "./Motivations.scss";
import motivations from "../../constants/motivationList";
import MotivationCard from "../../components/ui/cards/MotivationCard/MotivationCard";
import GoToAppModal from "../../components/ui/modals/GoToApp/GoToApp";
import NuviaHeader from "../../components/layout/NuviaHeader/NuviaHeader";
import Nav from "../../components/layout/Nav/Nav";

import { useActiveUser } from "../../hooks/useActiveUser";
import { MotivationItem } from "../../models/motivation.model";

const Motivations = () => {
  const { user } = useActiveUser();

  const [savedMotivations, setSavedMotivations] = useState<MotivationItem[]>([]);

  useEffect(() => {
    if (user?.motivations) {
      setSavedMotivations(user.motivations);
    }
  }, [user]);

  return (
    <div>
      <GoToAppModal />
      <NuviaHeader title="Motivaciones" />

      <div className="motivation__container">
        {motivations.map((motivation: MotivationItem, index: number) =>
          savedMotivations.some((saved) => saved.text === motivation.text) ? (
            <MotivationCard
              key={index}
              image={motivation.image}
              text={motivation.text}
              isSelected={false}
              readonly={true}
            />
          ) : null
        )}
      </div>

      <Nav />
    </div>
  );
};

export default Motivations;
