# Fablen luovutus 24.9.2026 klo 14.5x (tili B, sessio 10.52 → 14.5x)

Edellinen: viesti-fable-luovutus-20260924-b.md. Kaikki päätökset lokissa docs/raamattu-loki/paatokset-2026-09.md
klo 10.52 → 14.4x (~110 otsikkoa). Raamattuun lisätty tänä sessiona: ANSAINTA (peli ilmainen, rahaa vain
lisätoiminnoista, ei avoin lähdekoodi), DATALINSSIT (lisenssit, jakoehto, datatilit), TAIDEMUSEO-LINSSI +
ESITYSMOOTTORI (sali/pallo-lavat), ALOITUKSEN TEKSTIT NATIIVISSA (aloitusruutu ennallaan → pallo Lontoo-zoomissa +
avausluenta → ulos-zoomi + pulu → valinta keskeyttää; lennolla flightFirst + lento-alku), NATIIVIN iPHONE-ASETTELU
(Liiku läpinäkyvä, laukkuryhmä kaksi pilleriä, ☰ = linssivalikko, ☰ yläosa kaksi riviä: 3 äänitogglea / Uusi peli,
Muut (paneeli päälle), Kehittäjä; kartan sumennus kuvien aikana KAIKILLA laitteilla), LENNON PINTA (satelliittikuva
lennolla, lähtösumu), LENNON KARTTA JA MAAMERKIT (viivat piiloon, punaiset pisteet, 1 maamerkki/kaupunki), kamerakulmat
(etuviisto/sivu, ei takaa), lähikuva 2/3 ruudusta, VU-mittari natiiviin, TestFlight-vienti -nographics (ei
konsolinvaihtoa), Työtilat/LEVY (worktreet < 20, lokit poistetaan 2 vrk, ei NAS-kopioita). Muistio:
claude-kayttajakohtainen-asennus.md.

