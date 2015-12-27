interface EventHandler<Data> {
  (data: Data): void;
}

export interface ISubscription {
  unsubscribe: () => void;
}

interface HandlerData<Data> {
  fn: EventHandler<Data>;
  once: boolean;
}

export class EventEmitter<Data> {
  private handlers: HandlerData<Data>[] = [];
  private inProgress: boolean = false;
  private delayed: Function[] = [];
  private removeAll: boolean = true;

  public on(fn: (data: Data) => void) {
    return this.addHandler(fn, false);
  }

  public once(fn: (data: Data) => void) {
    return this.addHandler(fn, true);
  }

  private addHandler(fn: (data: Data) => void, once: boolean) {
    const handler = { fn: fn, once: once };
    if (this.inProgress) {
      this.delayed.push(() => this.handlers.push(handler));
    }
    else {
      this.handlers.push(handler);
    }
    return {
      unsubscribe: () =>  {
        this.off(fn);
      }
    }
  }

  private off(fn: (data: Data) => void) {
    if (this.inProgress) {
      this.delayed.push(() => this.off(fn));
    }
    else {
      this.handlers = this.handlers.filter((handler) => handler.fn !== fn);
    }
  }

  public unsubscribeAll() {
    if (this.inProgress) {
      this.removeAll = true;
    }
    else {
      delete this.handlers;
      this.handlers = [];
    }
  }

  public trigger(data?: Data) {
    // TODO: Fix code as it doesn't perform unsubscription
    this.handlers.forEach(handler => handler.fn(data));
    this.handlers = this.handlers.filter(handler => !handler.once);
  }

  public get listener(): EventListener<Data> {
    return this;
  }
}

export interface EventListener<Data> {
  on(fn: (data: Data) => void): ISubscription;
  once(fn: (data: Data) => void): ISubscription;
  unsubscribeAll(): void;
}