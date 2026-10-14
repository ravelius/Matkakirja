#!/bin/bash
# PT:N SALLINNAT JA HOOKIT TAKAISIN (Päätoimittaja 14.10.2026, kylmäkäynnistystesti 2; docs/tilinvaihto.md kohdat 0.0 ja 6).
# Omistajan yksirivinen lohko (Päätteessä):  bash /Users/Shared/Claude/Matkakirja-fable/tools/tyotavat/palauta-sallinnat.sh
# Kopioi peilin mallin tools/tyotavat/settings.local.json.malli PT:n checkoutin .claude/settings.local.json:ksi, jos ne eroavat.
# Vanha tiedosto talteen .claude/settings.local.json.ennen-<pvm>. Ei koske gitin seurattuun versioon commitissa (älä committaa).
MALLI="$(cd "$(dirname "$0")" && pwd)/settings.local.json.malli"
KOHDE=/Users/Shared/Claude/Matkakirja-fable/.claude/settings.local.json
[ -f "$MALLI" ] || { echo "Mallia ei ole: $MALLI"; exit 2; }
python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$MALLI" || { echo "Malli ei ole JSONia"; exit 2; }
if [ -f "$KOHDE" ] && cmp -s "$MALLI" "$KOHDE"; then echo "Sallinnat jo ajan tasalla."; exit 0; fi
[ -f "$KOHDE" ] && cp "$KOHDE" "$KOHDE.ennen-$(date +%Y%m%d-%H%M)"
mkdir -p "$(dirname "$KOHDE")"
cp "$MALLI" "$KOHDE" && echo "Sallinnat palautettu: $KOHDE (käynnistä PT:n sessio uudelleen, jotta hookit latautuvat)."
