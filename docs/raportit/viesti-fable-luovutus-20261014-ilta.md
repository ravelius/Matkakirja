# Päätoimittajan luovutus 14.10.2026 klo 20.5x (oma nollaus 65 %)

Rakenne: PÄÄTOIMITTAJA (Opus, medium) local_74630a27-8c1b-4ac3-9143-538efab8cbcd orkestroi; KESKUSTELUKANAVA (Opus, max) local_593b89a1-2514-4d74-b956-2a73db862382 on omistajan kanava (KYSYMYS <tunnus> sinne). Osoitteet /Users/Shared/Claude/osoitekirja.md. Keskustelu tallessa: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-14-klo-1400-2054.md.

## 0. Heti aluksi
1. set_remote_control self true. 2. CronCreate `7,27,47 * * * *` "JONOKIERROS (Päätoimittaja): lue ja toteuta tiedoston /Users/Shared/Claude/Matkakirja-fable/scratchpad/jonokierros-teksti.md kohdat 0–10 sellaisenaan" (kohta 9b = Codex-posti joka kierros). 3. Monitor `python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py` 30 min, uudelleen joka vanhenemisella (ODOTTAA → ArtifactData set talo/toimi-*; JATKUU → delete; EI PushNotificationia). 4. Asemataulu EekZDPMuAcsjT3awvn4jPb, omat dokumentit scratchpad/asemataulu/data/talo/{junat,tyolista}.json (if_version). 5. Lue docs/tilinvaihto.md (VOIMASSA OLEVA ARVO).

## 1. JUNA 190 – omistaja pyysi julkaisua ehdolla (13.41), ILMAN TESTEJÄ JA MUISTIAJOA (20.1x)
Kaikki ehdot kuitattu paitsi: **taidemuseon askeleet (parketti + salikaiku kuten "iso sali kaiulla") ja sellot (adagio + moderato + Äänittäjän 3 uutta Moderaton asetuksilla)** – Pelikoodari kytkee, Äänittäjä generoi 3 uutta (omistajan lupa, suoraan peliin). Kuittaa PK:n videosta äänellä → NS lukitsee (runko 086129137+), muutosloki #4595 (251 merkkiä), web #4588 + #4593 → Julkaisija TF → rivi Keskustelukanavalle. Asemataulun junarivin tila: "TestFlightissa arviolta noin klo 22.15" – päivitä.

## 2. JUNA 191 (kertyy, kuitattu)
NUI aloitusnimi 9d93e518d, lippu-vaisto fb5354b4d; LS1 Ateena v6 + Praha v5 (8753ce800), Lontoo v5 (Greenwich; violetti puu Googlen oma, ok); PK Lontoo 10 km + nosto pelaajille 7333b589e (muistiajo ok); Siirtoseppä raketti-valo-191 e823b3bf2. Työn alla: Valoseppä valaan roiske v7 847f95d90, Kaupungintalo v3b + Eiffel v2b Google-parit, Tower Bridgen kummut; LS1 museon kertojan kohdat kaikkiin (SK:n 37 + Ranska 51 kertomusta/69 kohtaa; tiedot häipyvät zoomissa ac3357f96:n päällä); Äänittäjä Ranskan 51 kertomusta (William) + ÄÄNILÄHTEET-inventaario; NUI luettavuuskierros oikealla kartalla; LR Allymes-lähdevalmistelu (ei mallinnusta).

