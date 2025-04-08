import {
    InputGroup,
    Input,
    InputRightElement,
    Icon,
    Select,
    Flex,
  } from '@chakra-ui/react'
  import { SearchIcon } from '@chakra-ui/icons'
  
  const SearchBar = () => {
    return (
      <Flex
        bg="gray.50"
        borderRadius="md"
        overflow="hidden"
        border="1px solid"
        borderColor="gray.200"
        w="full"
      >
        {/* Categories Dropdown */}
        <Select
          placeholder="All Categories"
          variant="filled"
          bg="gray.50"
          _hover={{ bg: 'gray.100' }}
          borderRight="1px solid"
          borderColor="gray.200"
          borderRadius="0"
          w="200px"
          fontSize="sm"
          color="gray.600"
        >
          <option value="water">Water Treatment</option>
          <option value="oleo">Oleo</option>
          <option value="sodium">Sodium Chloride</option>
          <option value="mining">Mining</option>
          <option value="printing">Printing</option>
          <option value="paints">Paints</option>
          <option value="adhesives">Adhesives & Sealant</option>
        </Select>
  
        {/* Search Input 2nd change de */}
        <InputGroup size="md">
          <Input
            placeholder="Search medicine, medical products"
            border="none"
            _focus={{
              boxShadow: 'none',
              border: 'none',
            }}
            fontSize="sm"
          />
          <InputRightElement>
            <Icon 
              as={SearchIcon} 
              color="red.500"
              cursor="pointer"
              _hover={{ color: 'red.600' }}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    )
  }
  
  export default SearchBar