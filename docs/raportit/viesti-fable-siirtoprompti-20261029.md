# Siirtoprompti tilinvaihtoon (PÄÄTOIMITTAJA 29.10.2026 klo 12.55; omistaja 12.53: "tee siirtoprompti toiselle tilille")

Vanha tili: sami.reivinen@vvi.fi (org ddaee6a2), viikko 97 %, nollautuu su 2.11. klo 03; sen taulu R6VQFTUNq629zSzah719Uy.
UUSI TILI: omistajan valitsema. Uusi PT katsoo tilin rivin ja taulun scratchpad/asemataulu/osoitteet.md:stä (Artifact list: jos
tilillä on jo taulu, read + publish samaan osoitteeseen; muuten publish uutena ja rivi taulukkoon).
Käytännön lista: docs/tilinvaihto.md kohdat 0.0–8 (kotikansiot 1.5, OHJEIDEN KOE kohdassa 8); VOIMASSA OLEVA ARVO voittaa.
Pohja: viesti-fable-siirtoprompti-20261026.md (sama rakenne, toimi hyvin 26.10.).

## 0. Vaihdon järjestys (vanhalla tilillä) – TILA 12.55
1. Kaikki aktiiviset roolit luovuttivat ja pushasivat 10.1x (viikkoraja): PK 5576/5578, NS 5574, NUI 5573, JU 5572, KS 5577,
   SK 5575, LR 5579/5580 (+ PT:n lisäykset 70–71: 5581/5582). Sen jälkeen: PK c71caf75d (5 muistokuvaa), NS runko ed61246ba.
2. Kotikansioiden kuiva-ajo 12.5x: 12 kansiota PÄIVITETTÄISIIN (vain haaran vaihto), JÄLJESSÄ: Matkakirja-aanittaja (2 tiedostoa),
   -laitetestaaja (55 tiedostoa), -posti (likainen työpuu, Postivahdin oma; tunnettu poikkeus) ja -siirtoseppa (levossa).
   Uusi PT ajaa `zsh tools/paivita-kotikansiot.sh --aja --uusi-haara`, kun vanhan tilin sessiot ovat pysähtyneet, ja kuiva-ajon uudelleen
   ENNEN roolien luontia. Äänittäjän ja Laitetestaajan JÄLJESSÄ-kansiot: älä pakota; kirjaa ja ohita (roolit levossa).
3. PT:n keskustelu tallennettu: /Users/Shared/Claude/keskustelut/Paatoimittaja-2026-10-29-klo-0728-1157.md. KK tallentaa omansa.
4. PT:n luovutus: viesti-fable-luovutus-20261029-1015.md + tämä tiedosto (kohta 3 on uusin tila).

## ODOTTAA OMISTAJAA (KK näyttää tämän omistajalle yhtenä viestinä)
- Vaihda Claude-sovellus uudelle tilille ja avaa uusi sessio kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, medium), liitä kohdan 1 viesti.
- Kirjaudu Chromessa claude.ai:hin ja puhelimen Claude-sovellukseen samalla uudella tilillä (Asemataulu ja ilmoitukset).
- Jos uusi PT pyytää sallintoja: `bash /Users/Shared/Claude/Matkakirja-fable/tools/tyotavat/palauta-sallinnat.sh`

## 1. Ensimmäinen viesti uuden tilin PÄÄTOIMITTAJA-sessioon

