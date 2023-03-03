let count = 0;
interface JsonpOpts {
  param?: string;
  timeout?: number;
  prefix?: string;
  name?: string;
}
interface ClearUpOpt {
  script: HTMLScriptElement;
  timer: number | null;
  id: string;
}
export const noop = () => {
  // do nothing
};
const cleanup = (opts: ClearUpOpt) => {
  if (opts.script.parentNode) opts.script.parentNode.removeChild(opts.script);
  window[`${opts.id}`] = noop;
  if (opts.timer) clearTimeout(opts.timer);
};

export const jsonp = (url: string, opts: JsonpOpts, fn: any) => {
  const fnTmp = fn;
  const optsTmp = Object.assign({ param: 'callback', timeout: 60000, prefix: 'jp', name: '' }, opts);

  const { prefix } = optsTmp;

  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  count = count + 1;
  const id = optsTmp.name || prefix + count;

  const { param, timeout } = optsTmp;
  const enc = encodeURIComponent;
  const target = document.getElementsByTagName('script')[0] || document.head;
  const script: HTMLScriptElement = document.createElement('script');
  let timer: null | number = null;
  timer = window.setTimeout(() => {
    cleanup({ script, timer, id });
    fnTmp(new Error('Timeout'));
  }, timeout);

  const cancel = () => {
    if (window[`${id}`]) {
      cleanup({ script, timer, id });
    }
  };

  window[`${id}`] = (data: any) => {
    cleanup({ script, timer, id });
    if (fnTmp) {
      fnTmp(null, data);
    }
  };
  let urlScript = '';
  // add qs component
  urlScript = `${url}${(~url.indexOf('?') ? '&' : '?') + param}=${enc(id)}`;
  urlScript = urlScript.replace('?&', '?');

  // create script
  script.charset = 'UTF-8';
  script.src = urlScript;
  target.parentNode?.insertBefore(script, target);

  return cancel;
};
