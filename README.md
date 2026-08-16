# Vice Studio · Legal & invite

Site GitHub Pages pour **Vice Studio** : choix d’invitation (**Vice Music** / **Vice Games**) et documents légaux partagés par **tous les bots Vice**.

## Liens

- **Accueil / Invite** : https://legal.shvkt.xyz/
- **Conditions d'utilisation** : https://legal.shvkt.xyz/terms/
- **Politique de confidentialité** : https://legal.shvkt.xyz/privacy/

## Discord Developer Portal

À coller pour **chaque** bot Vice (Music, Games, …) :

- **Terms of Service** → `https://legal.shvkt.xyz/terms/`
- **Privacy Policy** → `https://legal.shvkt.xyz/privacy/`

## DNS

| Type | Nom | Valeur |
|------|-----|--------|
| **CNAME** | `legal` | `realshavkat.github.io` |

Pas de proxy CDN (ex. Cloudflare « orange cloud ») : DNS uniquement, sinon GitHub ne peut pas émettre le certificat Let's Encrypt.

Les anciennes URLs `…/terms.html` et `…/privacy.html` redirigent automatiquement.

## HTTPS / certificat SSL

Si le navigateur affiche `SSL_ERROR_BAD_CERT_DOMAIN` et que le certificat présenté est `*.github.io` (au lieu de `legal.shvkt.xyz`), le DNS est bon mais **GitHub Pages n’a pas provisionné** le certificat du domaine personnalisé (`https_enforced` reste à `false`).

### Correctif automatique

1. Merger cette branche sur `main` (le workflow `Fix Pages SSL certificate` se lance tout seul), **ou**
2. Actions → **Fix Pages SSL certificate** → *Run workflow*.

Le job retire puis restaure le fichier `CNAME` pour forcer une nouvelle émission Let's Encrypt, puis active **Enforce HTTPS** si le token le permet.

### Correctif manuel (Settings)

1. Repo → **Settings** → **Pages**
2. Supprimer le domaine personnalisé, enregistrer
3. Attendre ~1 minute
4. Remettre `legal.shvkt.xyz`, enregistrer
5. Attendre la coche verte du certificat, puis cocher **Enforce HTTPS**

En local (compte avec droits admin sur le repo) :

```bash
bash scripts/fix-pages-ssl.sh
```
