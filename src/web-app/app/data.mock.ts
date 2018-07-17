import {
  InMemoryDbService,
  RequestInfo,
  RequestInfoUtilities,
  ResponseOptions,
  getStatusText,
  STATUS
} from 'angular-in-memory-web-api';

import { stops, questions } from './shared/mock';

export class InMemoryDataService implements InMemoryDbService {
  // Called only on the first request
  createDb() {
    return { stops, questions };
  }

  post(reqInfo: RequestInfo) {
    const { collectionName, id, req } = reqInfo;

    if (collectionName === 'stops' && id && req['body'].inputs) {
      const res = {
        status: STATUS.OK,
        body: {
          message: 'Done :-)'
        }
      };
      return reqInfo.utils.createResponse$(() =>
        this.finishOptions(res, reqInfo)
      );
    }
  }

  // HTTP GET interceptor
  get(reqInfo: RequestInfo) {
    const { collectionName, id } = reqInfo;
    if (collectionName === 'stops' && id === 'search') {
      return this.getStops(reqInfo);
    }
    if (collectionName === 'questions') {
      return this.getQuestions(reqInfo);
    }
    return undefined; // let the default GET handle all others
  }

  // HTTP GET interceptor handles requests for stops
  private getStops(reqInfo: RequestInfo) {
    const dataEncapsulation = reqInfo.utils.getConfig().dataEncapsulation;
    const by = reqInfo.query.get('by').pop();
    const term = reqInfo.query
      .get('term')
      .pop()
      .toLowerCase();

    const data = reqInfo.collection
      .filter(col => {
        if (by === 'stop_id' && col['id'].includes(term)) return true;
        if (by === 'stop_name' && col['alpha_fr'].toLowerCase().includes(term))
          return true;
        if (by === 'stop_name' && col['alpha_nl'].toLowerCase().includes(term))
          return true;
        return false;
      })
      .sort((c1, c2) => {
        if (by === 'stop_id') return c1['id'].localeCompare(c2['id']);
        return c1['alpha_nl'].localeCompare(c2['alpha_nl']);
      });

    return reqInfo.utils.createResponse$(() => {
      console.log('HTTP GET override');

      // tslint:disable-next-line:triple-equals
      const options: ResponseOptions =
        data.length > 0
          ? {
              body: { stops: data },
              status: STATUS.OK
            }
          : {
              body: { error: `'Stop' with ${by}='${term}' not found` },
              status: STATUS.NOT_FOUND
            };
      return this.finishOptions(options, reqInfo);
    });
  }

  private getQuestions(reqInfo: RequestInfo) {
    return reqInfo.utils.createResponse$(() => {
      console.log('HTTP GET override');

      const options: ResponseOptions = {
        body: { questions: reqInfo.collection },
        status: STATUS.OK
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  /////////// helpers ///////////////

  private finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
