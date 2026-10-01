/** @type {import('cz-git').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // A new feature
        'fix',      // A bug fix
        'docs',     // Documentation changes
        'style',    // Formatting / styling changes
        'refactor', // Code changes without bug fix or new feature
        'perf',     // Performance improvements
        'test',     // Tests
        'build',    // Build system or dependency updates
        'ci',       // CI/CD pipelines
        'chore',    // Maintenance, tooling, config
        'revert',   // Revert previous commit
      ],
    ],
    // Scope is completely OPTIONAL for seamless monorepo commits touching multiple folders
    'scope-empty': [0],
    'scope-enum': [0], // Do NOT restrict to specific folder names - any feature, component, or multi-folder scope is allowed
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'subject-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
  },
  prompt: {
    messages: {
      type: "Select the type of change that you're committing:",
      scope: 'Select or type the SCOPE of this change (OPTIONAL - press Enter to skip):',
      customScope: 'Custom scope (e.g. auth, calendar, fullstack, web, api):',
      subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
      body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
      breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
      footerPrefixesSelect: 'Select the ISSUES type of change (optional):',
      customFooterPrefix: 'Input ISSUES prefix:',
      footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
      confirmCommit: 'Are you sure you want to proceed with the commit above?',
    },
    types: [
      { value: 'feat', name: 'feat:     A new feature across any part of the monorepo' },
      { value: 'fix', name: 'fix:      A bug fix' },
      { value: 'refactor', name: 'refactor:  Refactoring (across services or single apps)' },
      { value: 'perf', name: 'perf:     Performance improvement' },
      { value: 'docs', name: 'docs:     Documentation updates' },
      { value: 'style', name: 'style:    Formatting, styles, UI tweaks' },
      { value: 'test', name: 'test:     Adding or fixing tests' },
      { value: 'build', name: 'build:    Build system, dependencies, or monorepo tools' },
      { value: 'ci', name: 'ci:       CI/CD pipeline updates' },
      { value: 'chore', name: 'chore:    Repo maintenance, scripts, tooling' },
      { value: 'revert', name: 'revert:   Revert previous commit' },
    ],
    scopes: [
      { value: '', name: 'none:     (Skip scope - whole monorepo / multi-package commit)' },
      { value: 'fullstack', name: 'fullstack: Fullstack changes spanning Web & API' },
      { value: 'calendar', name: 'calendar:  Core calendar domain logic' },
      { value: 'auth', name: 'auth:      Authentication & session handling' },
      { value: 'web', name: 'web:       Next.js Web frontend' },
      { value: 'api', name: 'api:       Rust Actix Web backend' },
      { value: 'app', name: 'app:       Flutter mobile/desktop app' },
      { value: 'db', name: 'db:        Database schema, migrations, Redis' },
      { value: 'infra', name: 'infra:     Docker, compose, infrastructure' },
      { value: 'repo', name: 'repo:      Root monorepo configuration & hooks' },
    ],
    useEmoji: true,
    emojiAlign: 'center',
    themeColorCode: '',
    allowCustomScopes: true,
    allowEmptyScopes: true, // Scope is never forced
    upperCaseSubject: false,
    maxHeaderLength: 100,
    maxSubjectLength: 100,
  },
};
