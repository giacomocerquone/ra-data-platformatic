var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { stringify } from "query-string";
import { fetchUtils } from "ra-core";
/**
 * Maps react-admin queries to a platformatic powered REST API
 *
 * @see https://github.com/platformatic/platformatic
 *
 * @example
 *
 * getList          => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * getOne           => GET http://my.api.url/posts/123
 * getManyReference => GET http://my.api.url/posts?author_id=345
 * getMany          => GET http://my.api.url/posts?id=123&id=456&id=789
 * create           => POST http://my.api.url/posts/123
 * update           => PUT http://my.api.url/posts/123
 * updateMany       => PUT http://my.api.url/posts/123, PUT http://my.api.url/posts/456, PUT http://my.api.url/posts/789
 * delete           => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 * import platformaticRestProvider from 'ra-data-platformatic-rest';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={platformaticRestProvider('http://my.api.url')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 */
var formatFilters = function (_a) {
    var filters = _a.filters;
    return filters
        ? Object.keys(filters).reduce(function (acc, param) {
            acc["where.".concat(param, ".eq")] = filters[param];
            return acc;
        }, {})
        : {};
};
export default (function (apiUrl, httpClient) {
    if (httpClient === void 0) { httpClient = fetchUtils.fetchJson; }
    return ({
        getList: function (resource, params) {
            var _a;
            var _b = params.pagination, page = _b.page, perPage = _b.perPage;
            var _c = params.sort, field = _c.field, order = _c.order;
            var query = __assign(__assign({}, formatFilters(params.filter)), (_a = {}, _a["orderby.".concat(field)] = order.toLowerCase(), _a.limit = perPage, _a.offset = (page - 1) * perPage, _a.totalCount = true, _a));
            var url = "".concat(apiUrl, "/").concat(resource, "?").concat(stringify(query));
            return httpClient(url).then(function (_a) {
                var headers = _a.headers, json = _a.json;
                if (!headers.has("x-total-count")) {
                    throw new Error("The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?");
                }
                return {
                    data: json,
                    total: parseInt(headers.get("x-total-count").split("/").pop(), 10),
                };
            });
        },
        getOne: function (resource, params) {
            return httpClient("".concat(apiUrl, "/").concat(resource, "/").concat(params.id)).then(function (_a) {
                var json = _a.json;
                return ({
                    data: json,
                });
            });
        },
        getMany: function (resource, params) {
            var query = {
                "where.id.in": params.ids.join(","),
            };
            var url = "".concat(apiUrl, "/").concat(resource, "?").concat(stringify(query));
            return httpClient(url).then(function (_a) {
                var json = _a.json;
                return ({ data: json });
            });
        },
        getManyReference: function (resource, params) {
            var _a;
            var _b = params.pagination, page = _b.page, perPage = _b.perPage;
            var _c = params.sort, field = _c.field, order = _c.order;
            var query = __assign(__assign({}, formatFilters(params.filter)), (_a = {}, _a["where.".concat(params.target, ".eq")] = params.id, _a["orderby.".concat(field)] = order.toLowerCase(), _a.limit = perPage, _a.offset = (page - 1) * perPage, _a.totalCount = true, _a));
            var url = "".concat(apiUrl, "/").concat(resource, "?").concat(stringify(query));
            return httpClient(url).then(function (_a) {
                var headers = _a.headers, json = _a.json;
                if (!headers.has("x-total-count")) {
                    throw new Error("The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?");
                }
                return {
                    data: json,
                    total: parseInt(headers.get("x-total-count").split("/").pop(), 10),
                };
            });
        },
        update: function (resource, params) {
            return httpClient("".concat(apiUrl, "/").concat(resource, "/").concat(params.id), {
                method: "PUT",
                body: JSON.stringify(params.data),
            }).then(function (_a) {
                var json = _a.json;
                return ({ data: json });
            });
        },
        // platformatic doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        updateMany: function (resource, params) {
            return Promise.all(params.ids.map(function (id) {
                return httpClient("".concat(apiUrl, "/").concat(resource, "/").concat(id), {
                    method: "PUT",
                    body: JSON.stringify(params.data),
                });
            })).then(function (responses) { return ({ data: responses.map(function (_a) {
                    var json = _a.json;
                    return json.id;
                }) }); });
        },
        create: function (resource, params) {
            return httpClient("".concat(apiUrl, "/").concat(resource), {
                method: "POST",
                body: JSON.stringify(params.data),
            }).then(function (_a) {
                var json = _a.json;
                return ({
                    data: __assign(__assign({}, params.data), { id: json.id }),
                });
            });
        },
        delete: function (resource, params) {
            return httpClient("".concat(apiUrl, "/").concat(resource, "/").concat(params.id), {
                method: "DELETE",
            }).then(function (_a) {
                var json = _a.json;
                return ({ data: json });
            });
        },
        // platformatic doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        deleteMany: function (resource, params) {
            return Promise.all(params.ids.map(function (id) {
                return httpClient("".concat(apiUrl, "/").concat(resource, "/").concat(id), {
                    method: "DELETE",
                });
            })).then(function (responses) { return ({ data: responses.map(function (_a) {
                    var json = _a.json;
                    return json.id;
                }) }); });
        },
    });
});
//# sourceMappingURL=index.js.map