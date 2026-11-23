'use client'

import { useEffect, useState, useTransition } from 'react'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

// Type
type SearchFieldProps = {
  onValueChange?: (value: string) => void
}

function SearchField() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const urlQueryName = searchParams.get('name') ?? ''
  const [searchValue, setSearchValue] = useState<string>(urlQueryName)

  useEffect(() => {
    setSearchValue(urlQueryName)
  }, [urlQueryName, setSearchValue])

  const applySearch = (name: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const trimmed = name.trim()

    if (trimmed) params.set('name', trimmed)
    else params.delete('name')

    startTransition(() => {
      router.push(`/?${params.toString()}`)
    })
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    applySearch(searchValue)
  }

  return (
    <Field>
      <form onSubmit={handleSubmit}>
        <InputGroup className="rounded-full border-0 bg-white text-foreground shadow-(--shadow)">
          <InputGroupInput
            id="search-bar"
            type="search"
            placeholder="Rechercher une recette"
            autoComplete="off"
            className="py-2 pl-4"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <InputGroupAddon align="inline-end" className="has-[>button]:pr-0">
            <Button
              variant={'icon'}
              size={'icon'}
              type="submit"
              title="Rechercher"
              className="shadow-none"
            >
              <Search />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </Field>
  )
}

export { SearchField }
export type { SearchFieldProps }
