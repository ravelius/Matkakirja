# Linnanrakentajan luovutus 18.10.2026 klo 11.3x (Opus) – PT: luovutus ennen 35 %

Edellinen: `viesti-linnanrakentaja-luovutus-20261018-aamu2.md` (4a3ef6835). Viestit AINA send_messagella session id:llä
(`/Users/Shared/Claude/osoitekirja.md`); PT:lle enintään 3 riviä, polut absoluuttisina.
Proto-työkopio: `/Users/Shared/Claude/wt/proto-linnanrakentaja-kehykset`, jossa on useita haaroja. Tarkista `git branch --show-current`; nyt `linnanrakentaja/yhdistetty-202`.

## ENSIN: yksi käännös 3b92c73bd → simu → arkit PT:lle

- **Haara:** proto `linnanrakentaja/yhdistetty-202` **3b92c73bd** (peili natiivi-backup/peili/proto/linnanrakentaja/yhdistetty-202). Sisältö:
  - Louvren sali v2k → v2l → **v2m** (sali.json glb.kansio `sali-v2m/`, ämpärissä 11.02)
  - pienoismallit (Big Ben ilman radiota, napautus = Lontoon kaupunkipiste, Big Ben siirretty SiirtoX/Y 0,25/0,8, Matterhorn seepia)
  - kehykset **v8**
  - LS:n kaarikaidekorjaus a585d7092
  - VS:n louvre-pilotti 3abdabee9 (päivänvalo + Pulu)
- **Testit:** tarkista 0, Museo 183/183, Kehys 30/30, Ranska 9/9, Kartta 508/508.
- **Käännös:** JU kääntää L1:llä ~11.36 → valmis ~12.00 → `_tyo/linnanrakentaja/louvre-v2k-202-app/Matkakirja3D.app`. JU ilmoittaa sha:n ja antaa SIMU NYT -merkin.
- **Simu:** taustalla `zsh /Users/Shared/Claude/proto-3d/tyokalut/linnanrakentaja-ajot/ajo-yhdistetty-202b.zsh <app>` (kehykset v8 iPhone + pienoismallit iPad). Sen jälkeen JU:lle "SIMU VAPAA".
  - VS (tai seuraaja) ajaa Louvren parit samasta appista.
  - `V2K=1` lisäisi Louvren salikuvat, mutta ennen-appi kehysmuoto-202 on poistettu.
- **Kuvat:** `/Users/Shared/Claude/proto-3d/lokit/todistus-yhd202b-*/kuvat` (+ kuva-arkki.png).
  1. **Pienoismallit:** uusi arkki → `_valmiit/kartan-pienoismallit-v1/ARKKI-7-…png` → PT.
     - Arkki 6: Edinburgh, Istanbul ja Grimeton ovat PT:n hyväksymiä.
     - Tarkista, että Big Ben ei enää ole pallon ja laatan alla. Jos on, säädä BigBenSiirtoX/Y KaupunkiPallot.cs:ssä.
     - Tarkista, erottuuko Matterhorn. Malli on yhä leveä (x −54…55), joten jos se näkyy pienenä, kavenna päähuippua tai skaalaa malli.
  2. **Kehykset v8:** `python3 /Users/Shared/Claude/proto-3d/tyokalut/linnanrakentaja-ajot/kolmikko_v7.py <v5-kuvat> <v8-kuvat> <oikea> <ulos> <ulos2>`.
     - v5-kuvat: `/Users/Shared/Claude/proto-3d/lokit/todistus-kehysmuoto-202-iphone-20261018-0916/kuvat`
     - oikea: `_valmiit/louvre-kehykset-201/kehysmuoto-202/oikea-louvre-salle904-sivupalkki.png`
     - Kuvatiedostot ovat nimeltään v8-*. Kopioi kolmikko_v7.py → v8 ja vaihda nimet `v6-koko/v6-lahi/v6-lahi-kirkas` → `v8-koko/v8-lahi/v8-lahi-syva`.
     - Kolmikko PT:lle; KK:lle (local_febfd152-…) vasta, kun v8 näyttää hyvältä (PT: "ei KK:lle ennen v8:aa").
- **NS:lle** (Natiiviseppä) PT:n hyväksynnän jälkeen yhdistetty-202 kokonaisena.

## Tehty tänään 09.4x–11.3x

- **Louvren sali (refejen mukaan):**
  - **v2k:** GG:n nauha ja pyöreät istuimet, SE:n kaarikaide ilman keskipenkkiä, SC verrière 10 m. Törmäyksessä kaarikaide on 11 ohuena lohkona, ja seinäkaiteilla ei ole törmäystä.
  - **v2l:** SE:n lasikatto ruudukolla ja kehyksellä; kaarikaide ohuilla jaloilla.
  - **v2m:** kuilu 0,15 m (ruudukko reunaan asti) ja vaalea kalanruotoparketti. PT on hyväksynyt v2m:n (r03).
  - Kaikki paketit ovat ämpärissä: `_valmiit/taidemuseo-ranska-v2{k,l,m}-vienti-20261018`.
  - Lähteet ja generaattori: `_tyo/linnanrakentaja/louvre-pilotti-v2k/` (lahde/ranska.py, runko/lahde/sali_blender.py, lokit/aja_v2m.zsh).
  - Esikatselut: `_valmiit/louvre-pilotti-v2k-202/`.
- **Kehykset:**
  - **v7** (c70933e2b): sumennus 2,5 px + helminauha, kohouma 4 mm, kullansävyinen Fresnel-reuna (`_KultaYmp`, Louvren kulta), kirkas sisäreuna (`kulta_kirkas`).
  - **v7:n simu b40151727:** siniset juovat poistuivat, mutta veisto valui ja kulta näkyi vaalean beigenä. Kuvat: `_valmiit/louvre-kehykset-201/kehykset-v7-202/`.
  - **v8** (c7cd47dff): sumennus 1 px ja kulta 225/190/110. QA vertaa syvää 210/170/90 ja v7:n sävyä.
  - **Avoin:** veistospinnan lähikuvassa näkyy vaakasauma kesken sivupalkin (jakson sauma?). Katso v8-lahi.
- **Pienoismallit:** arkki 6 (b40151727) `_valmiit/kartan-pienoismallit-v1/ARKKI-6-pienoismallit-b4015172.png`; korjaukset 5b58adc83.
- **Siivous:** nappula-pehmea-202-app ja kehysmuoto-202-app on poistettu. Jäljellä ovat kehykset-v6-202-app (tyhjä), louvre-v2k-202-app ja pienoismallit-202-app (vanha 15bff8bb, voi poistaa).
  - Poistotyökalu (ei rm): python-skripti, joka sallii vain polut `_tyo/linnanrakentaja/*-app`. Malli on istunnon scratchpadissa; kirjoita uusi tarvittaessa.

## Opit

- **Yksi käännös:** PT haluaa yhden käännöksen useamman sijaan (levy). Yhdistä haarat ensin ja anna JU:lle yksi sha. Käynnissä olevaa Unity-käännöstä ei tapeta.
- **Kaiteen törmäys:** MuseoKierros tulkitsee ohuen (< 0,25 m) esteen teoksen edessä kaiteeksi. Seinien kaiteet ilman törmäystä; kaaret ohuina lohkoina.
- **Valovahti:** varjostimen float3-vakio tulkitaan väriksi. Luminanssipainoille kirjoitetaan rivikommentti `// valopoikkeus: syy`.
- **Arvio vain kuvasta:** v7:n "korjaukset" heikensivät kuvaa. Tarkista simukuvasta ennen KK:ta ja kerro heikkoudet PT:lle suoraan.
