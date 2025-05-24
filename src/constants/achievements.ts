export interface Achievement {
  title: string;
  subtitle: string;
  achieved: boolean;
  dateAchieved?: string | null;
}

const userRegistrationDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

export const achievementsData: Achievement[] = [
  {
    title: "Constancia semanal",
    subtitle: "Has usado la app 7 días seguidos",
    achieved: false,
    dateAchieved: null,
  },
  {
    title: "Propósito establecido",
    subtitle: "Has priorizado tu primer propósito personal",
    achieved: true,
    dateAchieved: userRegistrationDate,
  },
  {
    title: "Motivación activa",
    subtitle: "Has seleccionado tus motivaciones para mantenerte enfocado/a",
    achieved: true,
    dateAchieved: userRegistrationDate,
  },
  {
    title: "Avatar elegido",
    subtitle: "Has personalizado tu perfil con un avatar",
    achieved: true,
    dateAchieved: userRegistrationDate,
  },
  {
    title: "Informe generado",
    subtitle: "Has consultado tu primer informe de evolución",
    achieved: false,
    dateAchieved: null,
  },
  {
    title: "Día importante registrado",
    subtitle: "Has marcado tu primer evento o día especial",
    achieved: false,
    dateAchieved: null,
  },
  {
    title: "Reflexión diaria",
    subtitle: "Has completado una reflexión diaria durante una semana",
    achieved: false,
    dateAchieved: null,
  },
  {
    title: "Primer logro desbloqueado",
    subtitle: "Has completado tu primer logro dentro de la app",
    achieved: true,
    dateAchieved: userRegistrationDate,
  },
  {
    title: "Primer registro",
    subtitle: "Has escrito tu primera nota emocional",
    achieved: true,
    dateAchieved: userRegistrationDate,
  },
];
