'use client'

import { useState } from 'react'

// Components
import { Button } from '@/components/ui/button'
import {
  Field,
} from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

// Icons
import { Search } from 'lucide-react'

// Type
type SearchFieldProps = {
  onValueChange?: (value: string) => void,
}

function SearchField({ onValueChange }: SearchFieldProps) {
  const inputId = "search-bar"
  const [searchValue, setSearchValue] = useState<string>("");

  const triggerSearch = (searchValue: string) => {
    if (searchValue !== "") {
      console.log(searchValue)
    }
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    triggerSearch(searchValue)
  }

  return (
    <Field>
      <form onSubmit={handleSubmit}>
        <InputGroup className='bg-white rounded-full text-foreground shadow-(--shadow) border-0'>
          <InputGroupInput
            id={inputId}
            type="search"
            placeholder='Rechercher une recette'
            autoComplete='off'
            className='pl-4 py-2'
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <InputGroupAddon align="inline-end">
            <Button variant={"secondary"} size={"icon-sm"} type='submit' title='Rechercher' className='rounded-full bg-muted hover:bg-primary hover:text-white'>
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
