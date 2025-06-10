import { useState, useEffect } from "react"
import { meatOrigins, type MeatOrigin } from "../../../utils/meatOrigins"
import type { Meat } from "../../../types/meat"
import styles from "./MeatForm.module.css"

type MeatFormProps = {
  onSubmit: (m: Meat) => void
  defaultValues?: Meat
  isEditing: boolean
  onDescriptionChange?: (description: string) => void
}

export function MeatForm({
  onSubmit,
  defaultValues,
  isEditing,
  onDescriptionChange,
}: MeatFormProps) {
  const [description, setDescription] = useState(
    defaultValues?.description ?? ""
  )
  const [origin, setOrigin] = useState<MeatOrigin>(
    defaultValues?.origin ?? meatOrigins[0]
  )

  useEffect(() => {
    if (defaultValues) {
      setDescription(defaultValues.description)
      setOrigin(defaultValues.origin)
      onDescriptionChange?.(defaultValues.description)
    }
  }, [defaultValues])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      id: defaultValues?.id ?? 0,
      description,
      origin,
    })
    if (!isEditing) {
      setDescription("")
      setOrigin(meatOrigins[0])
    }
  }

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const filtered = e.target.value.replace(/[^A-Za-z0-9]/g, "");
     setDescription(filtered);
     onDescriptionChange?.(filtered)
   }

  return (
    <form id="meat-form" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>Description</label>
        <input
          type="text"
           value={description}
           onChange={handleDescChange}
           required
           minLength={3}
         />
         <small className={styles.hint}>
           {description.length > 0 && description.length < 3
             ? `Need ${3 - description.length} more character(s)`
             : ""}
         </small>
      </div>
      <div className={styles.field}>
        <label>Origin</label>
        <select
          value={origin}
          onChange={(e) => setOrigin(e.target.value as MeatOrigin)}
        >
          {meatOrigins.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}