> Olet PÄÄTOIMITTAJA (Opus, medium), Matkakirjan päätoimittaja. Nimeä session nimeksi "PÄÄTOIMITTAJA (Opus, medium)".
> Checkout /Users/Shared/Claude/Matkakirja-fable. Aja git fetch origin. ENNEN MUUTA lue: tuotannonohjauksen osio 0
> (git show origin/main:docs/tuotanto/tuotannonohjaus.md), oma rivisi `node tools/raamattu-luku.mjs 7.47`, tämä tiedosto
> (git show origin/main:docs/raportit/viesti-fable-siirtoprompti-20261029.md) KOKONAAN, PT:n uusin luovutus KOKONAAN (git log,
> viesti-fable-luovutus-*) ja docs/tilinvaihto.md (kohdat 0.0–8 ja VOIMASSA OLEVA ARVO). Sitten
> set_remote_control self true. HETI sen jälkeen luo KESKUSTELUKANAVA (Opus, max, kansio Matkakirja-fable, start_session, irrotettuna)
> aloitusviestillä "Olet KESKUSTELUKANAVA (Opus, max). Lue ensin `node tools/raamattu-luku.mjs 7.47` (oma rivisi) ja
> /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/aloitus.md ja toimi sen TILINVAIHTO-kohdan mukaan."
> Omistaja puhuu vain KK:lle. Tarkista kuiva-ajolla, että kotikansiot ovat ajan tasalla (tilinvaihto.md 1.5) ENNEN roolien luontia.
> Luo roolisessiot kohdan 2 mukaan, kytke Remote Control kaikille, päivitä id:t (`node tools/tyotavat/paivita-idt.mjs … --kirjoita`),
> käynnistä odottajavahti ja Codex-postivahti (kohta 4) ja ota tämän tilin Asemataulu käyttöön (osoitteet.md, tietokanta tiedostoista
> scratchpad/asemataulu/data/talo/*.json). EI jonokierros-cronia. Lopuksi OHJEIDEN KOE (7.47) ja `node tools/tyotavat/tilinvaihto-valmis.mjs`;
> kumpikin läpi ennen riviä KK:lle. Jatka kohdasta 3. Älä kerro omistajalle teknisiä yksityiskohtia.

## 2. Roolit (luodaan ne, joilla on jonoa)
Aloitusviesti kullekin: "Olet <Rooli> (<malli, effort>). Aja git fetch origin. ENNEN MUUTA lue tuotannonohjauksen osio 0
(git show origin/main:docs/tuotanto/tuotannonohjaus.md) ja oma LUE ALOITTAESSA -rivisi (`node tools/raamattu-luku.mjs 7.47`),
sitten oma uusin luovutuksesi (MEMORY.md, Rooli-tilaraportit; tarkista git logista) ja jatka. Päätoimittajan session nimi on
PÄÄTOIMITTAJA (Opus, medium). Jos sait vanhoja PT:n viestejä, ne on jo tehty." Mallit ja kansiot: /Users/Shared/Claude/osoitekirja.md.

| Rooli | Luo heti? | Seuraava työ (tarkista roolin luovutuksesta) |
|---|---|---|
| Postivahti, Asemataulu | kyllä | normaali kierros; nollaukset Postivahti; taulu tämän tilin osoitteeseen |
| Julkaisija | kyllä | merget, ämpärivienti PT:n kuittauksella; drone m:n simuajo PK:lle; LR v66 -paketin vienti |
| Natiiviseppä | kyllä | juna 214 runko ed61246ba (vihreä); seuraavaksi LR v66 omana eränään; KS SSE 0c14f6d80 odottaa pienen iPadin mittausta |
| Pelikoodari | kyllä | drone m 284cfe49e simu (JU) → Sonnet → KK; lautaspoyta-ehja.glb-polku (maailma-v4 → aarteet799-v4); LR:n kysymys t-portti-120:n materiaalinimistä |
| Lavastaja | kyllä | luovutuksen lisäys 69: v66 (KK:n v123-palaute: 02 katto kapeammaksi, 05 muuri ja aukko korkeammiksi) → parit 02 + 05 KK:lle → paketti_v66.py; sitten lisäykset 70–71 (lattialaatat, reunakivet, kivijalan kivet, omistaja 11.02/11.04) |
| Karttaseppä | kyllä | saumapari ja rakennusten sävytys (luovutus 5577) |
| Natiivi-UI | kyllä | suurennuslasi: puistojen ja metsien nimet Vedet ja vuoret -kytkimeen |
| Sisältökirjuri | kyllä | muut Euroopan maat (Bosnia ja Hertsegovina ym.); TUR/RUS odottavat rajaratkaisua |
| Valoseppä | ei | odottaa rakennuksia (valo vasta niiden jälkeen, omistaja 27.10.) |
| Laitetestaaja, Linssiseppä, Projektiseppä, Työkaluseppä, Äänittäjä | ei | levossa |

## 3. Tila 29.10. klo 12.55
- Juna 214 AUKI, runko ed61246ba vihreä 2217/761/573: kuja 05 (pk7 + LR v65, ämpärissä), t-portti-424:n aukko, rikottujen yhteenveto
  (omistaja 08.21–11.52: vain rikotut, 14 historiatekstiä, näkymä, 5 uutta muistokuvaa). Julkaisu, lukitus ja TF VAIN omistajan pyynnöstä.
- TF 213 testaajilla (iOS 28.10. 22.16, Mac 29.10. 08.21; omistaja hyväksyi Applen PLA:n 08.12).
- Drone (omistaja 07.57 "sopiva"; alku ja loppu korjataan; Raamattu 2.177 voimassa): drone m 284cfe49e odottaa simua → Sonnet → KK →
  junaan 214 omana eränään vain puhtaana. Harmaa lattia 117,7–121,8 s = t-portti-120 ilman tekstuuria (LR, v66).
- Kuja 02 leveys ennallaan (peli +4,9 % havainteesta, omistajan 07.26 tavoitteen sisällä); kuja 02 ja 05 omistajalle yhdellä kortilla v66:n jälkeen.
- SK:n aluetekstit kaikki mainissa (5499–5570); Euroopan pysäkkimaat valmiit paitsi TUR/RUS.
- Asemataulu (vanhan tilin R6VQ): junat v209, tyolista v242, työn alla 14; tiedostot scratchpad/asemataulu/data/talo/*.json ajan tasalla.
- Levy ~40 Gi. PT:n checkoutin .git pack 5,9 Gt (repack 08.41).
- Lokiin 29.10.: kuja 02 (07.26), drone (07.57, PR 5544), rikotut (PR 5554, 5567, 5583).

## 4. Ajastukset uudessa sessiossa
- Monitor "python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py", timeout_ms 1800000, uudelleen joka vanhenemisella.
- Monitor "bash /Users/Shared/Claude/hooks/codex-posti-vahti.sh", timeout_ms 1800000, uudelleen; postilaatikon fetch heti.
- EI jonokierros-cronia.
