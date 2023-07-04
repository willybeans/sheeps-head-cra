import * as React from "react"
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"

interface Props {
  icon: JSX.Element,
  title: string,
  body: string,
  primaryAction: string,
  secondaryAction: string
}

export const ModalComponent: React.FC<Props> = ({icon, title, body, primaryAction, secondaryAction,}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}> {icon} Create New Game</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>{body}</div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              {primaryAction}
            </Button>
            <Button colorScheme='red' onClick={onClose}>{secondaryAction}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}