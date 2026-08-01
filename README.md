# Vice Games — Legal

Site GitHub Pages pour les documents Discord du bot **Vice Games**.

## Liens (sans `.html`)

- Accueil : https://legal.shvkt.xyz/
- **Conditions d'utilisation** : https://legal.shvkt.xyz/terms/
- **Politique de confidentialité** : https://legal.shvkt.xyz/privacy/

## Discord Developer Portal

- **Terms of Service** → `https://legal.shvkt.xyz/terms/`
- **Privacy Policy** → `https://legal.shvkt.xyz/privacy/`

## DNS — ton CNAME est correct

| Type | Nom | Valeur |
|------|-----|--------|
| **CNAME** | `legal` | `realshavkat.github.io` |

**Problème** : les nameservers publics du domaine sont encore **Vercel** (`ns1.vercel-dns.com`), pas LWS. Donc le panneau LWS n'est pas pris en compte.

### Option A — rester sur Vercel DNS (plus rapide)
Dans le dashboard DNS Vercel pour `shvkt.xyz`, ajoute :

| Type | Nom | Valeur |
|------|-----|--------|
| **CNAME** | `legal` | `realshavkat.github.io` |

### Option B — basculer les NS vers LWS
Chez le registrar, remplace les NS Vercel par :

- `ns21.lwsdns.com`
- `ns22.lwsdns.com`
- `ns23.lwsdns.com`
- `ns24.lwsdns.com`

Ensuite le CNAME LWS actuel fonctionnera.

Les anciennes URLs `…/terms.html` et `…/privacy.html` redirigent automatiquement.
