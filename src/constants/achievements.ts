export interface Achievement {
  title: string;
  subtitle: string;
  achieved: boolean;
  dateAchieved?: string | null;
}

export const achievementsData: Achievement[] = [
  {
    title: "Primer registro",
    subtitle: "Has escrito tu primera nota emocional",
    achieved: true,
    dateAchieved: "2025-05-10",
  },
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
    dateAchieved: "2025-05-12",
  },
  {
    title: "Motivación activa",
    subtitle: "Has seleccionado tus motivaciones para mantenerte enfocado/a",
    achieved: false,
    dateAchieved: null,
  },
  {
    title: "Avatar elegido",
    subtitle: "Has personalizado tu perfil con un avatar",
    achieved: true,
    dateAchieved: "2025-05-13",
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
    achieved: true,
    dateAchieved: "2025-05-14",
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
    dateAchieved: "2025-05-11",
  },
];
