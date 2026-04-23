## Cursor Rules (Enforced)

All development in this repository must follow these rules.

### Scope & change discipline
- Keep changes minimal and directly related to the request.
- Do not expand scope, add new features “while you’re here”, or introduce feature drift.
- Do not introduce new architecture patterns unless explicitly required.
- Avoid overengineering; prefer simple working code.
- Break large work into smaller, working steps.

### Quality gates (before calling work “done”)
- Confirm the build passes.
- Confirm TypeScript strict mode passes (if applicable to the project).
- Confirm there is no unused code introduced by the change.
- Confirm the implementation matches the requested output and does not drift.

### Editing rules
- Do not refactor stable code unless it’s necessary to fulfill the request.
- Prefer edits to existing components over creating new abstractions.
- Keep naming and file placement consistent with existing patterns in the repo.
