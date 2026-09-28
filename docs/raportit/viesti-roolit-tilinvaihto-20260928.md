# Roolien aloitus tilinvaihdon jälkeen (Fable 28.9.2026 klo 07.0x)

Lue ensin oma aloitusviestisi ja luovutuksesi (polut alla), sitten oma osiosi tästä. Tämä täydentää niitä ja voittaa
ristiriidassa.

## Kaikille

- **Fablen uusi session id: local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31** (Opus xhigh). Vanha local_cf5b4eca… ja kaikkien
  roolien vanhat id:t ovat poissa; katso toisten roolien uudet id:t ListAgentsista tai tilataulusta (Postivahti päivittää).
- **TAUKO PURETTU.** Omistajan 27.9. klo 23.58 tauko koski tilinvaihtoa; nyt jatketaan luovutusten jonoista.
- **Yöpoltto** (ajo-20260927y, vaihe 2 syvä z9–z10) on 92 %:ssa, arvio valmis noin klo 07.20. Siihen asti yötauon säännöt
  (ei Unity-käännöksiä, ei simulaattoreita, ei PR-CI:tä Mac-ajurilla ilman julkaisulippua). Karttaseppä ilmoittaa
  Julkaisijalle, Natiivisepälle ja Fablelle, kun `aja.out` näyttää "2 koodi 0". Sen jälkeen PÄIVÄSÄÄNTÖ: poltot ja muut
  raskaat ajot enintään 4 ytimellä, käännökset yksi kerrallaan, simulaattoreita enintään 2 booted koko Macilla.
- Viikkokiintiö nollautui (0 %). Agentit vain Opus/Sonnet. Viestit Fablelle vain valmis erä, jumi tai kysymys (≤ 8 riviä).
- Kuittaa Fablelle yhdellä rivillä: rooli, uusi id ei tarvita (näen sen), jonon kärki.

## Postivahti (Sonnet) — Matkakirja-posti, haara postivahti

Aloitusviesti origin/postivahti:docs/raportit/viesti-postivahti-aloitus.md. Kierto 10 min kuten ennen. Päivitä tilatauluun
uudet session id:t (ListAgents). Seuraa polttoa: "2 koodi 0" → Karttaseppä + Fable. Kun poltto valmis ja Karttaseppä kuittaa,
juna-tauon lippu /tmp/matkakirja-juna-tauko poistetaan (Julkaisija tai Karttaseppä; sinä vain varmistat ettei se jää).

## Karttaseppä (Opus) — Matkakirja-karttaseppa, haara karttaseppa-tyo-20260922

Luovutus viesti-karttaseppa-luovutus-20260928.md (f8c92e5c8). Kärki: polton loppu → eheys → VIENTIKORTTI omistajalle Fablen kautta
(kokoa yhteenveto: mitä vienti tekee, luettelon yhdistäminen ampärin luettelosta, osoittimen vaihto, riskit; yksi suositus).
Sitten jokikorjaus 7337cc728 push + PR, polta-paikallisesti.sh ~r.2948 luettelovartion korjaus PR:na, pallo-osa (aja-pallo.sh)
päiväsäännöllä 4 ytimellä, jos se kuuluu yön suunnitelmaan.

## Julkaisija (Opus) — Matkakirja-julkaisija

`git checkout julkaisija-luovutus-20260928 && git pull`; lue viesti-julkaisija-luovutus-20260928-tilinvaihto.md KOKONAAN
(aloitusviesti 27.9. on vanha). Kärki polton jälkeen: juna-tauon purku, #3516 (laattavika) + #3517 (ihme-nappi) junaan kun
Pelikoodari ilmoittaa savukkeen ennen/jälkeen, #3514 (ROU) kun Sisältökirjuri kuittaa, #3519 (siivouskuvat) docs-PR.
Tarkista TF 1.0.34 -viennin What to test. Codexin miniatyyriluonnokset #3478–#3509 vain Fablen pyynnöstä.

## Natiiviseppä (Opus) — Matkakirja-3d-selvittaja, haara selvittaja-3d-luovutus

Aloitusviesti Fablen haarassa: `git show origin/claude/bold-ride-vow4ki:docs/raportit/viesti-natiiviseppa-aloitus.md` +
luovutus origin/selvittaja-3d-luovutus:docs/raportit/viesti-natiiviseppa-luovutus-20260928-p.md KOKONAAN.
TF 1.0.33 ja 1.0.34 (puhetagit) ovat valmiit. KÄRKI: ALOITUSLENTO v3 omistajan palautteesta (aloitusviestissä sanatarkasti).
Koodaa heti; käännös ja ajo omalla FBBD41D7:lla polton jälkeen (noin 07.20) → video rajattuna laitteen ruutuun, versio kuvaan
→ Fablelle polku. Sitten 1.0.35-juna: merget (ihme-nappi pois Natiivi-UI, lippu + symbolit Linssiseppä, erä 5 d35e9f2c, Kinderdijk
6cecf733, RAE/PATINA), natiivin varalaatan uudelleenhaku (sama perhe kuin webin #3516: pergamenttivaralaattaa Cesium ei hae
uudelleen → uusinta verkon palatessa / 8 s).

