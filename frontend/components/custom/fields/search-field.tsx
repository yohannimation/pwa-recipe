'use client'

import { useState } from 'react'

// Components
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'

// Icons
import { Search } from 'lucide-react'

// Type
type SearchFieldProps = {
  onValueChange?: (value: string) => void
}

function SearchField({ onValueChange }: SearchFieldProps) {
  const inputId = 'search-bar'
  const [searchValue, setSearchValue] = useState<string>('')

  const triggerSearch = (searchValue: string) => {
    if (searchValue !== '') {
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
        <InputGroup className="text-foreground rounded-full border-0 bg-white shadow-(--shadow)">
          <InputGroupInput
            id={inputId}
            type="search"
            placeholder="Rechercher une recette"
            autoComplete="off"
            className="py-2 pl-4"
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <InputGroupAddon align="inline-end" className='has-[>button]:pr-0'>
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
