/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from 'lodash';
import { Moment } from 'moment';
import React, { useMemo } from 'react';
import { down } from 'styled-breakpoints';
import { useBreakpoint } from 'styled-breakpoints/react-styled';
import styled from 'styled-components';
import { DatePicker, SpellList, PageWrapper, Spinner } from '../../components';
import Input from '../../components/inputs/Input';
import { useSideBarContext } from '../../context/SidebarContext';

interface Props {
  spells: Definitions.Spell[];
  onSearch: React.ChangeEventHandler<HTMLInputElement>;
  search?: string;
  startDate?: Moment;
  endDate?: Moment;
  onDatesChange: ({
    startDate,
    endDate,
  }: {
    startDate?: Moment;
    endDate?: Moment;
  }) => void;
  selectedSpell?: string;
  rowsExpanded?: string[];
  onloadMore?: () => void;
  loading?: boolean;
}

export default function SpellsPage({
  spells,
  onSearch,
  search,
  onDatesChange,
  startDate,
  endDate,
  selectedSpell,
  rowsExpanded = [],
  onloadMore,
  loading,
}: Props) {
  const debouncedOnSearch = useMemo(() => debounce(onSearch, 500), [onSearch]);
  const rowsExpandedMemo = useMemo(
    () => (selectedSpell ? [selectedSpell, ...rowsExpanded] : rowsExpanded),
    [rowsExpanded, selectedSpell],
  );

  const isDownXs = useBreakpoint(down('xs'));
  const { expanded: expandedInStorage } = useSideBarContext();

  const expanded = useMemo(
    () => expandedInStorage && !isDownXs,
    [expandedInStorage, isDownXs],
  );

  return (
    <PageWrapper header={{ title: 'Spells (changelogs)', iconName: 'spells' }}>
      <Container>
        {loading ? (
          <Spinner
            top="50vh"
            position="fixed"
            left={expanded ? '56.70%' : '52%'}
          />
        ) : (
          <>
            <FiltersContainer>
              {/* TODO: this is temporarily */}
              {/* <Spacer>
            <InputStyled
              defaultValue={search}``
              type="search"
              placeholder="search"
              onChange={debouncedOnSearch}
              />
            </Spacer> */}
              <Spacer>
                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={onDatesChange}
                />
              </Spacer>
            </FiltersContainer>

            <SpellList
              spells={spells}
              selectedSpell={selectedSpell}
              rowsExpanded={rowsExpandedMemo}
              onloadMore={onloadMore}
            />
          </>
        )}
      </Container>
    </PageWrapper>
  );
}
const Spacer = styled.div`
  margin-left: 24px;
  margin-top: 10px;
  ${down('xs')} {
    margin-left: 0px;
    margin-top: 10px;
  }
`;

const Container = styled.div`
  margin-left: 4.5%;
  margin-right: 4.5%;
  ${down('xs')} {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 33px;
  margin-bottom: 59px;
  flex-wrap: wrap;
  ${down('xs')} {
    flex-direction: column;
  }
`;

const InputStyled = styled(Input)`
  ${down('xs')} {
    width: 100%;
  }
`;
