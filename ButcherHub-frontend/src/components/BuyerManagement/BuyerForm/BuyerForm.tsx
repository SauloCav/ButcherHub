import { useState, useEffect } from "react";
import type { Buyer, BuyerDocumentType } from "../../../utils/buyerInterface";
import { isValidCPF, isValidCNPJ } from "../../../utils/validator";
import styles from "./BuyerForm.module.css";

type Estado = { id: number; nome: string; sigla: string };
type Municipio = { id: number; nome: string };

type Props = {
  defaultValues?: Buyer;
  isEditing: boolean;
  onSubmit: (b: Buyer) => void;
  onValidChange?: (valid: boolean) => void;
};

export function BuyerForm({
  defaultValues,
  isEditing,
  onSubmit,
  onValidChange,
}: Props) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [docType, setDocType] = useState<BuyerDocumentType>(
    defaultValues?.documentType ?? "CPF"
  );
  const [docNumber, setDocNumber] = useState(
    defaultValues?.documentNumber ?? ""
  );
  const [docError, setDocError] = useState("");
  const [estado, setEstado] = useState(defaultValues?.state ?? "");
  const [cidade, setCidade] = useState(defaultValues?.city ?? "");
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Municipio[]>([]);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((r) => r.json())
      .then((data: Estado[]) =>
        setEstados(data.sort((a, b) => a.nome.localeCompare(b.nome)))
      )
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!estado) {
      setCidades([]);
      setCidade("");
      return;
    }
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
    )
      .then((r) => r.json())
      .then((data: Municipio[]) =>
        setCidades(data.sort((a, b) => a.nome.localeCompare(b.nome)))
      )
      .catch(console.error);
  }, [estado]);

  useEffect(() => {
    const nameValid = name.trim().length >= 3;
    const len = docType === "CPF" ? 11 : 14;
    const docValid =
      docNumber.length === len && (docType === "CPF" ? isValidCPF(docNumber) : isValidCNPJ(docNumber));
    const addressValid = !!estado && !!cidade;
    onValidChange?.(nameValid && docValid && addressValid);
  }, [name, docNumber, docType, estado, cidade, onValidChange]);

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const max = docType === "CPF" ? 11 : 14;
    const digits = e.target.value.replace(/\D/g, "").slice(0, max);
    setDocNumber(digits);
    if (digits.length === max) {
      const valid = docType === "CPF" ? isValidCPF(digits) : isValidCNPJ(digits);
      setDocError(valid ? "" : `Invalid ${docType}`);
    } else {
      setDocError("");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/[^A-Za-z0-9]/g, "");
    setName(filtered);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (docError) return;
    onSubmit({
      id: defaultValues?.id ?? 0,
      name,
      documentType: docType,
      documentNumber: docNumber,
      state: estado,
      city: cidade,
    });
    if (!isEditing) {
      setName("");
      setDocType("CPF");
      setDocNumber("");
      setEstado("");
      setCidade("");
    }
  };

  return (
    <form id="buyer-form" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          required
          minLength={3}
         />
         <small className={styles.hint}>
           {name.length > 0 && name.length < 3
             ? `Need ${3 - name.length} more character(s)`
             : ""}
         </small>
      </div>

      <div className={styles.field}>
        <label>Document Type</label>
        <select
          value={docType}
          onChange={(e) => {
            setDocType(e.target.value as BuyerDocumentType);
            setDocNumber("");
            setDocError("");
          }}
          required
        >
          <option value="CPF">CPF</option>
          <option value="CNPJ">CNPJ</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Document Number</label>
        <input
          type="text"
          value={docNumber}
          onChange={handleDocChange}
          maxLength={docType === "CPF" ? 11 : 14}
          required
          pattern={docType === "CPF" ? "\\d{11}" : "\\d{14}"}
        />
        {docError && <small className={styles.hint}>{docError}</small>}
      </div>

      <div className={styles.field}>
        <label>State</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Select State
          </option>
          {estados.map((st) => (
            <option key={st.id} value={st.sigla}>
              {st.nome} ({st.sigla})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label>City</label>
        <select
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
          disabled={!estado}
        >
          <option value="" disabled hidden>
            Select City
          </option>
          {cidades.map((c) => (
            <option key={c.id} value={c.nome}>
              {c.nome}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}