import { usePrevious } from 'react-use';
import { padWithZero } from 'lib/shared/utils/padWithZero';
import styled from 'styled-components';
import { Center } from 'lib/ui/Center';
import { HStack } from 'lib/ui/Stack';
import { Text } from 'lib/ui/Text';
import { SlidingCharacter } from './SlidingCharacter';
import { Panel } from '../Panel/Panel';

interface Props {
  value: number;
}

const Container = styled(Panel)`
  width: 90px;
  height: 120px;
  padding: 8px;

  position: relative;
  overflow: hidden;
  display: flex;

  font-weight: 600;
  font-size: 40px;
  line-height: 1;
  font-variant-numeric: tabular-nums;
`;

const CharacterContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
`;

export const CountdownPart = ({ value }: Props) => {
  const previousValue = usePrevious(value);
  const [currentString, previousString] = [value, previousValue || value].map((number) => padWithZero(number));

  return (
    <Container>
      <Center>
        <HStack>
          {currentString.split('').map((character, index) => {
            const previousCharacter = previousString[index];
            const animationId = previousCharacter !== character ? `${previousCharacter}${character}` : undefined;

            return (
              <CharacterContainer key={index}>
                <Text style={{ visibility: 'hidden' }}>{character}</Text>
                <SlidingCharacter as="div" animationId={animationId}>
                  <Text>{previousCharacter}</Text>
                  <Text>{character}</Text>
                </SlidingCharacter>
              </CharacterContainer>
            );
          })}
        </HStack>
      </Center>
    </Container>
  );
};
