import mongoose from "mongoose";
import { offerte_lavoro_model } from "./offerte_lavoro.model";
import { offerte_lavoro_entity as Offerts } from "./offerte_lavoro.entity";

export class offerte_lavoro_service {
  async get_offerts(): Promise<Offerts[]> {
    // Restituisce tutti i documenti presenti nella collezione
    return (await offerte_lavoro_model.find()).map(
      (offert) => offert.toObject() as Offerts
    );
  }

  async get_offerts_sorted_date(): Promise<Offerts[]> {
    // Restituisce tutti i documenti presenti nella collezione ordinati per data
    return (await offerte_lavoro_model.find().sort({ dueDate: -1 })).map(
      (offert) => offert.toObject() as Offerts
    );
  }

  async add_offert(offerte_lavoro_object: Partial<Offerts>): Promise<Offerts> {
    // Crea e salva un nuovo documento
    const new_offert = await offerte_lavoro_model.create({
      id: new mongoose.Types.ObjectId().toString(), // genera un nuovo ID
      ...offerte_lavoro_object,
    });

    // Restituisce il documento creato
    return new_offert.toObject() as Offerts;
  }

  async update_offert(
    id: string,
    updateData: Partial<Offerts>
  ): Promise<Offerts | null> {
    // Verifica se updateData è vuoto
    if (Object.keys(updateData).length === 0) {
      throw new Error("Devi fornire almeno un campo da aggiornare.");
    }

    // Trova e aggiorna il documento con l'ID fornito
    const updated_offert = await offerte_lavoro_model.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updated_offert) {
      throw new Error("L'offerta con l'ID specificato non esiste.");
    }

    // Restituisce il documento aggiornato senza i campi indesiderati
    return updated_offert.toObject() as Offerts;
  }

  async delete_offert(id: string): Promise<Offerts | null> {
    // Trova e rimuove il documento con l'ID fornito
    const deleted_offert = await offerte_lavoro_model.findByIdAndDelete(id);

    if (!deleted_offert) {
      throw new Error("L'offerta con l'ID specificato non esiste.");
    }

    // Restituisce il documento rimosso
    return deleted_offert.toObject() as Offerts;
  }
}
