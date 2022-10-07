import tsup, { type Options } from 'tsup';
import type { PluginOptions } from '../../dist';
import { assertFileContent, buildAbsolutePath, createTsupConfig } from '../util';

function createConfig(pluginOptions?: PluginOptions): Options {
  return createTsupConfig(
    {
      format: ['esm'],
      entry: [buildAbsolutePath('./build-in/custom-inject-tag.mts')]
    },
    pluginOptions
  );
}

describe.only('Custom Version Inject Tag', () => {
  test('GIVEN custom tag THEN injects version', async () => {
    const config = createConfig({
      injectTag: '[VersionInject][/VersionInject]'
    });

    await tsup.build(config);

    await assertFileContent('./build-out/tsup/custom-inject-tag.mjs');
  });
});