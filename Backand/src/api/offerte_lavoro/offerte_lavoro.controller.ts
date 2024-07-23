import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { TypedRequest } from "../../utils/typed-request";
import { offerte_lavoro_dto } from "./offerte_lavoro.dto";
import { offerte_lavoro_service } from "./offerte_lavoro.service";

export const get_offerts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = new offerte_lavoro_service();
    const offerts = await service.get_offerts();

    res.status(200).json(offerts);
  } catch (err: any) {
    res.status(500).json({ "Errore: ": err.message });
  }
};

export const get_offerts_sorted_date = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = new offerte_lavoro_service();
    const offerts = await service.get_offerts_sorted_date();

    res.status(200).json(offerts);
  } catch (err: any) {
    res.status(500).json({ "Errore: ": err.message });
  }
};

export const add_offert = async (
  req: TypedRequest<offerte_lavoro_dto>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, dueDate, retribution } = req.body;

    // Verifica che i campi obbligatori siano presenti
    if (!title) throw { statusCode: 400, message: "Il titolo è obbligatorio" };
    if (!description)
      throw { statusCode: 400, message: "La descrizione è obbligatoria" };
    if (retribution === undefined)
      throw { statusCode: 400, message: "La retribuzione è obbligatoria" };
    if (retribution <= 0)
      throw {
        statusCode: 400,
        message: "La retribuzione deve essere positiva",
      };

    // Verifica che la data di inserimento sia valida
    let parsedDueDate: Date;
    if (dueDate) {
      parsedDueDate = new Date(dueDate);
      if (isNaN(parsedDueDate.getTime())) {
        throw {
          statusCode: 400,
          message: "La data di inserimento non è valida",
        };
      }
      if (parsedDueDate < new Date()) {
        throw {
          statusCode: 400,
          message: "La data di inserimento non può essere nel passato",
        };
      }
    } else {
      parsedDueDate = new Date(); // Imposta la data corrente se dueDate non è fornita
    }

    const offerte_lavoro_object = {
      title,
      description,
      dueDate: parsedDueDate,
      retribution,
    };

    const service = new offerte_lavoro_service();
    const new_offert = await service.add_offert(offerte_lavoro_object);

    res.status(201).json(new_offert);
  } catch (err: any) {
    if (err.message === "Il titolo è obbligatorio")
      res.status(400).json({ "Errore: ": "Il titolo è obbligatorio" });
    else if (err.message === "La descrizione è obbligatoria")
      res.status(400).json({ "Errore: ": "La descrizione è obbligatoria" });
    else if (err.message === "La data di inserimento è obbligatoria")
      res
        .status(400)
        .json({ "Errore: ": "La data di inserimento è obbligatoria" });
    else if (err.message === "La retribuzione è obbligatoria")
      res.status(400).json({ "Errore: ": "La retribuzione è obbligatoria" });
    else if (err.message === "La data di inserimento non è valida")
      res
        .status(400)
        .json({ "Errore: ": "La data di inserimento non è valida" });
    else if (
      err.message === "La data di inserimento non può essere nel passato"
    )
      res.status(400).json({
        "Errore: ": "La data di inserimento non può essere nel passato",
      });
    else res.status(500).json({ "Errore: ": err.message });
  }
};

const validFields = ["title", "description", "dueDate", "retribution"];
export const update_offert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Verifica che l'ID sia un ObjectId valido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ "Errore: ": "ID non valido" });
    }

    // Verifica che almeno un campo sia presente
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ "Errore: ": "Devi fornire almeno un campo da aggiornare." });
    }

    // Rimuovi il campo id dall'aggiornamento se presente
    delete updateData.id;

    // Verifica che non ci siano campi non validi
    for (const key of Object.keys(updateData)) {
      if (!validFields.includes(key)) {
        return res.status(400).json({ "Errore: ": `Campo non valido: ${key}` });
      }
      if (key === "retribution" && updateData[key] <= 0) {
        return res
          .status(400)
          .json({ "Errore: ": "La retribuzione deve essere positiva" });
      }
    }

    const service = new offerte_lavoro_service();
    const updated_offert = await service.update_offert(id, updateData);

    res.status(200).json(updated_offert);
  } catch (err: any) {
    if (err.message === "L'offerta con l'ID specificato non esiste.")
      res.status(404).json({ "Errore: ": err.message });
    else if (err.message === "Devi fornire almeno un campo da aggiornare.")
      res.status(400).json({ "Errore: ": err.message });
    else res.status(500).json({ "Errore: ": err.message });
  }
};

export const delete_offert = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Verifica che l'ID sia un ObjectId valido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ "Errore: ": "ID non valido" });
    }

    const service = new offerte_lavoro_service();
    const deleted_offert = await service.delete_offert(id);

    res.status(200).json(deleted_offert);
  } catch (err: any) {
    if (err.message === "L'offerta con l'ID specificato non esiste.")
      res.status(404).json({ "Errore: ": err.message });
    else res.status(500).json({ "Errore: ": err.message });
  }
};
