# Pablo De La Cruz — Portfolio

A public portfolio for selected work across AI systems, data engineering,
developer tooling, and technical education.

## Public boundary

- Represents independent work and publicly documented experience.
- Keep public positioning employer-neutral.
- Must not include an upcoming employer, confidential role, onboarding details,
  employer-owned work, client information, private repositories, or credentials.
- Public projects must be linked only through their public URLs.

## Content model

Edit `app/content/projects.ts` to add or reorder entries. Give each a status,
a concrete engineering question, and public source with revision-pinned
evidence. An entry without public source links directly to its public artifact
instead. Only add a demo after its page resolves to the expected project; a published
page is not a stability certification. Never put internal links in this list.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm test
```

The test builds the site, verifies the rendered portfolio content and social
metadata, and checks that targeted confidential-role wording is absent.

## Hosting

The project is configured for OpenAI Sites through `.openai/hosting.json`.
