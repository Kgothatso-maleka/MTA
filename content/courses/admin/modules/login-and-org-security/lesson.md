---
title: Login and Organization Security
examSection: config-setup
objectives:
  - 'Explain multi-factor authentication, password policies and session settings'
  - 'Tell login IP ranges on a profile from trusted IP ranges and login hours'
  - 'Describe single sign-on and connected apps at a high level'
  - 'Choose between field history tracking, Setup Audit Trail and encryption for a security need'
  - 'Layer org-level controls on top of profiles and sharing'
  - 'Respond to a suspected account compromise'
youtubeId: null
estMinutes: 35
prerequisites: []
---
## Start here: the building has an entrance, doors and cameras

The profiles lesson covered who may **open which doors inside** the building. This lesson covers the **entrance**: who may get into the building at all, how they prove who they are, and what the cameras record.

Security in Salesforce has layers. If one layer fails, the next still protects the data. The exam loves questions that ask "which layer fixes this?".

:::key-terms
- **MFA (multi-factor authentication)**: proving identity with more than a password, such as an authenticator app, a security key or a built-in biometric.
- **SSO (single sign-on)**: logging in with your company identity instead of a separate Salesforce password.
- **Login IP range**: on a **profile**, the IP addresses a user may log in from. Outside the range, login is **blocked**.
- **Trusted IP range**: on the **org** (Network Access), IP addresses where users are **not asked for identity verification**. It does not block anyone.
- **Login hours**: on a profile, the times of day a user may log in.
- **Session settings**: how long a session lasts and how it is protected.
:::

## Proving who you are

### Multi-factor authentication

Salesforce requires **MFA for every user who logs in to the user interface**. That is a contractual requirement, so you cannot simply switch it off. Common methods are the Salesforce Authenticator app, other authenticator apps, security keys, and built-in authenticators such as a phone's fingerprint. Users who sign in through **SSO** satisfy MFA through their identity provider.

### Password policies

Under **Setup > Password Policies** you set expiry, minimum length and complexity, how many old passwords are remembered, and how many wrong tries lock the account. A locked-out user can be **unlocked** by an admin.

### Single sign-on and connected apps

With **SSO** (often SAML) the company's identity provider proves who the user is, and Salesforce trusts it. A **connected app** is how an external application, such as a mobile app or integration, is allowed to connect to Salesforce. Admins control which users may use it.

## Where can they log in from?

Two settings sound alike, and the exam uses that:

| | **Login IP ranges** (profile) | **Trusted IP ranges** (org network access) |
|---|---|---|
| Effect | **Blocks** login from outside the range | **Skips identity verification** for users inside the range |
| Scope | Per profile | Whole org |
| Blocks anyone? | Yes | No |

**Login hours** on a profile block logins outside set times. Together these limit risk for sensitive roles, such as finance.

:::exam-trap
"Users must only be able to log in from the office network" is **login IP ranges on the profile**. Trusted IP ranges only reduce prompts and do **not** stop anyone logging in.
:::

## Session settings

You decide the **session timeout** (how long an idle session lasts before logging out), whether to lock a session to the **IP address** it started from, and whether to require **HTTPS**. Shorter timeouts reduce the chance that a stolen or unattended session is abused.

## What the cameras record: auditing tools

| Tool | What it shows | Remember |
|---|---|---|
| **Setup Audit Trail** | Setup and configuration changes | Last **180 days** |
| **Login History** | Logins, with IP and status | About **six months** |
| **Field history tracking** | Old and new values on chosen fields of records | Up to **20 fields per object** |
| **Event Monitoring** | Detailed activity such as who ran or downloaded reports | Paid add-on |

Standard field history is kept for around 18 months in the user interface. **Field Audit Trail** (a paid add-on) keeps it for years.

## Protecting data itself: encryption

- **Encrypted custom text fields** (classic): mask the field for most users. A limited option.
- **Shield Platform Encryption**: encrypts data at rest, including many standard fields and files. It is a paid add-on and has implications for search and some features, so plan before turning it on.

## Layering it all together

Think of a request to protect salary data:

1. **Login controls**: MFA, SSO, IP ranges.
2. **Object permissions**: who may read the object.
3. **Field-level security**: who may see the Salary field.
4. **Sharing**: which records they may see.
5. **Encryption**: protect the data at rest.
6. **Audit**: field history or Event Monitoring shows who changed or viewed it.

:::on-the-job
If an account might be compromised: **freeze the user**, reset the password and end sessions, check **Login History** and the **Setup Audit Trail**, review what the user could access, and report it to your security lead. Freeze first, investigate second.
:::

## Recap

- MFA is required for all UI logins. SSO satisfies it through the identity provider.
- Login IP ranges (profile) **block**. Trusted IP ranges (org) only **skip verification**.
- Login hours limit when a profile can log in.
- Setup Audit Trail = 180 days of setup changes. Login History = who logged in. Field history = up to 20 fields per object.
- Shield Platform Encryption is paid and encrypts data at rest.
- Security is layered: login, object, field, record, encryption, audit.
