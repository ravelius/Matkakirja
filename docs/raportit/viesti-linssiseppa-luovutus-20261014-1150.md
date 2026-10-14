# Linssisepän luovutus 14.10.2026 klo 11.50 (NOLLAUS, PT:n pyyntö, konteksti 63 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/ (ketju `ajo-<nimi>.zsh`,
Julkaisija antaa `kaannos-<nimi>.nyt` / `simu-<nimi>.nyt`; yöllä saman apin uusinnan simu-lipun saa luoda itse, kun simuja < 2). Irrotus perl setsid.
Testit `nice -n 15 sh Linssit-testit/kaanna.sh` (+ `cd Peli-testit && sh kaanna.sh`), `nice -n 15 zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"`.
UUDET SÄÄNNÖT 14.10.: viestit AINA `send_message` session id:llä /Users/Shared/Claude/osoitekirja.md:stä; PT = local_74630a27-8c1b-4ac3-9143-538efab8cbcd
(EI local_593b89a1 = omistajan Keskustelukanava); PT-viestit ≤ 3 riviä (mitä, sha, kuvien polku); nollaukset Postivahti; jokainen ajo mykistettynä,
ei mitään Macin kaiuttimista; esikatselun jälkeen tabs_close. Linssiseppä = museot + opas; Linssiseppä 2 = VALOSEPPÄ (valo, ilmakehä, materiaalit).

## 1. KESKEN: ATEENAN PALLOKIERROS (PT:n erä, juna 190) — haara `linssiseppa/ateena-pallo-190` 0a65574ab, wt /Users/Shared/Claude/wt/proto-linssiseppa-ateena190
- Pallokierros.Kaupungit + "ateena", versio `pallokierros-ateena-v1` (oma kansio, Lontoolla on tulossa pallokierros-v3). Data = SK PR #4586
  (v2-data _tyo/sisaltokirjuri/pallokierros-praha-ateena-20261014/) + KS kamerat v2 (_tyo/karttaseppa/ateena-pallokierros-kamerat-v2-20261014.{json,md}),
  korkeus_m Kallimarmaro 15 / Agora 12 (KS). Kultainen Linssit-testit/kultaiset/pallokierros-v1/ateena.json = ämpärin opas/pallokierros-ateena-v1/ateena.json
  (Julkaisija vei 11.47, SHA 6deb5fa7…). ÄÄNETÖN: ääni PT:n hyväksynnän jälkeen → uusi versiokansio (esim. pallokierros-ateena-v2) + Versiot-rivi.
- Koodi: OpasSovitin.Pallokierros "pallokierros:<id>" piilossa → workerin kierros; piilotettu pysäkki (kohde:<Q>) → workerin kierros; GRC + "pallokierros:ateena".
  OpasSilmukka liu'un alaraja 150 → 40 m (KS). Testit: KS:n katsepoikkeukset Hefaistos/Erekhtheion/Parthenon, loppu 50°, Aanettomat = {ateena}
  (lukukesto ja loppunousun seisahdus sallittu kunnes ääni). Linssit 1764/1764, Peli 585/585, unity 0.
- KETJU KÄYNNISSÄ: `ajo-ateenapallo.zsh` (pid 4280, loki ajo-ateenapallo.log): kaannos-lippu luotu 11.47 (L2 jonossa), simu-lipun Julkaisija luo SIMU VAPAA:sta.
  SEURAAJA: seuraa lokia (Monitor), ilmoita Julkaisijalle (local_22b29f10-7af8-43fc-a974-1d666f716c97) LUKKO VAPAA ja SIMU VAPAA, katso
  proto-3d/lokit/todistus-ateenapallo-ipad-*/ (kuva-arkki: avaus, 8 pysäkkiä, liu'ut ≤ 12,5 s, loppu) → arkki PT:lle (≤ 3 riviä) ja KS:lle
  (local_37708e68-5a58-45ca-8dee-c13620993531) → PT kuittaa → NS:lle (local_bf20055b-d582-4812-ba2b-b59c37a5e7b8) runkoon 190.

## 2. KUITATTU JA JUNASSA 189 (lukittu 2e980dd33, sisältää kaikki): museo-liike-189 HEAD 46ba228ad
liikebugit (taakse ei heilu, penkin kierto, TaakseRaja; S-käyrä metrokarttaan), Ranskan otsikot, Yövartio-salin kertoja (manifest-189 → 189b),
Rodin vaakakuva f16ff10d8, Ranskan kertoja 4dd966cd1 (lähestymispuhe kuvittain SarjaKuva.Aani, salien avaukset Huone.Avaus, manifest-189b.json 43 riviä),
Akropolis-museo pois kaikissa maissa ("maa": "*", "kohde:Q421084", f665c53fe) + kierroksen pysähdyslista lokiin 46ba228ad.
OPIT: ämpärin tiedostot muuttumattomia (uusi nimi joka lisäykselle); vientipaketti `_valmiit/*-vienti-*`, LAHTEET.md:ssä lisenssirivi, tarkista ettei
hakemisto ole jo olemassa; käännös-SHA:n esivanhemmat tarkistettava (git merge-base --is-ancestor); simu-video on pysty → ffmpeg transpose=2; "Astu sisään" ~14 s.

## 3. ODOTTAA / MUUT
- Teosvalotus: Valoseppä 0eb5b720b (juna 189) irrotti teoksen salin valoista; salin valot ja keilat vapaat (himmennys teoksen kohdalla ≥ 0,95), ei muutosta ilman erää.
- Askeleet: kaiullinen = jo oletus (MuseoAskeleet.Oletus); kytke vain, jos Äänittäjä vie eri sarjan.
- iPhonen näyttelylista: Kunniagallerian napautus pyyhkäisyn jälkeen ei avaa esikatselua (PT välitti NUI:lle).
- Levy: 101 Gi vapaana; worktreeistä jäljellä vain proto-linssiseppa-ateena190. App-kopiot: lokit/linssiseppa-app/{liike-189, ateena190 (tulossa)}.
- tools/gpu-vapaa.sh checkoutissa seuraamaton (ei minun, älä committaa).
