# Security Policy

## Reporting a Security Vulnerability

If you discover a security vulnerability in this project, **do not open a public GitHub issue**.

Please report it privately by emailing: **security@example.com**

Include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes

You will receive a response within 72 hours. We will work with you to understand and address the issue before any public disclosure.

## Scope

This project is a static frontend application with no backend, no authentication, and no user data storage. The primary security concerns are:

- Incorrect or misleading playbook content that could cause harm if followed
- Dependency vulnerabilities
- Content injection in the UI

## Out of Scope

- Social engineering attacks
- Physical security
- Issues in third-party services linked from playbooks

## Important Note on Credentials

**Never include real API keys, access tokens, passwords, or any sensitive credentials in:**
- GitHub issues
- Pull requests
- Code comments
- Documentation

Use synthetic example credentials only (e.g., `AKIAIOSFODNN7EXAMPLE` for AWS key format examples).

## Supported Versions

We maintain the latest version of the main branch. Security fixes are applied to the main branch only.
