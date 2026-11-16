import type { Provider } from "./types";

export const PROVIDERS: Provider[] = [
  { slug: "aws", name: "AWS", category: "Cloud Infrastructure", description: "Amazon Web Services cloud platform", docsUrl: "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html", securityUrl: "https://aws.amazon.com/security/", credentialCount: 1, status: "verified" },
  { slug: "gcp", name: "Google Cloud", category: "Cloud Infrastructure", description: "Google Cloud Platform", docsUrl: "https://cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys", securityUrl: "https://cloud.google.com/security", credentialCount: 1, status: "verified" },
  { slug: "azure", name: "Microsoft Azure", category: "Cloud Infrastructure", description: "Microsoft Azure cloud platform", docsUrl: "https://docs.microsoft.com/en-us/azure/security/", securityUrl: "https://azure.microsoft.com/en-us/overview/security/", credentialCount: 0, status: "planned" },
  { slug: "cloudflare", name: "Cloudflare", category: "Cloud Infrastructure", description: "CDN, DNS, and security platform", docsUrl: "https://developers.cloudflare.com/fundamentals/api/", securityUrl: "https://www.cloudflare.com/security/", credentialCount: 1, status: "verified" },
  { slug: "github", name: "GitHub", category: "Source Control", description: "Git repository hosting and collaboration", docsUrl: "https://docs.github.com/en/authentication", securityUrl: "https://docs.github.com/en/code-security", credentialCount: 1, status: "verified" },
  { slug: "gitlab", name: "GitLab", category: "Source Control", description: "DevOps platform with Git hosting", docsUrl: "https://docs.gitlab.com/ee/security/", securityUrl: "https://about.gitlab.com/security/", credentialCount: 0, status: "planned" },
  { slug: "openai", name: "OpenAI", category: "AI & Developer APIs", description: "GPT, DALL-E, and AI model APIs", docsUrl: "https://platform.openai.com/docs/guides/production-best-practices", securityUrl: "https://openai.com/security", credentialCount: 1, status: "verified" },
  { slug: "anthropic", name: "Anthropic", category: "AI & Developer APIs", description: "Claude AI model APIs", docsUrl: "https://docs.anthropic.com/", securityUrl: "https://www.anthropic.com/security", credentialCount: 0, status: "planned" },
  { slug: "stripe", name: "Stripe", category: "Payment & Financial", description: "Payment processing and financial APIs", docsUrl: "https://stripe.com/docs/keys", securityUrl: "https://stripe.com/docs/security", credentialCount: 1, status: "verified" },
  { slug: "twilio", name: "Twilio", category: "Communication", description: "SMS, voice, and messaging APIs", docsUrl: "https://www.twilio.com/docs/iam/credentials/api-key", securityUrl: "https://www.twilio.com/docs/usage/security", credentialCount: 1, status: "verified" },
  { slug: "sendgrid", name: "SendGrid", category: "Communication", description: "Email delivery and marketing platform", docsUrl: "https://docs.sendgrid.com/ui/account-and-settings/api-keys", securityUrl: "https://sendgrid.com/policies/security/", credentialCount: 0, status: "planned" },
  { slug: "slack", name: "Slack", category: "Communication", description: "Team messaging and collaboration", docsUrl: "https://api.slack.com/authentication/token-types", securityUrl: "https://slack.com/intl/en-us/security", credentialCount: 0, status: "planned" },
  { slug: "supabase", name: "Supabase", category: "Database & Storage", description: "Open-source Firebase alternative", docsUrl: "https://supabase.com/docs/guides/api/api-keys", securityUrl: "https://supabase.com/security", credentialCount: 1, status: "verified" },
  { slug: "vercel", name: "Vercel", category: "Deployment & Hosting", description: "Frontend deployment and hosting platform", docsUrl: "https://vercel.com/docs/security", securityUrl: "https://vercel.com/security", credentialCount: 0, status: "planned" },
  { slug: "railway", name: "Railway", category: "Deployment & Hosting", description: "Infrastructure deployment platform", docsUrl: "https://docs.railway.app/", securityUrl: "https://railway.app/security", credentialCount: 0, status: "planned" },
];

export function getProvider(slug: string): Provider | undefined {
  return PROVIDERS.find(p => p.slug === slug);
}

export function getProvidersByCategory(): Record<string, Provider[]> {
  return PROVIDERS.reduce((acc, provider) => {
    if (!acc[provider.category]) acc[provider.category] = [];
    acc[provider.category].push(provider);
    return acc;
  }, {} as Record<string, Provider[]>);
}
