export interface StepLogger {
  log: (message: string) => void;
}

export interface PipelineOptions {
  advance?: (label: string) => void;
  log?: (message: string) => void;
}

export function createPipeline<Ctx>(ctx: Ctx, options?: PipelineOptions) {
  const advance = options?.advance ?? ((label) => console.log(`${label}...`));
  const log = options?.log ?? ((message) => console.log(`  ${message}`));

  return async function step<T>(
    label: string,
    fn: (log: StepLogger, ctx: Ctx) => Promise<T>,
  ): Promise<T> {
    advance(label);
    return fn({ log }, ctx);
  };
}
