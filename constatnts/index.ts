export const GenderOptions = ['Male', 'Female', 'Other'];

export const AppointmentTypes = ['Councelling', 'Mentoring', 'Other'];

export const MenteeFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  gender: "Male" as Gender,
  appointmentType: "",
  reason: "",
};

export const StatusIcon = {
  scheduled: "/assets/icons/appointments.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
  completed: "/assets/icons/check.svg",
  met: "/assets/icons/check.svg"
};