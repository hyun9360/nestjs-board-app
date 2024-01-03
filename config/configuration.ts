import { readFileSync } from 'fs';
import { join } from 'path';
import * as process from 'process';
import * as yaml from 'js-yaml';

const YAML_CONFIG_PROD = 'production.yml';
const YAML_CONFIG_DEV = 'development.yml';
// const YAML_CONFIG_DEFAULT = 'default.yml';

export default () => {
  const pathToFile =
    process.env.NODE_ENV === 'production'
      ? readFileSync(join(__dirname, YAML_CONFIG_PROD), 'utf-8')
      : readFileSync(join(__dirname, YAML_CONFIG_DEV), 'utf-8');

  return yaml.load(pathToFile) as Record<string, any>;
};
