import classNames from 'classnames';
import { useAllDaosQuery } from 'dao/hooks/useAllDaosQuery';
import { QueryDependant } from 'lib/query/components/QueryDependant';
import { formatAmount } from 'lib/shared/utils/formatAmount';
import { removeUndefinedItems } from 'lib/shared/utils/removeUndefinedItems';
import { sum } from 'lib/shared/utils/sum';
import { SameWidthChildrenRow } from 'lib/ui/Layout/SameWidthChildrenRow';
import { TitledSection } from 'lib/ui/Layout/TitledSection';
import { NumericStatistic } from 'lib/ui/NumericStatistic';
import { Spinner } from 'lib/ui/Spinner';
import { Text } from 'lib/ui/Text';
import { useProposalsQuery } from 'queries';
import styles from './Overview.module.css';

export const Overview = () => {
  // TODO: get this a better way
  const { data: daos, status: daosStatus } = useAllDaosQuery();

  // TODO: need to fetch just the aggregated analytics value of this
  const { data: proposals, status: proposalsStatus } = useProposalsQuery({ limit: 100000 });

  const totalCommunityPools = sum(removeUndefinedItems((daos || []).map((dao) => dao.tvl)));

  return (
    <SameWidthChildrenRow minChildrenWidth={320} rowHeight={110} gap={16} fullWidth>
          <div className={classNames(styles.btn)}>
        <TitledSection title="Nico Dao Community Pool">
          <NumericStatistic value={formatAmount(totalCommunityPools)} suffix="USD" />
        </TitledSection>
            </div>
    </SameWidthChildrenRow>
  );
};