## Build-tila
- Build 7 = 1.0.0 (202609241135), proto 24c9194, TestFlightissa klo 14.42. Omistaja kokeilee; löydökset numeroidaan 25…
- Build 8 kootaan (Natiiviseppä): testi/b8 (varalaatta-uusinta, uusi DC-3, lento-kohde) + iphone-island (Natiivi-UI:
  20–24, kartuscha 8d042a2, ☰ kaksi riviä fb9618e, äänentasot Asetuksiin, iPad-sumea) + lento-kartta 7dd1baa (sileä
  pinta, usva, reittikaari pois, pisteet) + radio-moottori cca4797 (VU AVAudioEngine) + Pelikoodarin c8c4831 +
  siivous-lokit 47cc21f + erät 2/3/5 jos vakaita. SHA → Laitetestaaja ajaa B7-listan (PR #3059) → Julkaisija build.
  Unity-vienti toimii nyt -nographics-lipulla (#3071 mainissa); Unity-editori kiinni viennin ajan.
- Build 9+: satelliittipinta (Karttasepän koeajo + arvio odottaa), maamerkit Lontoo+Ateena, elokuvalennon erä 4.

## Omistajan avoimet kortit / odottaa
- Lupakirjeet (docs/raportit/datalahteet-lupakirjeet-20260924.md, päivitetty ilmaiseksi peliksi) omistajan lähetettäväksi.
- Claude Code käyttäjäkohtaiseksi (koodaus + samireivinen): ohjeet omistajalle illalla kun sessiot luovutettu (muistio).
- Julkinen TestFlight-linkki: kortti kun build 7/8 kokeiltu. Isoisä 1873 erä 2 myöhemmin.

## Sessiot (10) ja id:t
Julkaisija (Opus) local_9922c4b6 (konteksti 35 %), Natiiviseppä local_860f922b (nollattu 13.22), Pelikoodari
local_7b5a6c65-e4fd-4142-b21f-e12089f5b417 (nollattu 14.36; RC päällä), Natiivi-UI local_9ed5a7df, Linssiseppä
local_3273f209 (nollattu 12.18), Siirtoseppä local_7a1255c5, Karttaseppä local_445a5c7b (nollattu 14.39),
Sisältökirjuri local_e5685e4a, Laitetestaaja local_992b689f (nollattu 13.13), Postivahti local_6f3d4c35.
Nollauksia tänään 17. Nollauskaava: sessio kutsuu clear_session self samassa vuorossa luovutuksen jälkeen; Fable
tarkistaa list_events = 0 (tai Postivahti get_usage < 10 %) ja lähettää aloitusviestin send_message-työkalulla
session id:llä (nimi ei ole heti käytettävissä). Luokittimen estämä set_remote_control → Fable kytkee session id:llä.

## Roolien tila
- Linssiseppä: museo-/esitysmoottorisuunnitelma valmis (00f4dc195; Fablen päätökset 1–4 lokissa 13.06), Natiiviseppä
  tarkistaa luvut 6–7; Huippuvuoret-tarkistus (#3030 tuotannossa); piikkiajo 8 build 8:sta; datalinssit vasta
  pariteetin ja build-kokeilun jälkeen (Maapallon tila -suunnitelmaan NOAA STAR).
- Sisältökirjuri: sää valmis (14 PR), galleria 3/46, ennenNyt 35/46 (#3069), turistiopas ohitettu, kohdekartat 12
  kaupungille 1–3 kohteella piste.teksti-polulla (erät 5/PR); N2–N6:n 20 kaupunkia mergen jälkeen.
- Siirtoseppä: 1.x v40 + 2.0 v1 ämpärissä; siirtoseppa-avausluennat odottaa #3057 (mergessä); natiivin 2.0-vaihto
  omana buildina.
- Karttaseppä: satelliittisarja (Blue Marble Z0–7 PD + Sentinel-2 2016 CC BY Z8–11 kaupungit, EOX-ehdot) — koeajo,
  koko ja aikataulu Fablelle ennen täyttä ajoa; E28 klo 22; poltto-työkansiot NAS:iin; PR karttaseppa-pallokerma.
- Julkaisija: jono #2898 → #2932, #3057, #3070, #3072; #3038 pidossa; siivoa-levy.sh (proto 47cc21f) Natiivisepän
  mergeen; Opus kunnes nightly 25.9. klo 04 ajanut → Sonnet.
- Pelikoodari: topografialinssin web-savuke 52/54, sitten merge-pyyntötiedoston jono; 10 viestin raja → tiedosto.
- Postivahti: kontekstit 70 %, 5 h -kiintiö (90 % → tauko; nollautuu 16.20 UTC+3 = 19.20), levy (88 Gt), wt/ < 20 (nyt 46).

## Levy ja ympäristö
- Omistaja ajoi siivoa-lokit-appdata.sh (8 Gt). Lokit poistetaan 2 vrk:n jälkeen (siivous-lokit), ei NAS-kopioita.
- Blender 5.2.1 LTS koneella; leivonta vain CPU:lla taustatilassa (Metal kaatui). Playwright-selaimet
  ~/Library/Caches/ms-playwright (CLAUDE.md korjattu).
- Mac Studio: Claude appi ja CLI yhteisiä → käyttäjäkohtaiseksi illalla (ohjeet omistajalle); Blender/Unity/Xcode/brew
  yhteisiä, päivitys vain yön ikkunassa.

## Jono uudelle Fablelle
1. Omistajan build 7 -löydökset → numeroi 25…, välitä, kirjaa.
2. Natiivisepän build 8 -SHA + kuvat (lähtö sumun läpi, matka, lasku, ☰-valikko) → Laitetestaaja B7-lista → Julkaisija
   build 8 (Unity kiinni viennin ajan; -nographics).
3. Karttasepän satelliittiarvio → hyväksy koko/aikataulu (yöajo), sitten Natiiviseppä kytkee (build 9).
4. Natiivisepän tarkistus museosuunnitelman luvuista 6–7 → hyväksy suunnitelma; toteutus vasta pariteetin ja
   elokuvalennon jälkeen.
5. Illalla: sessioiden luovutukset → Claude Code -asennusohjeet omistajalle (muistio claude-kayttajakohtainen-asennus).
6. Julkisen TestFlight-ryhmän kortti kun build 8 on kokeiltu. Nightly 25.9. klo 04 → Julkaisija Sonnetiin.
