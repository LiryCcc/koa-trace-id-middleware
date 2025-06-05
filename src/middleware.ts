import dayjs from 'dayjs';
import { Middleware } from 'koa';
import { getIncrementId } from './increment-id';
import { getHexIPV4 } from './network';
import type { CreateTraceIdMiddlewareProps } from './type';

const DEFAULT_TRACE_ID_HEADER_KEY = 'x-trace-id';

const createTraceIdMiddleware = (props: CreateTraceIdMiddlewareProps) => {
  const { traceIdHeaderKey, incrementIdGenerator } = props;
  const tihk = traceIdHeaderKey ?? DEFAULT_TRACE_ID_HEADER_KEY;
  const idGenerator = incrementIdGenerator ?? getIncrementId;
  const middleware: Middleware = async (ctx, next) => {
    const hexIP = getHexIPV4();
    const timeStamp = dayjs().valueOf().toString();
    const incrementId = idGenerator(ctx).toString().padStart(4, '0');
    const pid = process.pid.toString().padStart(5, '0');
    const traceId = ctx.header[tihk] || `${hexIP}-${timeStamp}-${incrementId}-${pid}`;

    ctx.state.traceId = traceId;
    ctx.set(tihk, traceId);
    next();
  };
  return middleware;
};

const defaultTraceIdMiddleware = createTraceIdMiddleware({});

export { createTraceIdMiddleware, defaultTraceIdMiddleware };
