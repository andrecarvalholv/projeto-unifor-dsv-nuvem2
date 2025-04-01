import { companies, type Company, type InsertCompany } from "@shared/schema";

export interface IStorage {
  getCompanies(): Promise<Company[]>;
  getCompany(id: number): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: number, company: InsertCompany): Promise<Company | undefined>;
  deleteCompany(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private companies: Map<number, Company>;
  currentId: number;

  constructor() {
    this.companies = new Map();
    this.currentId = 1;
  }

  async getCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentId++;
    const company: Company = { ...insertCompany, id };
    this.companies.set(id, company);
    return company;
  }

  async updateCompany(id: number, data: InsertCompany): Promise<Company | undefined> {
    const existingCompany = this.companies.get(id);
    if (!existingCompany) {
      return undefined;
    }
    
    const updatedCompany: Company = { ...existingCompany, ...data };
    this.companies.set(id, updatedCompany);
    return updatedCompany;
  }

  async deleteCompany(id: number): Promise<boolean> {
    return this.companies.delete(id);
  }
}

export const storage = new MemStorage();
