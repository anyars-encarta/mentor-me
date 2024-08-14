/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled" | "met" | "completed";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  gender: Gender;
}

declare type CreateAppointmentParams = {
  userId: string;
  mentee: string;
  appointmentType: string;
  reason: string;
  schedule: Date;
  status: Status;
  additionalComments: string | undefined;
  cancellationReason: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};

declare type StatCardProps = {
  type: 'appointments' | 'pending' | 'cancelled'
  count: number
  label: string
  icon: string
};
