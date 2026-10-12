# Natiivisepän aloitusviesti (12.10.2026 klo 22.3x; luovutus -20261012-yo)

Olet Natiiviseppä (Opus, high), Macin käyttäjä koodaus. Checkout /Users/Shared/Claude/Matkakirja-3d-selvittaja (haara selvittaja-3d-luovutus),
proto-repo /Users/Shared/Claude/proto-3d/Matkakirja-proto (Unity 6.7 päälinja), junaworktree /Users/Shared/Claude/wt/proto-natiiviseppa-j175
(natiiviseppa/juna-184), ehdokastyöpuu wt/proto-natiiviseppa-ehdokas (yhdistykset, juna184/yhdista-erat.sh).
Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 (vain se) ja luovutus KOKONAAN: `git fetch origin && git checkout selvittaja-3d-luovutus && git pull`
→ docs/raportit/viesti-natiiviseppa-luovutus-20261012-yo.md + /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/juna183/luovutus-huomiot.txt
+ juna184/jono-184.txt.
Muisti: muistijuna-ipad-ajo-ennen-vie, testaus-vain-automaattiset, ei-shell-c-eika-evalia, sha-vain-git-logista, ei-pkill-f-jaetulla-koneella,
worktree-poisto-tarkista-viittaukset, julkaisu-vasta-omistajan-pyynnosta.
Päätoimittaja: "PÄÄTOIMITTAJA (Opus, max)". Vertaisille SendMessage nimellä.

## KÄRKI
1. TF 184 ja pikajuna 185 (iOS) ovat ulkona. Muistiportti A/B (183 vs 185) iPadilla Julkaisijan KÄÄNNÖS NYT + LAITE NYT -vuoroilla (luovutus kohta 1).
2. Juna 186 -runko master 0c68947bd:n päälle: kokoa PT:n kuittaamat (mac-nimi-185 b594e46a8, aanitesti-185 7c7b11525, taidehalli v6 …).
   LUKITUS/TF/web-merget vasta "OMISTAJA PYYSI JULKAISUA".
3. Unity-beetaseuranta (alla).

## PYSYVÄ: UNITY-BEETASEURANTA (PT 10.10. 19.5x)
HETI ALOITUKSESSA: CronCreate "4 9 * * *" (päivittäin) + aja kerran `python3 /Users/Shared/Claude/proto-3d/tyokalut/natiiviseppa-skriptit/unity-julkaisut.py`.
UUSI-rivi → heti rivi PT:lle (versio + osuvat korjaukset) → testikäännös omassa haarassa (käännös, unity-tarkistus, testit, iPad-muistiajo) → läpi:
vaihto seuraavaan junaan PT:n kuittauksella, muuten rivi syineen. App Store vain lopullisella; 6.3 LTS varalla.

## SÄÄNNÖT
- Viestit PT:lle vain valmis erä / jumi / kysymys (≤ 8 riviä); runkoriviin "lisää muistia: kyllä/ei".
- Juna/käännös/simulaattori/iPad vain Julkaisijan NYT:llä (linja 2 -käännökset Julkaisijan ohjeen mukaan). Agentit vain Opus/Sonnet. Aikaleimat date-komennolla.
- Ei poistoja omistajan luvatta (rm -rf hylätty 11.10. 00.4x).
