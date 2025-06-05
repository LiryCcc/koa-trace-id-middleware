import type { IncrementIdGenerator } from './type';

const getIncrementId: IncrementIdGenerator = (): number => {
  // 目前生成随机数，后续放在redis里面
  return Math.floor(Math.random() * 10000);
};

export { getIncrementId };
