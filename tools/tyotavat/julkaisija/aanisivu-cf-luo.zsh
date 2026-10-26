#!/bin/zsh
# Äänisivun Cloudflare Pages -projekti + Access-suojaus (Julkaisija 10.10.2026, omistajan kortti 18.2x).
# Järjestys: projekti (tyhjä) → Access-sovellus → tarkistus 302 → vasta sitten sisältö (aanisivu-julkaise.zsh).
set -eu
source ~/.zshrc >/dev/null 2>&1
P=${1:-matkakirja-aanet}; EMAIL=samireivinen@gmail.com
A=https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID
H=(-H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json")
r=$(curl -s "${H[@]}" "$A/pages/projects/$P")
if ! echo $r | python3 -c 'import json,sys;sys.exit(0 if json.load(sys.stdin).get("success") else 1)'; then
  r=$(curl -s -X POST "${H[@]}" "$A/pages/projects" -d "{\"name\":\"$P\",\"production_branch\":\"main\"}")
fi
SUB=$(echo $r | python3 -c 'import json,sys;d=json.load(sys.stdin);assert d.get("success"),d.get("errors");print(d["result"]["subdomain"])')
echo "projekti $P → $SUB"
IDP=$(curl -s "${H[@]}" "$A/access/identity_providers" | python3 -c 'import json,sys;print([p["id"] for p in json.load(sys.stdin)["result"] if p["type"]=="onetimepin"][0])')
apps=$(curl -s "${H[@]}" "$A/access/apps" | python3 -c "import json,sys;print(' '.join(a['id'] for a in json.load(sys.stdin)['result'] if a.get('domain')=='$SUB'))")
if [ -z "$apps" ]; then
  body=$(python3 -c "
import json
print(json.dumps({'name':'Matkakirjan äänet','type':'self_hosted','domain':'$SUB',
 'destinations':[{'type':'public','uri':'$SUB'},{'type':'public','uri':'*.$SUB'}],
 'session_duration':'720h','allowed_idps':['$IDP'],'auto_redirect_to_identity':True,'app_launcher_visible':False,
 'policies':[{'name':'Vain omistaja','decision':'allow','include':[{'email':{'email':'$EMAIL'}}],'precedence':1}]}))")
  curl -s -X POST "${H[@]}" "$A/access/apps" -d "$body" | python3 -c 'import json,sys;d=json.load(sys.stdin);assert d.get("success"),d.get("errors");print("access-sovellus",d["result"]["id"],d["result"]["domain"])'
else echo "access-sovellus on jo: $apps"; fi
