export default class Header {
    statusCode: number = 200;
    headers: Object = {
        'Content-Type': 'text/html',
        'X-Powered-By': 'Dexterity',
    };

    setStatus(code: number): void {
        this.statusCode = code;
    }

    setHeader(type: string, value: string) {
        this.headers[type] = value;
    }
}