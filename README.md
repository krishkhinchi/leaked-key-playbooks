# Leaked Key Playbooks

**You leaked a credential. Know exactly what to do next.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Playbooks](https://img.shields.io/badge/playbooks-8-blue.svg)](#supported-providers)
[![Last Updated](https://img.shields.io/badge/last%20updated-2025-blue.svg)](#)

An open-source, provider-specific incident response knowledge base that helps developers understand, revoke, rotate, investigate, and recover from leaked credentials.

---

## The Problem

Developers accidentally expose credentials constantly:

- Pushing `.env` files to public repositories
- Committing API keys in source code
- Exposing secrets in CI/CD logs
- Sharing screenshots containing tokens
- Leaking credentials through frontend JavaScript
- Accidentally exposing database connection strings

The standard advice — **"revoke and rotate"** — is dangerously incomplete.

Every provider behaves differently:

| Behavior | Varies By Provider |
|---|---|
| Revocation speed | Immediate vs. propagation delay |
| Session persistence | Derived tokens may outlive the parent credential |
| Grace periods | Some providers maintain a window where the old key still works |
| Audit log depth | Some providers log every API call; others log nothing |
| Blast radius | One key may expose your entire infrastructure |

Without provider-specific knowledge, you may think you're safe when you're not.

---

## Our Solution

Leaked Key Playbooks provides structured, evidence-based, provider-specific response instructions. Each playbook covers the full incident response lifecycle:

```
Credential Exposure
       │
       ▼
  Identify Provider ──► Find Playbook
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
                Revoke    Investigate  Recover
                    │         │         │
                    └─────────┴─────────┘
                              │
                              ▼
                    Implement Prevention
```

---

## Key Features

- **Provider-specific playbooks** — Not generic advice. Exact steps for each provider.
- **Blast radius documentation** — Understand what each credential can access.
- **Revocation & rotation instructions** — With provider-specific commands and links.
- **Grace period documentation** — Know whether the old credential is still active.
- **Session persistence details** — Understand derived token behavior.
- **Investigation checklists** — Know exactly what logs to review.
- **Recovery guidance** — Step-by-step restoration and hardening.
- **Evidence-backed references** — Every claim links to official documentation.
- **Verification tracking** — Playbooks include last-verified dates and expire after 180 days.

---

## Supported Providers

| Category | Provider | Status |
|---|---|---|
| Cloud Infrastructure | AWS | ✅ Verified |
| Cloud Infrastructure | Google Cloud | ✅ Verified |
| Cloud Infrastructure | Microsoft Azure | 🔵 Planned |
| Cloud Infrastructure | Cloudflare | ✅ Verified |
| Source Control | GitHub | ✅ Verified |
| Source Control | GitLab | 🔵 Planned |
| AI & Developer APIs | OpenAI | ✅ Verified |
| AI & Developer APIs | Anthropic | 🔵 Planned |
| Payment & Financial | Stripe | ✅ Verified |
| Communication | Twilio | ✅ Verified |
| Communication | SendGrid | 🔵 Planned |
| Communication | Slack | 🔵 Planned |
| Database & Storage | Supabase | ✅ Verified |
| Deployment & Hosting | Vercel | 🔵 Planned |
| Deployment & Hosting | Railway | 🔵 Planned |

✅ Verified — Playbook available, based on official documentation  
🔵 Planned — Playbook in progress

---

## Repository Structure

```
leaked-key-playbooks/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── playbooks/
│   │   │   ├── page.tsx                # Playbook explorer
│   │   │   └── [provider]/
│   │   │       └── [credential]/
│   │   │           └── page.tsx        # Individual playbook
│   │   ├── providers/
│   │   │   └── page.tsx                # Provider directory
│   │   ├── response-guide/
│   │   │   └── page.tsx                # Emergency response guide
│   │   └── about/
│   │       └── page.tsx                # About page
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PlaybookCard.tsx
│   │   └── ui.tsx                      # Shared UI components
│   └── lib/
│       ├── types.ts                    # TypeScript interfaces
│       ├── playbooks.ts                # Playbook data
│       └── providers.ts                # Provider data
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── playbook-issue.md
│   │   └── new-provider.md
│   └── PULL_REQUEST_TEMPLATE.md
├── design.md                           # Design specification
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── LICENSE
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/your-org/leaked-key-playbooks.git
cd leaked-key-playbooks

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## How to Use

1. **Open the website** at [leaked-key-playbooks.vercel.app](https://leaked-key-playbooks.vercel.app) or run locally
2. **Search for your provider** using the search bar (`/` or `Ctrl+K`)
3. **Select the credential type** that was exposed
4. **Read the immediate response steps** — follow them in order
5. **Use the investigation checklist** to identify unauthorized access
6. **Follow recovery and prevention guidance** to restore security

---

## Playbook Structure

Each playbook follows a consistent structure:

```typescript
interface Playbook {
  provider: string;           // "AWS"
  credentialName: string;     // "Access Key"
  severity: SeverityLevel;    // "critical" | "high" | "medium" | "low"
  permissions: string[];      // What the credential can access
  exposureImpact: string[];   // Consequences of exposure
  immediateActions: {         // Numbered emergency steps
    order: number;
    title: string;
    description: string;
    command?: string;         // Copyable CLI command if applicable
  }[];
  revocation: string;         // How to revoke
  rotation: string;           // How to rotate
  gracePeriod: string;        // Whether old credential stays valid
  sessionPersistence: string; // Derived token behavior
  investigation: string[];    // What logs to review
  recovery: string[];         // Post-incident steps
  prevention: string[];       // How to prevent recurrence
  sources: Source[];          // Evidence references
  lastVerified: string;       // ISO date
  expiresAt: string;          // 180 days after lastVerified
}
```

---

## Evidence and Verification

Every factual claim in a playbook must be traceable to one of:

| Evidence Type | Description |
|---|---|
| `official-docs` | Official provider documentation |
| `security-advisory` | Provider security advisory or bulletin |
| `incident-report` | Documented real-world incident |
| `reproduction` | Independently reproduced behavior |

Playbooks expire 180 days after their last verification date. Expired playbooks are marked as stale and flagged for review.

---

## Contributing

Contributions from developers, security researchers, DevOps engineers, and incident responders are welcome.

### How to contribute

**Add a new provider playbook:**
1. Fork the repository
2. Add the provider to `src/lib/providers.ts`
3. Add the playbook to `src/lib/playbooks.ts` following the existing schema
4. Include sources linking to official documentation
5. Open a pull request with a description of the evidence used

**Fix an existing playbook:**
1. Open an issue describing what is incorrect or outdated
2. Link to the official documentation that contradicts the current content
3. Submit a pull request with the correction and updated `lastVerified` date

**Report an issue:**
- Use the [playbook issue template](.github/ISSUE_TEMPLATE/playbook-issue.md)
- Do not include real credentials or sensitive incident data in public issues

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## Security Policy

To report a security vulnerability in this project, do **not** open a public GitHub issue.

Email: security@example.com

See [SECURITY.md](SECURITY.md) for the full security policy.

**Never include real credentials, access tokens, or sensitive incident data in public issues or pull requests.**

---

## Roadmap

- [x] Initial provider playbooks (AWS, GitHub, Stripe, OpenAI, Cloudflare, Supabase, Twilio, GCP)
- [x] Structured playbook schema with TypeScript types
- [x] Searchable playbook explorer
- [x] Provider directory
- [x] Emergency response guide
- [x] Evidence and verification tracking
- [ ] Playbook expiration and stale detection automation
- [ ] Machine-readable JSON index for tooling integration
- [ ] GitHub Actions workflow for playbook validation
- [ ] Integration with secret scanner tools (truffleHog, gitleaks)
- [ ] Community review system for playbook accuracy
- [ ] Additional providers: Azure, GitLab, Anthropic, SendGrid, Slack, Vercel

---

## Frequently Asked Questions

**What is a leaked credential?**  
Any secret — API key, access token, password, webhook secret, database URL — that has been unintentionally exposed to unauthorized parties.

**Is deleting a leaked API key from GitHub enough?**  
No. Git history retains the credential. You must revoke it through the provider's official mechanism and purge it from git history using git-filter-repo or BFG Repo Cleaner.

**What is the difference between revocation and rotation?**  
Revocation disables the exposed credential. Rotation replaces it with a new one. Both steps are usually required.

**Can old sessions remain active after revocation?**  
Yes, depending on the provider. AWS STS temporary credentials, for example, remain valid until their own expiry even after the parent key is deactivated. Each playbook documents this behavior.

**Are the instructions verified?**  
Playbooks marked "Verified" are based on official provider documentation with a last-verified date. Provider behavior can change — always verify critical steps with official documentation.

**Does this project automatically revoke credentials?**  
No. This is an educational reference. It provides instructions for you to follow manually.

---

## Disclaimer

Leaked Key Playbooks is an educational security reference. It does not automatically detect or revoke leaked credentials. Provider behavior may change without notice. Always verify critical instructions with official provider documentation before taking action. This project does not replace professional incident response or security advice. Not affiliated with any listed provider.

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

Built by the open-source community. Contributions, corrections, and new playbooks are always welcome.
