import gql from 'graphql-tag';
export const  reportDevelopmentalSubscriptionByArea = gql`
        query reportDevelopmentalSubscriptionByArea($day_1: String!,$day_2: String!,$day_3: String!,$day_4: String!,$day_5: String!,$day_6: String!,$day_7: String!) {
          oneDayAgo:reportDevelopmentalSubscriptionByAreaOnDay(day:$day_1) {
            day
            northernCount
            centralCount
            southCount
            unknownCount
          }
          twoDayAgo:reportDevelopmentalSubscriptionByAreaOnDay(day:$day_2) {
            day
            northernCount
            centralCount
            southCount
            unknownCount
          }
          threeDaysAgo:reportDevelopmentalSubscriptionByAreaOnDay(day:$day_3) {
            day
            northernCount
            centralCount
            southCount
            unknownCount
          }
          fourDaysAgo:reportDevelopmentalSubscriptionByAreaOnDay(day:$day_4) {
            day
            northernCount
            centralCount
            southCount
            unknownCount
          }
          fiveDaysAgo:reportDevelopmentalSubscriptionByAreaOnDay(day:$day_5) {
            day
            northernCount
            centralCount
            southCount
            unknownCount
          }
          sixDaysAgo:reportDevelopmentalSubscriptionByAreaOnDay(day:$day_6) {
            day
            northernCount
            centralCount
            southCount
            unknownCount
          }
          sevenDaysAgo: reportDevelopmentalSubscriptionByAreaOnDay(day: $day_7) {
            day
            northernCount
            centralCount
            southCount
            unknownCount
          }
          reportEffectiveSubscriptionByType {
            types
            counts
          }
          oneDayAgoByType:reportPaymentTotalByTypeOnDay(day:$day_1) {
            day
            cod
            electronicCard
            physicalCard
          }
          twoDayAgoByType:reportPaymentTotalByTypeOnDay(day:$day_2) {
            day
            cod
            electronicCard
            physicalCard
          }
          threeDayAgoByType:reportPaymentTotalByTypeOnDay(day:$day_3) {
            day
            cod
            electronicCard
            physicalCard
          }
          fourDayAgoByType:reportPaymentTotalByTypeOnDay(day:$day_4) {
            day
            cod
            electronicCard
            physicalCard
          }
          fiveDayAgoByType:reportPaymentTotalByTypeOnDay(day:$day_5) {
            day
            cod
            electronicCard
            physicalCard
          }
          sixDayAgoByType:reportPaymentTotalByTypeOnDay(day:$day_6) {
            day
            cod
            electronicCard
            physicalCard
          }
          sevenDayAgoByType:reportPaymentTotalByTypeOnDay(day:$day_7) {
            day
            cod
            electronicCard
            physicalCard
          }
         
        }
        
       
      `;
export const  reportCurrentStatistic  = gql`
  query reportCurrentStatistic{
    reportCurrentStatistic {
      developmentalSubCount
      paymentValueSum
      effectiveSubCount
      problemCount
    }
  }
`;
