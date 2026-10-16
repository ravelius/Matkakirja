# Sisältökirjurin luovutus 17.10.2026 yö (Postivahdin kova raja 36 %)

Rooli, checkout (/Users/Shared/Claude/Matkakirja-sisaltokirjuri), agenttisäännöt (vain Opus/Sonnet) ja muistutukset kuten edellisessä luovutuksessa
(`git show 586edabf5:docs/raportit/viesti-sisaltokirjuri-luovutus-20261016-ilta.md`). Viestit AINA `send_message` (parametri `session_id`) id:llä
(osoitekirja /Users/Shared/Claude/osoitekirja.md): PT local_5df52e10-10e4-4b72-9554-0049db300dfe (≤ 3 riviä, yksi rivi per PR), Natiivi-UI local_44392b3c-86ee-4873-9d76-82f9aaa6b832,
Linssiseppä local_771b401b-80a3-4ada-a0d9-d17c6cb9c2c4, Äänittäjä local_16ee69c8-b917-4dcd-9060-3542c5e03e67, Postivahti local_a24c43c0-8094-4141-b734-90b9555f5044.
Uusi haara aina `git switch -c <nimi> origin/main`. Docs-PR: `gh pr create`, odota ~6 s, `gh pr merge N --squash --admin`. Proto-gitiin (Matkakirja-proto) EI kirjoiteta: omistajat Linssiseppä/Natiivi-UI/Natiiviseppä; toimita docsiin + viesti.
Agenttien kuvien katsonta toimii (Read-työkalu); Commons API:lla ladataan kuvat scratchpadiin.

## Valmista tässä vuorossa (kaikki mainissa)
- **Puyin lapsuuden faktapohja 1912–1918** #4725 (docs/kohtaukset/juoksupeli/puyi-lapsuus-faktat.md; ~120 [EPÄVARMA], vain merkinnätön kelpaa peliin).
- **Dynastiat-linssin 19 tarinariviä** #4724 (docs/kohtaukset/kiinan-dynastiat/tarinarivit-20261016.md + huomiot Karttasepälle).
- **Äänisivun Tekstit-osasto** päivitetty ja julkaistu (Bratislava, Tirana, Zagreb korjattu; tilarivit "ei omistajan rastia"; varmuuskopio index.html.ennen-tekstit-paivitys-20261016b); Äänittäjälle tieto. Reykjanes ISS070: Gateway yhä "SQL failed", Commons/NASA 0 osumaa (#4729).
- **Museon i-kortin data** (omistajan päätös 21.51, juna 197): docs/kohtaukset/museoteokset/ — taiteilijat.json (40 PD/CC0-muotokuvaa, kuvat/*.jpg 256², 14 tekijälle null), lyhyt-alankomaat.json 64/64 + lyhyt-ranska.json 51/51 (12 pehmennettyä "Museon mukaan"), korjatut-tekstit-20261016.json (12 kertoja-/kuvatekstikorjausta, 6 uusintaäänitystä Äänittäjälle), raportti docs/raportit/museoteokset-ikortti-20261016.md. PR:t #4732, #4733, #4736.
- **Pariisin museon avausteksti** (omistaja 23.35/23.53): nimi "Louvre", Orsay + Rodin saleissa; docs/kohtaukset/museoteokset/pariisi-museo-teksti.json (#4739, #4741); Linssiseppä vei proto-gitiin 259bdbecb (luonnos true, ääni tyhjä; Pariisin houkutinta ei lisätty, kaupunkipallo peittäisi, LS kysyi PT:ltä).
- **Ranskan kohdat.json** (i-napin ympyrät): docs/kohtaukset/museoteokset/kohdat-ranska.json, 51 teosta / 152 ympyrää, luonnos=true, raportti docs/raportit/ranska-kohdat-20261017.md (#4743). Ohje tyokalut/ohje-kohdat.txt (6 Sonnet-agenttia rinnakkain ~10 min). Puheen merkkimäärä 17 456 (otsikko+teksti 20 065) > ~10 000 mrk lupa → PT:lle ilmoitettu, KK:n kortti ennen ääniä.

## AVOINNA seuraajalle
1. Ranskan kohdat: PT hyväksyy luonnoksen; sitten Natiivi-UI/LS vie Resources/Museo/ranska/kohdat.json:iin. Äänet vasta KK:n kortin jälkeen (Äänittäjä).
2. Äänittäjä uusii 6 Ranskan kohtakertomusta (korjatut-tekstit-20261016.json, aanitys_uudelleen=true): louvre-rf-2346, orsay-rf-2735, orsay-rf-2449, orsay-rf-1976, louvre-rf-1938-51, louvre-rf-1158. Natiivi-UI vaihtaa 3 kuvatekstiä (RP-P-OB-616, RP-F-00-565, RP-F-K89497) omaan teokset.json:iinsä.
3. Reykjanes ISS070 -kuva: yritä uudelleen kun Gateway toimii (docs/kohtaukset/iss-yotaivas/tulivuoret-astro/LAHTEET.md).
4. Euroopan seuraavien pääkaupunkien esittelyt: EI auki (PT 16.10.: Varsova, Tallinna, Sarajevo, Vaduz eivät läpäisseet 3D-laatua).
5. PR #4685 (web-pack fin/swe/ukr): Julkaisijan lukituksessa; tarkista `gh pr view 4685`.

## Huomiot
- Committoimaton: .claude/settings.local.json.* ja .wrangler/ (ei omia, jätä).
- `gh pr checkout` epäonnistuu likaisella työpuulla; käytä `git switch -c … origin/main` + omat tiedostot.
- Muotokuvat: vain PD/CC0, tunnistus oltava varma (Hals, Vermeer, Ruisdael, Cuyp, Hobbema ym. ilman kuvaa). Kuva-ala ja kasvot: Apple Vision -skripti scratchpadissa (kasvot.swift) – ei repossa.
