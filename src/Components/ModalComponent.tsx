import { ReactElement, Dispatch, SetStateAction } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Text,
  Flex
} from '@chakra-ui/react';

interface Props {
  icon: any;
  title: string;
  body: ReactElement;
  primaryAction: () => Promise<void>;
  secondaryAction?: () => void;
  primaryActionTitle: string;
  secondaryActionTitle: string;
}

export const ModalComponent: React.FC<Props> = ({
  icon,
  title,
  body,
  primaryAction,
  secondaryAction,
  primaryActionTitle,
  secondaryActionTitle
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const primaryClick = () => {
    primaryAction();
    onClose();
  };
  return (
    <>
      <Button onClick={onOpen} height={'5rem'}>
        <Flex
          height={'100%'}
          padding={'.5rem'}
          direction={'column'}
          justify={'space-between'}
          alignItems={'center'}
        >
          <Text> Create New Game</Text>
          <Icon
            data-testid="join-game-test"
            aria-label="join game"
            as={icon}
            boxSize={8}
            color="purple.500"
            // onClick={onSubmit}
          />
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={primaryClick}>
              {primaryActionTitle}
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              {secondaryActionTitle}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
