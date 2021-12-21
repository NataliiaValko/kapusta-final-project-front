import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { format, startOfMonth, lastDayOfMonth } from 'date-fns';
import { useMediaPredicate } from 'react-media-hook';
import Container from 'components/Container';
import HeaderTabs from 'components/Balance/HeaderTabs';
import BalanceLine from 'components/Balance/BalanceLine';
import MobilePage from 'components/Balance/Mobile/MobilePage';
import BREAKPOINTS from 'Constants/BREAKPOINTS';
import { useGetTransactionsQuery } from 'redux/service/transactionApi';

const useStyles = makeStyles(theme => ({
  balanceSection: {
    maxWidth: BREAKPOINTS.mobile,
    marginLeft: 'auto',
    marginRight: 'auto',

    [theme.breakpoints.up(BREAKPOINTS.tablet)]: {
      maxWidth: BREAKPOINTS.tablet,
      padding: '40px 0 280px 0',
    },

    [theme.breakpoints.up(BREAKPOINTS.desktop)]: {
      maxWidth: BREAKPOINTS.desktop,
      padding: '40px 0 80px 0',
    },
  },
}));

const incomReportData = [
  {
    id: 234,
    month: 'Январь',
    totalsum: 30000,
  },
  {
    id: 235,
    month: 'Февраль',
    totalsum: 35000,
  },
];

const expensesReportData = [
  {
    id: 2322,
    month: 'Январь',
    totalsum: 20000,
  },
  {
    id: 23434,
    month: 'Февраль',
    totalsum: 25000,
  },

  {
    id: 2343444,
    month: 'Март',
    totalsum: 2000,
  },
];

const BalancePage = () => {
  const [date, setDate] = useState(() => new Date());

  const classes = useStyles();

  const small = useMediaPredicate('(max-width: 767px)');
  const medium = useMediaPredicate('(min-width: 768px) and (max-width: 1279px)');
  const large = useMediaPredicate('(min-width: 1280px)');

  const getCurrentDate = date => setDate(date);

  const firstOfMonth = format(startOfMonth(date), 'yyyy-MM-dd');
  const lastOfMonth = format(lastDayOfMonth(date), 'yyyy-MM-dd');

  const { data, isFetching } = useGetTransactionsQuery({
    startDate: firstOfMonth,
    endDate: lastOfMonth,
  });

  return (
    <section className={classes.balanceSection}>
      <Container>
        {small && (
          <>
            {!isFetching && (
              <MobilePage
                getCurrentDate={getCurrentDate}
                userData={data.data?.transactions.find(item => item.balance)}
                transactionsData={data.data?.transactions}
              />
            )}
          </>
        )}

        {medium && (
          <>
            {!isFetching && (
              <>
                <BalanceLine userData={data.data?.transactions.find(item => item.balance)} />

                <HeaderTabs
                  initialDate={date}
                  getCurrentDate={getCurrentDate}
                  transactions={data.data?.transactions}
                  incomReportData={incomReportData}
                  expensesReportData={expensesReportData}
                />
              </>
            )}
          </>
        )}

        {large && (
          <>
            {!isFetching && (
              <>
                <BalanceLine userData={data.data?.transactions.find(item => item.balance)} />

                <HeaderTabs
                  initialDate={date}
                  getCurrentDate={getCurrentDate}
                  transactions={data.data?.transactions}
                  incomReportData={incomReportData}
                  expensesReportData={expensesReportData}
                />
              </>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default BalancePage;