## 3. Raamattu / loki
- PR #4596 (fable-aanilahteet, b7df2ae9d): äänilähteet + Max Q lokiin, ei muistiajoa ilman testejä, tyhjäkäyntivahti, TYÖTAVAT AINA RAAMATTUUN, silmukka-/vahtilista, tilinvaihto (docs/tilinvaihto.md, tools/tyotavat/ peili + peili.sh, docs/aloitusviestit/), KK:n rajat. CI ajossa → MERGE kun vihreä, worktree pois. Raamattu ~460356/460800 t.
- KIRJAA SEURAAVAKSI (omistaja 20.48 ja 20.51, sanatarkasti Keskustelukanavan viesteissä): (a) KK nollataan vain omistajan kortin Kyllä-vastauksella; heti nollauksen jälkeen set_remote_control + Artifact open Asemataulu; NOLLAUS.md:hen syy RC:n katkaisuun (clear_session ei tyhjennä RC-sessiota). (b) TF-arvio Asemataulun junarivin tila-kenttään, kun sisältö lukittu ja jäljellä olevien töiden kesto arvioitu; päivitä muuttuessa. (c) RAAMATUN LÄPIKÄYNTI (#4596:n jälkeen): Opus-agentti kartoittaa aiheet/päällekkäisyydet/ristiriidat → yksi voimassa oleva kohta per aihe, historia lokiin, osioittain omina PR:inä; lopuksi KK ajaa kylmäkäynnistystestin.
- Odottaa omistajaa (KK:lla): CLAUDE.md-rivi docs/tilinvaihto.md:lle (suositus kyllä); .claude/settings.local.json gitissä vanha (omistajan toimi); Italian sali (suositus: ei vielä).
- Selvitettävää: Olavinlinna-vahti ei käynnissä; natiivi-bundle-LaunchAgent exit 128; Julkaisijan effort osoitekirja high vs Raamattu medium.

## 4. Codex
Posti 8e3bf535b: Peking 6/6 tavoitekuvaa hyväksytty → mallikierrokset käynnissä (rajat IoU ≥ 90 %, korkeus max(1 m, 5 %), ΔE00 ≤ 12). Petřín K1 hylätty (torni 85 % korkeudesta, tavoite 40 %; tasanteet 20/51 m) → K1 v2, yksi kerrallaan. Tarkista posti joka kierros (git log origin/claude/postilaatikko, uudet codex-fable-*).

## 5. Levy
~71 Gi. Kun < 80 Gi: `SIIRRA_IKA_H=2 nice -n 15 python3 -I siirra-ika.py lokit --vain <nimet>` (scratchpad/levy; EI natiiviseppa-*). Kasvu tulee testiajojen sovelluskopioista lokit-kansioon.

## 6. Opit
- Kuvat aina täydellä tarkkuudella; sanallinen "OK" roolilta ei riitä (valas meni 5 kierrosta, Kuu "TELE" oli väärä nimi).
- Ääni: kuittaa vain pelin omasta ääniraidasta, ei jälkimiksauksesta.
- Omistajan äänisivun valinnat ensin `node scratchpad/aanisivu-valinnat.mjs --nyt`, ennen kuin sanot "odottaa omistajaa".
- Agentit: Opus/Sonnet; pitkät Raamattu-työt agentille, Raamatun 450 kt raja vaatii tiivistystä.

## 7. LISÄYS 20.5x (luovutuksen jälkeen)
- PK museo-aanet-190 97fbe1638 (parketti + salikaiku, 5 selloa, askelten taso nostettu): video pelin ääniraidalla ~21.05 → kuittaa → NS lukitsee junan 190.
- Omistaja 20.53 (sanatarkasti): "Tuon juna 189 pitäisi olla jo nimetty TF koska se on perillä. TF:n alle voi laittaa junan saapumis ajan" → tehty: rivi "TF 189", tila "TestFlightissa (saapui 14.10. klo 10.28)". Kirjaa työtapana Raamattuun yhdessä TF-arvion kanssa: perillä oleva juna = "TF N" + saapumisaika; lähestyvä juna = "Juna N" + arvio kun sisältö lukittu.
- settings.local.json (KK 20.53): seurattua tiedostoa EI päivitetä gitissä (leviäisi kaikkiin checkouteihin); kopio peiliin tools/tyotavat/ + palautusohje docs/tilinvaihto.md:hen. Peilaa myös KK:n /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md (päivitetty 20.5x). Lisää molemmat tools/tyotavat/peili.sh:hon.
- KYSYMYS CLAUDE.MD omistajalla kortilla; KK ajaa kylmäkäynnistystestin 2 (b7df2ae9d).
