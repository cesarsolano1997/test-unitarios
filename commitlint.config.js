module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'test',
        'feat', // Nueva funcionalidad
        'fix', // Corrección de bugs
        'chore', // Tareas de mantenimiento
        'docs', // Documentación
        'style', // Cambios de estilo (formato, etc)
        'refactor', // Refactorización
        'test', // Agregar o modificar tests
        'perf', // Mejoras de rendimiento
        'ci', // Cambios en CI
        'build', // Cambios en el build
        'revert' // Revertir cambios
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'never'],
    'header-max-length': [2, 'always', 100]
  }
}
