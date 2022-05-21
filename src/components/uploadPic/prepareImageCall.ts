import { v4 as uuidv4 } from 'uuid';

export const prepareImageCall = function (readerResults: string) {
  let fileUrlList = readerResults.split(',');
  // let fileInfo = fileUrlList[0];
  let base64String = fileUrlList[1];
  let id = uuidv4();
  let request = {
    id: id,
    image: base64String,
  };

  return request;
};
