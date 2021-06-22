import BaseService from "../base-service";

class LinkService extends BaseService {
  basename = "common:link";
}

const service = Object.freeze(new LinkService());

export default service;
