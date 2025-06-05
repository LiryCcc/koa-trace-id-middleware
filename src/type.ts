import Application from 'koa';

// 自增id生成器
type IncrementIdGenerator = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: Application.ParameterizedContext<Application.DefaultState, Application.DefaultContext, any>
) => number | string;

type CreateTraceIdMiddlewareProps = {
  incrementIdGenerator?: IncrementIdGenerator;
  traceIdHeaderKey?: string;
};

export type { CreateTraceIdMiddlewareProps, IncrementIdGenerator };
