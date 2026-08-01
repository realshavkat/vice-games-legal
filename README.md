# Vice Games — Legal

Site GitHub Pages pour les documents Discord du bot **Vice Games**.

## Domaine

- **Production** : https://legal.shvkt.xyz/
- CGU : https://legal.shvkt.xyz/terms.html
- Confidentialité : https://legal.shvkt.xyz/privacy.html

Fallback GitHub : https://realshavkat.github.io/vice-games-legal/

## DNS à créer chez ton registrar (`shvkt.xyz`)

| Type | Nom / Hôte | Valeur | TTL |
|------|------------|--------|-----|
| **CNAME** | `legal` | `realshavkat.github.io` | Auto / 3600 |

Notes :
- Chez certains registrars, le nom s’écrit `legal.shvkt.xyz` ou seulement `legal`.
- Ne mets **pas** de `https://`, juste `realshavkat.github.io`.
- Propagation : souvent 5–30 min, parfois jusqu’à 24–48 h.

### Option alternative : racine `shvkt.xyz` (apex)

Si tu préfères `https://shvkt.xyz` au lieu du sous-domaine `legal` :

| Type | Nom | Valeur |
|------|-----|--------|
| **A** | `@` | `185.199.108.153` |
| **A** | `@` | `185.199.109.153` |
| **A** | `@` | `185.199.110.153` |
| **A** | `@` | `185.199.111.153` |
| **AAAA** | `@` | `2606:50c0:8000::153` |
| **AAAA** | `@` | `2606:50c0:8001::153` |
| **AAAA** | `@` | `2606:50c0:8002::153` |
| **AAAA** | `@` | `2606:50c0:8003::153` |

Puis dis-le-moi pour changer le fichier `CNAME` du dépôt.

## Discord Developer Portal

Après DNS + HTTPS OK :

- **Terms of Service** → `https://legal.shvkt.xyz/terms.html`
- **Privacy Policy** → `https://legal.shvkt.xyz/privacy.html`
