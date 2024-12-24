export type RoleName = "admin" | "manager" | "user";

export interface Role {
  name: RoleName;
  permissions: string[];
}
