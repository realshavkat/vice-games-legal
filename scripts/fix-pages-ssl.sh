#!/usr/bin/env bash
# Re-trigger GitHub Pages Let's Encrypt provisioning for the custom domain.
# Works by bouncing the repo CNAME file (source of truth for project Pages domains),
# then optionally enabling HTTPS enforcement via the Pages API.
set -euo pipefail

DOMAIN="${DOMAIN:-legal.shvkt.xyz}"
REPO="${REPO:-realshavkat/vice-games-legal}"
WAIT_AFTER_REMOVE_SEC="${WAIT_AFTER_REMOVE_SEC:-90}"
WAIT_AFTER_RESTORE_SEC="${WAIT_AFTER_RESTORE_SEC:-30}"
CERT_POLL_ATTEMPTS="${CERT_POLL_ATTEMPTS:-24}"
CERT_POLL_INTERVAL_SEC="${CERT_POLL_INTERVAL_SEC:-30}"

echo "==> Target domain: ${DOMAIN}"
echo "==> Repository: ${REPO}"

if ! command -v git >/dev/null; then
  echo "git is required" >&2
  exit 1
fi

git config user.name "${GIT_AUTHOR_NAME:-github-actions[bot]}"
git config user.email "${GIT_AUTHOR_EMAIL:-github-actions[bot]@users.noreply.github.com}"

restore_cname() {
  if [[ ! -f CNAME ]] || ! grep -qx "${DOMAIN}" CNAME; then
    echo "${DOMAIN}" > CNAME
    git add CNAME
    if ! git diff --cached --quiet; then
      git commit -m "chore(pages): restore CNAME ${DOMAIN} after SSL reprovision"
      git push origin HEAD:main
      echo "==> CNAME restored"
    fi
  fi
}

trap restore_cname EXIT

if [[ -f CNAME ]]; then
  echo "==> Removing CNAME to reset Pages custom-domain binding"
  git rm -f CNAME
  git commit -m "chore(pages): temporarily remove CNAME to reissue TLS cert"
  git push origin HEAD:main
else
  echo "==> CNAME already absent; skipping remove step"
fi

echo "==> Waiting ${WAIT_AFTER_REMOVE_SEC}s for Pages to drop the old domain binding"
sleep "${WAIT_AFTER_REMOVE_SEC}"

# Clear trap before intentional restore so we don't double-commit.
trap - EXIT
restore_cname

echo "==> Waiting ${WAIT_AFTER_RESTORE_SEC}s before certificate checks"
sleep "${WAIT_AFTER_RESTORE_SEC}"

cert_matches_domain() {
  local san
  san="$(
    echo | openssl s_client -connect "${DOMAIN}:443" -servername "${DOMAIN}" 2>/dev/null \
      | openssl x509 -noout -ext subjectAltName 2>/dev/null || true
  )"
  grep -q "${DOMAIN}" <<<"${san}"
}

echo "==> Polling for a certificate that includes ${DOMAIN}"
approved=0
for ((i = 1; i <= CERT_POLL_ATTEMPTS; i++)); do
  if cert_matches_domain; then
    echo "==> Certificate OK (attempt ${i}/${CERT_POLL_ATTEMPTS})"
    approved=1
    break
  fi
  echo "    not ready yet (${i}/${CERT_POLL_ATTEMPTS}); sleeping ${CERT_POLL_INTERVAL_SEC}s"
  sleep "${CERT_POLL_INTERVAL_SEC}"
done

if [[ "${approved}" -ne 1 ]]; then
  echo "==> Certificate not observed yet. DNS is fine; GitHub may still be issuing."
  echo "    Re-run this workflow in a few minutes, or in the repo:"
  echo "    Settings → Pages → remove/re-add « ${DOMAIN} » → Enforce HTTPS"
  exit 1
fi

if command -v gh >/dev/null; then
  echo "==> Enabling HTTPS enforcement via Pages API (best effort)"
  if gh api --method PUT "repos/${REPO}/pages" -F https_enforced=true >/dev/null; then
    echo "==> https_enforced=true"
  else
    echo "==> Could not set https_enforced via API (needs admin). Enable it manually:"
    echo "    Settings → Pages → Enforce HTTPS"
  fi
else
  echo "==> gh not available; enable Enforce HTTPS manually in Settings → Pages"
fi

echo "==> Done. Verify: https://${DOMAIN}/"
