import axios from 'axios';

import { Service } from 'services/Service';
import { ServiceCallsArgs } from 'services/ServiceCallsArgs';
import AuthenticationService from 'services/api/AuthenticationService';
import UserService from 'services/api/UserService';
import ProjectService from 'services/api/ProjectService';

const baseURL = process.env.REACT_APP_BASE_URL;

export function traceMethod<T extends Service>(obj: T) {
  const handler = Object.assign(obj, {
    get(target: any, propKey: string) {
      const origMethod = target[propKey];
      return (...args: any[]) => {
        ServiceCallsArgs.Instance.logMethodCall(
          obj.constructor.name,
          propKey,
          args,
        );

        return origMethod.apply(this, args);
      };
    },
  });
  return new Proxy(obj, handler);
}

const createAxiosInstance = (endpoint = '/api') =>
  axios.create({
    baseURL: `${baseURL}${endpoint}`,
  });

export default createAxiosInstance;

export const authenticationService = traceMethod(new AuthenticationService());

export const userService = traceMethod(new UserService());

export const projectService = traceMethod(new ProjectService());
