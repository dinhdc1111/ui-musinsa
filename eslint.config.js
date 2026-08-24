import js from '@eslint/js'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { withVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'

export default withVueTs(
  globalIgnores(['**/dist/**', '**/coverage/**', '**/musinsa-ui-captures/**']),
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  skipFormatting,
)
