import * as React from "react"
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react"

export const Error = () => {

  return (
    <Alert
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        This page does not exist
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Please confirm your url and try again
      </AlertDescription>
    </Alert>
  )
}


