"use client"

import {
  ChangeEvent,
  ComponentProps,
  DragEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState
} from "react"
import { cn } from "@/lib/utils"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

import { File as FileIcon, ImageIcon, X } from "lucide-react"
import Image from "next/image"

type FileFieldProps = Omit<
  ComponentProps<typeof InputGroupInput>,
  "type" | "value" | "defaultValue" | "onChange" | "readOnly" | "accept" | "name"
> & {
  label: string
  error?: string | { message: string }[]
  description?: string
  value?: File | null
  onValueChange?: (file: File | null) => void
  /** Types accepted (ex: "image/*,.pdf") */
  accept?: string
  name?: string
}

function isFileAccepted(file: File, accept?: string) {
  if (!accept) return true
  const tokens = accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean)
  if (tokens.length === 0) return true

  const name = file.name.toLowerCase()
  const type = file.type.toLowerCase()

  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token)
    if (token.endsWith("/*")) return type.startsWith(token.slice(0, -1))
    return type === token
  })
}

function FileField({
  label,
  error,
  description,
  id,
  disabled,
  value,
  onValueChange,
  accept,
  name,
  placeholder = "Glisser/déposer une image ou sélectionner depuis votre ordinateur",
  className,
  ...props
}: FileFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [internalFile, setInternalFile] = useState<File | null>(null)
  const isControlled = value !== undefined
  const file = isControlled ? value : internalFile

  const hasError = Array.isArray(error) ? error.length > 0 : !!error

  // Preview URL, uniquely for images
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const [isDragging, setIsDragging] = useState(false)

  const update = (next: File | null) => {
    if (!isControlled) setInternalFile(next)
      onValueChange?.(next)
  }

  const openPicker = () => {
    if (!disabled) fileInputRef.current?.click()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    update(e.target.files?.[0] ?? null)
  }

  const handleClear = () => {
    // Resets the native input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = ""
    update(null)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    if (disabled) return

    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    // Ignore dragleave events triggered when moving over a child
    if (e.currentTarget.contains(e.relatedTarget as Node | null)) return
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const dropped = e.dataTransfer.files?.[0]
    if (!dropped || !isFileAccepted(dropped, accept)) return

    // Synchronizes the native input so that form submission works
    if (fileInputRef.current) {
      const dt = new DataTransfer()
      dt.items.add(dropped)
      fileInputRef.current.files = dt.files
    }
    update(dropped)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      openPicker()
    }
  }

  return (
    <Field data-invalid={hasError} data-disabled={disabled}>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      {/* Real input file hidden. The visible field below control it */}
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <InputGroup
        data-dragging={isDragging || undefined}
        onDragEnter={handleDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed h-[6rem] placeholder:text-foreground",
          isDragging && "border-ring ring-ring/50 bg-accent/50 ring-[3px]"
        )}
      >
        <InputGroupAddon align="inline-start">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="relative size-7 overflow-hidden rounded-md">
              <Image
                src={previewUrl}
                fill
                alt=""
                className="size-full object-cover"
              />
            </div>
          ) : file ? (
            <FileIcon className="size-4" />
          ) : (
            <ImageIcon className="size-4" />
          )}
        </InputGroupAddon>

        <InputGroupInput
          id={inputId}
          readOnly
          value={file?.name ?? ""}
          placeholder={isDragging ? "Déposez le fichier ici" : placeholder}
          aria-invalid={hasError}
          disabled={disabled}
          onClick={openPicker}
          onKeyDown={handleKeyDown}
          className={cn("h-full cursor-pointer", className)}
          {...props}
        />

        <InputGroupAddon align="inline-end">
          {file ? (
            <InputGroupButton
              type="button"
              size="icon-sm"
              variant="ghost"
              aria-label="Retirer le fichier"
              disabled={disabled}
              onClick={handleClear}
            >
              <X />
            </InputGroupButton>
          ) : null}
        </InputGroupAddon>
      </InputGroup>

      {hasError && Array.isArray(error) ? (
        <FieldError errors={error} />
      ) : hasError ? (
        <FieldError>{error as string}</FieldError>
      ) : description ? (
        <FieldDescription>{description}</FieldDescription>
      ) : null}
    </Field>
  )
}

export { FileField }
export type { FileFieldProps }
