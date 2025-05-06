// src/components/SearchBar.tsx
import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Flex,
  Button,
  Input,
  Icon,
  VStack,
  Text,
} from '@chakra-ui/react'
import { SearchIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'

// Dummy data structure for categories/items
const categories = {
  'Water treatment': [
    'Ferric Chloride FeCl3',
    'Hydro Chloric Acid HCL',
    /* … */
  ],
  Oleo: [ /* … */ ],
  'Sodium Chloride': [ /* … */ ],
  Mining: [ /* … */ ],
  Printing: [ /* … */ ],
  Paints: [ /* … */ ],
}

interface SearchBarProps {
  onSearch?: (term: string) => void
  onCategorySelect?: (category: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setHoveredCategory(null)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleAllCategories = () => {
    if (selectedCategory !== 'All Categories') {
      setSelectedCategory('All Categories')
      onCategorySelect?.('All Categories')
    } else {
      setIsOpen((o) => !o)
    }
  }

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat)
    onCategorySelect?.(cat)
    setIsOpen(false)
    setHoveredCategory(null)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    onSearch?.(e.target.value)
  }

  const triggerSearch = () => onSearch?.(searchTerm)

  return (
    <Box position="relative" w="full" maxW="600px">
      {/* Pill‐shaped search bar */}
      <Flex
        bg="gray.100"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="full"
        align="center"
        h="48px"
        px={4}
      >
        {/* Dropdown toggle */}
        <Button
          variant="ghost"
          rightIcon={
            <ChevronDownIcon
              transform={isOpen ? 'rotate(180deg)' : undefined}
              transition="transform 0.2s"
            />
          }
          fontSize="sm"
          color="gray.700"
          _hover={{ bg: 'gray.200' }}
          _active={{ bg: 'gray.200' }}
          onClick={handleAllCategories}
        >
          {selectedCategory}
        </Button>

        {/* Vertical divider */}
        <Box h="60%" w="1px" bg="gray.300" mx={3} />

        {/* Search input */}
        <Input
          variant="unstyled"
          placeholder="Search medicine, medical products"
          fontSize="sm"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={(e) => e.key === 'Enter' && triggerSearch()}
        />

        {/* Search icon */}
        <Icon
          as={SearchIcon}
          w={5}
          h={5}
          color="gray.500"
          cursor="pointer"
          ml={3}
          _hover={{ color: 'gray.700' }}
          onClick={triggerSearch}
        />
      </Flex>

      {/* Dropdown menu */}
      {isOpen && (
        <Box
          ref={dropdownRef}
          position="absolute"
          top="100%"
          left={0}
          w="200px"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="lg"
          mt={2}
          zIndex={10}
        >
          <VStack spacing={0} align="stretch">
            {/* All Categories */}
            <Box
              p={2}
              bg={selectedCategory === 'All Categories' ? 'gray.50' : undefined}
              _hover={{ bg: 'gray.50' }}
              cursor="pointer"
              onClick={handleAllCategories}
            >
              All Categories
            </Box>

            {/* Main categories */}
            {Object.entries(categories).map(([cat, items]) => (
              <Box
                key={cat}
                position="relative"
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Flex
                  p={2}
                  align="center"
                  justify="space-between"
                  bg={hoveredCategory === cat ? 'gray.50' : undefined}
                  _hover={{ bg: 'gray.50' }}
                  cursor="pointer"
                >
                  <Text fontSize="sm">{cat}</Text>
                  <ChevronRightIcon />
                </Flex>

                {/* Sub‐items */}
                {hoveredCategory === cat && (
                  <Box
                    position="absolute"
                    top={0}
                    left="100%"
                    w="200px"
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="md"
                    boxShadow="lg"
                    ml={1}
                  >
                    <VStack spacing={0} align="stretch">
                      {items.map((item) => (
                        <Box
                          key={item}
                          p={2}
                          fontSize="sm"
                          _hover={{ bg: 'gray.50' }}
                          cursor="pointer"
                          onClick={() => handleCategorySelect(item)}
                        >
                          {item}
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  )
}

export default SearchBar
