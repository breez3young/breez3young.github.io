# Local preview

- Keep at most one local preview server for this personal homepage, including servers from temporary copies and worktrees.
- Before starting a preview, inspect existing homepage servers and their listening ports. Reuse the current server when possible. If a restart is needed, stop the old server and confirm its port is released before starting its replacement.
- Run previews from this repository so they reflect the latest edits. Do not leave a separate server serving a stale temporary build.
- Use `npm run dev` for development or `npm run preview` after a build. Both are configured for `http://127.0.0.1:5173` with `strictPort: true`; never run them simultaneously or override the port to create an additional preview.
- If port 5173 belongs to an unrelated application, report the conflict; do not terminate that application or silently switch ports.
- Record the preview server PID and port. When asked to stop previews, stop every confirmed homepage preview instance, including temporary copies, and verify their listening ports are closed. Do not restart a preview as part of cleanup.
