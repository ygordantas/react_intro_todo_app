export default interface Todo {
  _id:string;
  text: string;
  createdBy: string;
  priorityId: string;
  categoryId?: string;
  lastUpdatedAt?: Date;
  createdAt?: string;
}
