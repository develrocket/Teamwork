import Api from "../api";
import BaseService from "../base-service";

class UserStoryService extends BaseService {
  baseUrlName = "scrum:user-story";

  validate(pk, queryParams) {
    const url = Urls[`${this.baseUrlName}-validate`]({ pk });
    return Api.patch(url, undefined, { params: queryParams });
  }

  copy(pk) {
    const url = Urls[`${this.baseUrlName}-copy`]({ pk });
    return Api.post(url);
  }

  tasksByUserStory(pk, queryParams) {
    const url = Urls["scrum:user-story-tasks-list"]({ user_story: pk });
    return Api.get(url, { params: queryParams });
  }

  progressByUserStory(pk, queryParams) {
    const url = Urls["scrum:user-story-progress-list"]({ user_story: pk });
    return Api.get(url, { params: queryParams });
  }

  effortByUserStory(pk, queryParams) {
    const url = Urls["scrum:user-story-effort-list"]({ user_story: pk });
    return Api.get(url, { params: queryParams });
  }

  typeChartData(queryParams) {
    const url = Urls["scrum:user-story-type-pie-chart"]();
    return Api.get(url, { params: queryParams });
  }

  effortRoleChartData(queryParams) {
    const url = Urls["scrum:user-story-effort-role-pie-chart"]();
    return Api.get(url, { params: queryParams });
  }

  userChartData(queryParams) {
    const url = Urls["scrum:user-story-user-chart"]();
    return Api.get(url, { params: queryParams });
  }

  delayedChartData(queryParams) {
    const url = Urls["scrum:user-story-delayed-pie-chart"]();
    return Api.get(url, { params: queryParams });
  }

  overworkedChartData(queryParams) {
    const url = Urls["scrum:user-story-overworked-pie-chart"]();
    return Api.get(url, { params: queryParams });
  }
}

const service = Object.freeze(new UserStoryService());

export default service;
