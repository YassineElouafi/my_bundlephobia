import React, {useEffect, useState} from 'react'
import Downshift from 'downshift'
import { useDebounce } from 'use-debounce'
import {
  SearchInputContainer,
  StyledTextField,
  ItemsContainer
} from './styles';

import {
  InputAdornment,
  Typography,
  MenuItem,
  CircularProgress,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { getPackagesSuggestions, Suggestion } from '../../services/packages'

interface Props {
  initialValue?: string
  onSelect: (value: string) => void
  [key: string]: any
}

export default function Search({ initialValue, onSelect, ...otherProps }: Props) {
  const [inputValue, setInputValue] = useState(initialValue || '')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasNoResult, setHasNoResult] = useState(false)

  useEffect(() => {
    if (initialValue) {
      setInputValue(initialValue)
    }
  }, [initialValue])

  const onSuggestionSelected = (suggestion: Suggestion) => {
    onSelect(suggestion.package.name)
  }

  const [debouncedValue] = useDebounce(inputValue, 300)

  useEffect(() => {
    let active = true
    async function call() {
      setIsSearching(true)
      const suggestions = await getPackagesSuggestions(debouncedValue)
      if (active) {
        setHasNoResult(suggestions.length === 0)
        setSuggestions(suggestions)
        setIsSearching(false)
      }
    }
    if (debouncedValue) {
      call()
    }
    return () => {
      active = false
    }
  }, [debouncedValue])

  const onInputValueChange = (value: string) => {
    setInputValue(value)
    setHasNoResult(false)
    if (!value) {
      setSuggestions([])
    }
  }

  const showNoResult = hasNoResult && debouncedValue && !isSearching

  return (
      <SearchInputContainer {...otherProps}>
        <Downshift
          inputValue={inputValue}
          onChange={onSuggestionSelected}
          onInputValueChange={onInputValueChange}
          itemToString={(suggestion: Maybe<Suggestion>) =>
            suggestion ? suggestion.package.name : ''
          }
          defaultHighlightedIndex={0}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            highlightedIndex,
            isOpen,
            openMenu,
            closeMenu,
          }) => {
            const { onBlur, onFocus, ...inputProps } = getInputProps({
              placeholder: 'find package',
              onFocus: openMenu,
              onBlur: (e: React.SyntheticEvent<HTMLInputElement>) => {
                closeMenu()
              },
            })

            return (
              <div>
                  <StyledTextField
                    name="search"
                    variant="outlined"
                    InputProps={{
                      onBlur,
                      onFocus,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="primary" aria-label="search" {...getLabelProps()} />
                        </InputAdornment>
                      ),
                      endAdornment: isSearching && (
                        <InputAdornment position="end">
                          <CircularProgress
                            color="secondary"
                            size={20}
                            thickness={4}
                          />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={inputProps}
                  />
                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <ItemsContainer square>
                        {showNoResult ? (
                          <div {...getItemProps({ item: null })}>
                            No package found.
                          </div>
                        ) : (
                          suggestions.map((suggestion, index) => (
                            <MenuItem
                              {...getItemProps({ item: suggestion })}
                              selected={highlightedIndex === index}
                              dense
                              key={suggestion.package.name}
                            >
                              <div>
                                <div dangerouslySetInnerHTML={{ __html: suggestion.highlight }} />
                                <Typography
                                  variant="caption"
                                  component="div"
                                >
                                  {suggestion.package.description}
                                </Typography>
                              </div>
                            </MenuItem>
                          ))
                        )}
                      </ItemsContainer>
                    ) : null}
                  </div>
              </div>
            )
          }}
        </Downshift>
      </SearchInputContainer>
  )
}
