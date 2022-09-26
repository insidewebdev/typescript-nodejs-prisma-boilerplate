export class BaseRoute {
    public apiPrefix: string = '/api';

    public getBaseUrl(path: string): string {
        return `${this.apiPrefix}${path}`;
    }

}