# Pelikoodarin luovutus 28.9.2026 klo 09.3x (kontekstin nollaus)

Jatkoa luovutukselle `-20260927-f`. Fable = local_8d8ebf72-60f5-4fde-8625-6a8084d0bc31 (session id:llä), Julkaisija
NIMELLÄ/`uds`-osoitteella viestin mukaan. Tarkista PR:t: `gh pr list --author @me --state all --limit 20`.

## 1. JUNASSA / JULKAISIJALLA (Fable kuitannut)

| PR | Versio (junassa numeroidaan) | Tila |
|---|---|---|
| #3516 karttalaatat | v2351, f6e4b82b0 | Kaatui junassa (3 testiä) → korjattu: moduulitason `addEventListener?.` (tynkäikkunat), aikajana-regex 1600→2600, pohjan-uusinta. Sarja ilman sisaltopaketti-testiä 4431/0 (sisaltopaketti pyöri 12 min, ei liity). Julkaisijalle ilmoitettu. Fable hyväksyi (a): ilman visuaalista kuvaparia, koska WebKit-savuke ei toista oiretta ENNEN-versiossa; JÄLKEEN 5 % → 25 virhelaattaa, 23 uusittu, aukot 0. |
| #3517 ihme kuvana | v2350 | Junaan (kuvaparit `proto-3d/lokit/ihme-kuvana/`). |
| #3526 astronautin kuvaselain | v2352 | Junaan. Suorakaide korjattu: reunavarjo/valoreuna `clip-path: circle(50%)` + sumu piiloon kuvan ajaksi; savuke 24/24. |
| #3528 katkaisija | v2353 | Junaan. 3 peräkkäistä + ei onnistumista 5 s:iin; tausta ei laske; paluu näkyviin purkaa. 25 %: aukot 0/72 (#3516 yksin 64/72). |
| #3532 kulmanauha | v2354 | Odottaa Fablen kuittausta. Nauha 0×0 → 93×93 / 184×184, asettelu ennallaan (`--nauha-kuva` + ResizeObserver, ei mittasäiliötä eikä pohjustusta). |