## Pelikoodari (Opus) — Matkakirja-pelikoodari, haara pelikoodari-tyo-20260923

Aloitusviesti + luovutus -20260927-f. Kärki polton jälkeen: #3516 WebKit-savuke ennen/jälkeen (kuvapari) → Julkaisijalle junaan;
#3517 savuke → junaan; sitten astronautin kameran web-osuus (omistajan toive 27.9. 23.5x, loki "ASTRONAUTIN KAMERA — ISS-KYYTI"):
sovi Linssisepän kanssa, web on malli; yksi mietitty suositus + kuvapari Fablelle.

## Linssiseppä (Opus) — Matkakirja-linssiseppa, haara linssiseppa-tyo-20260923

Aloitusviesti + luovutus -20260928-p (f34ef775b). Kärki: erä 5 laitekuvat, lippu + symbolit kuvaparit, astro-selain c5b073cd
(Fable hyväksyi: galleria jatkuu naapurikohteeseen, nimipilleri kirkastuu 1,2 s) kuvapari, sitten ISS-kyyti (omistajan sanatarkka
toive lokissa 27.9. klo 23.58). Käännökset polton jälkeen, yksi kerrallaan.

## Natiivi-UI (Opus) — Matkakirja-natiivi-ui, haara natiivi-ui-luovutus-m

Aloitusviesti + luovutus -20260927-aa (b81a9ba34). Kärki: nimet-laskuri 5d79edd9, ihmekuva natiiviin #3517:n speksistä
(ihme kortin ensimmäisenä kuvana, Koe ihme -nappi pois; web on malli) → merge-pyyntö Natiivisepälle 1.0.35-junaan.

## Siirtoseppä (Opus) — Matkakirja-siirtoseppa, haara siirtoseppa-luovutus

Aloitusviesti + luovutus -20260926 (cccc4ef9c). Kärki: E2E-offline Tanska + Kroatia omalla simulaattorilla F989814A polton jälkeen.

## Laitetestaaja (Sonnet) — Matkakirja-laitetestaaja, haara laitetestaaja-savukierros-b13

Aloitusviesti on 27.9. klo 18 — lue sen sijaan luovutus viesti-laitetestaaja-luovutus-20260928-d.md (69e062ad6) KOKONAAN.
Kärki polton jälkeen: BUILD 34 kohdat 4–5 (väliotsikon [long-pause], Pulun persoonatagi; ilman uutta xAI-kulutusta, ks. luovutus).
Sitten odota Natiivisepän 1.0.35-junan SHA:ta. Seurantakansiossa on 32 jäljittämätöntä tools/.natiivi-ui-b10-*.mjs-tiedostoa:
jätä ne, ne eivät kuulu committiin.

## Sisältökirjuri (Sonnet) — Matkakirja-sisaltokirjuri, haara sisalto-pelikatalogi-20260927

Aloitusviesti origin/sisalto-pelikatalogi-20260927 + luovutus -20260927-j KOKONAAN. FABLEN KÄSKYT (vastaukset aloitusviestisi
kysymyksiin):
1. #3514 ROU: kuittaa Julkaisijalle junaan, kun oma tarkistus on tehty.
2. CZE + HRV `pitka`-tekstit korjataan Livian nykyaikaääneen samalla tavalla kuin ROU (yksi PR per maa tai yhdessä).
3. Kronborgin nostoankkuri: js/…/nostoankkurit-dnk.js 12.7125 E → linnan kohdalle 12.62 E (tarkista koordinaatti Commonsista).
4. Omistajan päätös 27.9. 23.4x: ihmeet 14 maahan (AUT, NLD, CHE, DNK, SWE, SRB, BIH, ALB, MKD, MNE, CYP, MLT, MDA, BLR) ja
   historian hetket 1–2 per puuttuva Euroopan maa (js/packs/historian-hetket.js). Ehdota mielekkäät aiheet (tiedostoon), sitten
   Codex-tilaus postilaatikkoon (haara claude/postilaatikko, kansio posti/, kuten #3426). Aiheet Fablelle yhdellä viestillä ennen tilausta.
5. Sitten UKR-jono luovutuksen mukaan. Faktatarkistus: Wien/Madrid/Ateena ovat valmiit (vanha tieto); seuraavaksi
   Tukholma/Bukarest/Pietari/Lissabon/Sofia/Helsinki UKR-jonon jälkeen.
