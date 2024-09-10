export namespace api {
	
	export class ArrangeOptions {
	
	
	    static createFrom(source: any = {}) {
	        return new ArrangeOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	
	    }
	}
	export class ArrangeResult {
	
	
	    static createFrom(source: any = {}) {
	        return new ArrangeResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	
	    }
	}
	export class Document {
	
	
	    static createFrom(source: any = {}) {
	        return new Document(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	
	    }
	}

}

