# Contributing to Leaked Key Playbooks

Thank you for helping make credential incident response knowledge accessible to everyone.

## Ways to Contribute

- **Add a new provider playbook** — Document revocation, rotation, and investigation steps for a new provider
- **Fix an existing playbook** — Correct outdated or inaccurate instructions with evidence
- **Add evidence** — Link additional official documentation to existing claims
- **Improve documentation** — Fix typos, improve clarity, add examples
- **Report an issue** — Flag incorrect or outdated information

## Playbook Quality Standards

Every playbook must meet these standards before merging:

1. **Evidence-backed** — Every factual claim must link to official provider documentation, a security advisory, or a reproducible behavior
2. **No fabricated data** — Do not invent verification dates, grace periods, or session behavior without evidence
3. **No real credentials** — Use synthetic example credentials only (e.g., `AKIAIOSFODNN7EXAMPLE`)
4. **Provider-specific** — Generic advice belongs in the Response Guide, not individual playbooks
5. **Accurate severity** — Severity must reflect the actual blast radius of the credential

## Adding a New Playbook

1. Fork the repository and create a branch: `git checkout -b playbook/provider-credential`
2. Add the provider to `src/lib/providers.ts` if it doesn't exist
3. Add the playbook to `src/lib/playbooks.ts` following the existing schema
4. Set `verificationStatus: "verified"` only if you have verified the behavior against official documentation
5. Set `lastVerified` to today's date in ISO format (YYYY-MM-DD)
6. Set `expiresAt` to 180 days from `lastVerified`
7. Include at least one `official-docs` source
8. Open a pull request with:
   - A description of the credential type
   - Links to the official documentation you used
   - Any notable provider-specific behavior

## Fixing an Existing Playbook

1. Open an issue first describing what is incorrect and linking to the correct official documentation
2. Submit a pull request with the correction
3. Update `lastVerified` to today's date
4. Add or update the relevant source reference

## What Not to Include

- Real API keys, tokens, passwords, or secrets of any kind
- Sensitive incident data that could identify individuals or organizations
- Unverified claims presented as facts
- Instructions that could be used to exploit systems

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## Security Issues

Do not open public issues for security vulnerabilities in this project. See [SECURITY.md](SECURITY.md).
