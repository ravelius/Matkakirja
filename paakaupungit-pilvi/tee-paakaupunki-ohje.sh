#!/bin/sh
# Valmistelee pääkaupunkierän pilvisession (PILVIOHJE-paakaupungit.md luku 12), samalla mallilla kuin tee-pulu-ohje.sh:
# tekee haaran paakaupungit-<erä>-pilvi = origin/main + kansio paakaupungit-pilvi/ (ohje, tyokalu.mjs, erat.md)
# KOSKEMATTA työhakemistoon (väliaikainen indeksi) ja kirjoittaa kehotteen kehote-<erä>.md.
# Käyttö: sh tee-paakaupunki-ohje.sh e01 [--kuiva]   (--kuiva: ei pushia, tulostaa commitin)
# Käynnistys: sovelluksesta Uusi → Pilvi → Default (Network access = Full) → repo → Sonnet → kehote leikepöydältä
# (LC_ALL=en_US.UTF-8 pbcopy < kehote-<erä>.md), tai: claude --model claude-sonnet-5-5 --cloud "$(cat kehote-<erä>.md)"
set -e
ERA="$1"; KUIVA="$2"
[ -n "$ERA" ] || { echo "käyttö: $0 <erä, esim. e01> [--kuiva]"; exit 1; }
PAA=${PAA:-/Users/Shared/Claude/Matkakirja-fable}
S=${S:-$PAA/scratchpad/paakaupungit-pilvi}
IDT=$(sed -n "s/^ERÄ $ERA: //p" "$S/erat.md")
[ -n "$IDT" ] || { echo "erää $ERA ei ole erat.md:n koneluettavassa listassa"; exit 1; }
HAARA="paakaupungit-$ERA-pilvi"
node --check "$S/tyokalu.mjs"
git -C "$PAA" fetch -q origin main
if git -C "$PAA" ls-remote --exit-code -q origin "refs/heads/$HAARA" >/dev/null 2>&1; then
  echo "haara $HAARA on jo olemassa: jatkosessio tehdään haaraan $HAARA-b (ohjeen luku 10)"; exit 1
fi
TMP=$(mktemp -d)
GIT_INDEX_FILE="$TMP/index"; export GIT_INDEX_FILE
git -C "$PAA" read-tree origin/main
for f in PILVIOHJE-paakaupungit.md tyokalu.mjs erat.md; do
  B=$(git -C "$PAA" hash-object -w "$S/$f")
  git -C "$PAA" update-index --add --cacheinfo "100644,$B,paakaupungit-pilvi/$f"
done
PUU=$(git -C "$PAA" write-tree)
unset GIT_INDEX_FILE
rm -rf "$TMP"
C=$(git -C "$PAA" commit-tree "$PUU" -p origin/main -m "Pääkaupungit pilveen, erä $ERA: ohje, työkalu ja erälista")
if [ "$KUIVA" = "--kuiva" ]; then
  echo "kuiva ajo: commit $C ($(git -C "$PAA" diff-tree --no-commit-id --name-only -r "$C" | tr '\n' ' ')), ei pushattu"
else
  git -C "$PAA" push -q origin "$C:refs/heads/$HAARA"
fi
cat > "$S/kehote-$ERA.md" <<OHJE
Olet Matkakirja-pelin pääkaupunkisisällön tuottaja pilvessä. Repo ravelius/Matkakirja, haara $HAARA, erä $ERA: $IDT.

1) Hae haara: git fetch origin $HAARA && git checkout $HAARA. Työskentele vain tässä haarassa ja kirjoita vain kansioon paakaupungit-pilvi/$ERA/.
2) Lue kokonaan paakaupungit-pilvi/PILVIOHJE-paakaupungit.md (liite A vain, jos paakaupungit-pilvi/tyokalu.mjs puuttuu) ja noudata sitä sanatarkasti: <erä> = $ERA ja kaupungit tässä järjestyksessä: $IDT. Tee vaihe 0, jokaiselle kaupungille vaiheet A–F ja lopuksi RAPORTTI.md.
3) Agentit: Agent-työkalu, model "sonnet", effort "low". ENINTÄÄN 2 AGENTTIA RINNAKKAIN, ja Commons-kuvatyötä (vaihe B) tekee vain yksi agentti kerrallaan. Tarkistaja (vaihe D) on aina eri agentti kuin faktakokoaja ja kirjoittaja. Älä käytä Opusta.
4) Faktat vain lähteistä (Wikipedia, Wikidata, Commons; oppaan käytännön tietoihin Wikivoyage ja um.fi). Ei matkaoppaiden pyöreitä lukuja eikä anekdootteja ilman lähdettä; ristiriitaisissa vuosissa ja luvuissa "noin" tai "lähteiden mukaan". Ei nykypolitiikkaa eikä nykysotaa. Ei tarinakaanonia (isoisän merkinnät ja ääni kuuluvat Päätoimittajalle).
5) Commit ja push haaraan $HAARA jokaisen vaiheen jälkeen ja TILANNE.md ajan tasalle. Älä koskaan mergeä mainiin, älä avaa PR:ää, älä force-pushaa äläkä koske muihin haaroihin tai pelin tiedostoihin.
6) Lopuksi kirjoita paakaupungit-pilvi/$ERA/RAPORTTI.md ohjeen luvun 11 mukaan (mukaan agenttien tokenit yhteensä ja kesto). Commit ja push.

Älä kysy mitään äläkä jää odottamaan vahvistusta. Jos jokin estää, kirjaa se paakaupungit-pilvi/$ERA/TILANNE.md:hen, pushaa ja jatka seuraavaan kaupunkiin.
OHJE
echo "$S/kehote-$ERA.md"