Main eteni aamulla useasti (v2348 #3514, v2349 #3521, v2350 #3524) → Julkaisija numeroi junassa; järjestys 3516 → 3517 → 3526 → 3528 → 3532.

## 2. VALMIS, PR KUN #3526 ON MAINISSA

**Selite-erä** haara `pelikoodari-astro-selite` f9bc7c9a6 (#3526:n päällä). Omistaja 28.9. sanatarkasti: *"Astro Linssissä pitää
pienentää tuo selittelen palkki kun se on Pienennetty. Tee siitä yleinen tapa. Se on jo matkakirjassa. Eli animoitu pienennys
mahdollisimman tiiviiksi."* + *"Tee selitteelle myös striinilukija joka automaattisesti päällä"* (Raamattu PR #3527).
- `js/tiivistys.js` animoiKoko (FLIP, 250 ms); kelattu runko virran ulkopuolelle → selite 315 → 157 px.
- Inventaario (Sonnet): astroselite on linssien ainoa pienennettävä; Matkakirjan `.fact-card.pieni` tekee jo omansa.
- Selite luetaan `lueAaneen(… { sailio: 'astro-selite' })`, kun `luentaKytkinPaalla()`; vaihtuu kuvan mukana, loppuu suljettaessa.
- Savuke `savuke-astro-kuvaselain.mjs` 28/28; kuvaparit + video `proto-3d/lokit/astro-selite/` (selite-kuvapari-*, selite-pienennys-iphone.mp4).
- Tee: rebase mainiin kun #3526 mergetty → versio → PR → Fablelle rivi. Natiivi perässä (Linssiseppä astro, Natiivi-UI muut).

## 3. KESKEN: STRIIMILUKIJAN VALIKKO (haara `pelikoodari-striimilukija` f6df0975b, pushattu, EI PR:ää)

Omistaja 28.9. SANATARKASTI: *"Voisiko kaikkiin striimi lukija nappeihin tehdä pillerin jossa olisi nykyiset kaksi kuvaketta ja
keskelle lisäksi hampurilainen jossa olisi kaikki tekstin kappaleet klikattavissa sitä varten että jos kuulija haluaa hypätä
johonkin kohtaan sekä alimpana -10sek ja +10sek sekä kappale eteen ja taakse napit kelaukseen. Taaksepäin napit vierekkäin omalla
puolella ja eteenpäin napi toisella. Siirretään itseasiassa hammaspyörä nappi tähän samaan mini hampurilaiseen sisälle niin sitten
ylös jää nätisti vain kaksi nappia eikä pilleriä tarvita."* Fablen tulkinta: ei pilleriä; kaksi nappia (kaiutin + mini-hampurilainen);
valikko: kappalelista (nykyinen korostettuna, napautus hyppää) → kelausrivi (vas. kappale taakse + −10 s, oik. +10 s + kappale eteen)
→ hammaspyörän sisältö; hammaspyörä pois; pehmeä avaus, sulkeutuu ulos napauttamalla. Natiivi perässä (Natiivi-UI).

**Tehty:**
- `js/puhe.js`: `siirryAika(±s)` (palarajojen yli, `kestot[]`, soitaPala ohittaa offsetin osien yli) ja `siirryKappaleeseen(k)`; `tests/puhe-kelaus.test.mjs` 3/3.
- `js/lukija.js`: vanha ohjauspaneeli (avaaOhjain) ja säätöratas (varustaKortinSaatimet/avaaKortinSaadot) POISTETTU; `varustaLukijanValikko`
  kaikkiin kaiuttimiin (liitaLukija), `avaaValikko`, `kohdistaValikkonappi` (absoluuttisen kaiuttimen vasemmalle, mitattu pystykeskitys;
  rivikaiuttimen perään), `sovitaValikko` (leikkaavan esivanhemman rajoihin), kaiutin = toisto/tauko kaikkialla (kortinPainallus),
  VU-kaaret kaikkialla, koristerivit piiloon listasta, `ajossa.kohdat`.
- `css/styles.css`: `.lukija-valikkonappi`, `.lukija-valikko`, `.lukija-kappaleet`, `.lukija-kelaus*`; vanhat paneeli/ratas-säännöt pois.
- `tests/lukija.test.mjs` päivitetty; lukija+kuuntelu+kelaus 50/50.
- Savuke `tools/savukkeet/savuke-lukijan-valikko.mjs` (WebKit iPhone+iPad, Olympian kortti + Lontoon lehti, sävel-WAV-tynkä): viimeisin 21/22 →
  tauko-väite tehty ehdolliseksi (luenta ehti loppua iPadilla) — AJA UUDELLEEN. Kuvat `proto-3d/lokit/lukijan-valikko/` (ennen = ratas auki).

**Kesken / tee seuraavaksi:**
1. Aja savuke uudelleen (odotus 22/22) + koko testisarja (`node --test` ilman sisaltopakettia jos se jumittaa) + `tests/sw.test.mjs`.
2. Tarkista muut luentakohdat kuvina: nähtävyysikkuna (rivikaiutin otsikon perässä → valikkonappi perään), wiki, nosto, tarina,
   eläinkortti, tiedeliite (ylanapit-rivi, `js/tiedeliite.js:804` poistaa `.lukija-nappi` → valikkonappi jää orvoksi? tarkista).
3. Lehden otsikkorivillä on jo sivuvalikon hampurilainen vasemmalla — mini-hampurilainen kaiuttimen vieressä; kerro Fablelle kuvaparissa.
4. Vanha `savuke-lukijan-seuranta.mjs` ohittaa itsensä (tasokartta) mutta viittaa paneeliin → päivitä tai merkitse.
5. Versio (main + junan jälkeen), PR, kuvapari/lyhyt video Fablelle, speksi Natiivi-UI:lle (web on malli).

## 4. MUUT

- Kulmanauha #3532 odottaa kuittausta; ISS-kyyti: Linssisepän suositus `origin/linssiseppa-tyo-20260923:docs/raportit/iss-kyyti-suositus-20260928.md`
  kuitattu, web natiivin kuvaparin jälkeen samoilla luvuilla + SGP4 (satellite.js vendoroituna).
- Worktreet: jäljellä `wt/pelikoodari-laatat-katoavat` (#3516) ja `wt/pelikoodari-striimilukija`; muut poistettu (levy). Proto-worktreet poistettu (mergetty).
- Opit: (1) inline-size-mittasäiliö nollaa fit-content-napin; (2) WebKit piirtää radial-gradientin neliön ympyrän ulkopuolelle → clip-path;
  (3) kopioitu `translateY(-50%)` ei keskitä eri kokoista nappia → keskitä mittaamalla; (4) laattasavukkeen kuvaero vaatii saman asettelun,
  25 %:n injektio laukaisee katkaisijan; (5) usea täysi testiajo rinnakkain (muut roolit) → yksittäinen ajo >10 min.
