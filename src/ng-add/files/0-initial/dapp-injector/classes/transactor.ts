import { providers } from 'ethers';
import { ITRANSACTION_RESULT } from '../models';

export const doSignerTransaction = async (
  tx: Promise<providers.TransactionResponse>
): Promise<ITRANSACTION_RESULT> => {
  let notification_message: ITRANSACTION_RESULT = {
    success: false,
    payload: '',
  };

  try {
    const tx_result: providers.TransactionResponse = await tx;
    if (typeof tx_result.wait === 'function') {
      await tx_result.wait();
    }

    notification_message.success = true;
    notification_message.payload = tx_result;
    return notification_message;
  } catch (e: any) {
    notification_message.payload = e;
    let message =
      e.data && e.data.message
        ? e.data.message
        : e.error && JSON.parse(JSON.stringify(e.error)).body
        ? JSON.parse(JSON.parse(JSON.stringify(e.error)).body).error.message
        : e.data
        ? e.data
        : JSON.stringify(e);
    if (!e.error && e.message) {
      message = e.message;
    }

    console.log('Attempt to clean up:', message);
    try {
      let obj = JSON.parse(message);
      if (obj && obj.body) {
        let errorObj = JSON.parse(obj.body);
        if (errorObj && errorObj.error && errorObj.error.message) {
          message = errorObj.error.message;
        }
      }
    } catch (e) {
      //ignore
    }
    notification_message.error_message = message;
    return notification_message;
  }
};
