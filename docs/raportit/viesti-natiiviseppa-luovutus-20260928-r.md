# Natiivisepän luovutus 28.9.2026 (r), klo 10.4x EEST

Luovuttaja: Natiiviseppä (Opus 5.5, Macin käyttäjä koodaus). Syy: konteksti yli 70 % (Fablen pyyntö 10.4x). Edellinen: -q.md
(sen kohdat ovat voimassa, ellei tässä toisin sanota).

## Lue ensin

1. CLAUDE.md ja Raamatun Ydinajatus kohta 2 (TYÖTAPA JA SESSIOT, JUMI → FABLE).
2. Tämä raportti. Aloituslennon raportti on docs/raportit/aloituslento-v3-20260928.md (v3–v3d). v3e-osio lisätään sinne, kun
   video on valmis.
3. Muisti: natiiviseppa-oma-simulaattori (vain FBBD41D7), kaannokset-erina-polton-aikana, testikaannos-ei-junan-edelle,
   simulaattorivideo-igndts.

## Käytäntö tänään

- Päiväsääntö: Julkaisija jakaa käännös- ja simulaattorivuorot. Käynnissä saa olla enintään 2 simulaattoria. Kun FBBD41D7 on
  sammutettu, ilmoita siitä Julkaisijalle.
- Jokainen juna/b13-commit laukaisee junakäännöksen. Vahti niputtaa: se odottaa 10 min rauhaa, mutta enintään 20 min.
- FBBD41D7:n taustakuvavälimuisti (PRBPosterExtensionDataStore, 5,1 Gt) poistettiin 10.2x Fablen pyynnöstä. Poista se
  uudelleen, kun simulaattori on sammutettuna ja levy on täynnä.

## KÄRKI: ALOITUSLENTO v3e (omistajan palaute v3d-videoon 28.9. klo 09.2x + tarkennus, sanatarkasti aloitusviestissä)

Haara on proto **natiiviseppa/aloitusrata f7333a8f** ja worktree wt/proto-natiiviseppa-offline-media. Se ei ole junassa:
merge 1.0.35-junaan (juna-merge.sh natiiviseppa/aloitusrata) tehdään vasta omistajan OK:n jälkeen.

**Mitä muuttui (radan mallin mitat, Ateena; Kartta-testit 350/350, AloituslennonRata 14/14, unity-tarkistus 0):**
- Lähestyminen on yksi S-käyrä, Beta(3,2) (nopeus ∝ τ²(1−τ)). Kaikki kanavat ovat saman edistymän p(t) funktioita, joten
  avaus ja kiri eivät enää ole erillisiä liikkeitä. Zoomin huippu on 1,48 e/s ~5 s:ssa (v3d ~3,5 e/s, kiri 4 500 → 30 km
  2 s:ssa). Kuminauha: kone karkaa ensin ruudulla oikealle alas ja kamera kiihtyy kiinni (KuminauhaX/Y). Lontoo on kuvassa
  ~2 s (AvausS 2,0; v3d ~4 s).
- Ohitus 7,2 s: lähin kohta on **20,1 km (v3d 23,2 km)** ja kone vie 58 % leveydestä (v3d 49 %). Ohitus on reitillä
  **190 km ennen kohdetta** (OhitusJaljellaM). Ateena 0,92 on Thessaliassa. Taulu OhitusMaalla on laskettu maapolygoneista
  (proto-3d/lokit/aloituslento-33/v3e/ohitus_myohaan.py): istanbul 0,92, moskova 0,92, tanger 0,90, kairo 0,957 (suisto).
  Muut kohteet saavat säännöllä osuuden 0,5–0,93. Syy: puolivälin ohituksesta kone kiisi erkanemisessa 1 270 km.
- Erkaneminen: silmän korkeus on Beta(5,3)-S-käyrä log-asteikolla. **Pakitus 8,1 → 9,4 km 7,2–9,4 s** (omistaja: "todella
  todella vähän"). Nousu kiihtyy huippuun 12,5 s (1,59 e/s) ja hidastuu loppuun pysähtymättä (14,5 s vielä 0,23 e/s).
  Koneen alakulma kulkee korkeuden mukana (ln sin ε = ln sin ε_pakitus · (1 − A)^1,8), joten koneen etäisyys kasvaa koko
  erkanemisen ajan. Pakitus luovuttaa nousulle, ja välissä on loiva tasanne 0,5 e/s. Kamera kääntyy suoraan alas Ateenan
  ylle, ja kosketus 13,8 s nähdään ~1 150 km:stä kone ~1,6 % leveydestä. Maan vierintä on enintään 0,28 (lähestyminen) ja
  0,62 (erkaneminen) etäisyyttä/s.
- Silmän maareitti ei ole S vaan KOUKKU: silmä käy ~270 km Ateenan eteläpuolella (35,6° N 13 s:ssa) ja kiertää ylle samalla
  kun kallistus kääntyy alas. Kokeilin eksponenttia 2,3 (1,8:n sijaan): koukku pieneni (36,4° N), mutta koneen loittoneminen
  notkahti 0,39 e/s:iin ja kaksi testiä hajosi, joten 1,8 jäi. Kerro tämä Fablelle videon mukana.
- **AloituslennonIlma** (uusi, Kartta): yläsiiven kärkien ohuet ilmavanat ja pakoputken hento pölyvana. Tekniikka:
  ECEF-näytteet, syvyystestattu Ilmavana-varjostin (Kartta/Resources/Ilmavana.shader, Pehmeapisteen muunnos) ja pituus
  enintään 5 siipiväliä; vanat näkyvät vain, kun kone on yli ~4 % leveydestä. Loppukohtauksen 12,3–14,8 s aikana neljä
  mustelintua lentää vinottain ruudun poikki vasemmalta alhaalta oikealle ylös. Tyyli on Linssisepän parven (Linssiseppä
  hyväksyi oman komponentin): siivet lyövät 2,2 Hz ja välillä liitävät, ja linnut ovat kameran ja maan välissä 30 %:ssa
  silmän korkeudesta. Kytkin: `lento v3 ilma 0|1`. **Laitteella todentamatta.** Tarkista videosta, näkyykö vana ohituksessa
  eikä piirry koneen päälle, ja näkyvätkö linnut.
- Kuvatekstit on poistettu katseluvideosta, ja versionauha jää (omistaja: "otetaan kuvatekstit pois").

**KÄÄNNÖS KÄYNNISSÄ 10.46** (irrallinen nohup, pid 4513): `proto-kaanna.sh natiiviseppa/aloitusrata+natiiviseppa/varalaatta-uusinta-2+natiiviseppa/symbolit-erikoismalli+pelikoodari/aloituslento-marssi FBBD41D7-…`,
loki proto-3d/lokit/kaannospalvelu/20260928-104646-natiiviseppa-aloitusrata_…log (tulos viimeisellä rivillä KÄÄNNETTY/VIKA),
tulostus sessio-r/v3e-kaannos.out. Valmis arviolta ~11.15. VIKA → korjaa ja jonota sama komento uudelleen (vuoro Julkaisijalta).

**Kuvaus heti käännöksen jälkeen.** Skriptit ovat kansiossa proto-3d/lokit/natiiviseppa-skriptit/sessio-r/:
1. `aloituslento-valmistele.sh aloituslento-33/v3e` (kirjoittaa `hiljaa` + `lento v3 aloitusrata 1`, sitten `valmis`).
2. MCP-simulaattorityökalulla napautukset: Uusi matka (201, 690) → 20 s → Valitse aloituskaupunki (201, 605) → 6 s →
   `aloituslento-nauhoita.sh aloituslento-33/v3e` taustalle → kun `nauhoittaa` on olemassa, napauta Ateenaa (271, 326).
3. F = lennon alku videossa. Nauhoitusskripti kirjoittaa F.txt:n lokista, mutta tarkista F kehyseroista, koska loki heittää
   0,1–0,6 s. Lue aina `ffmpeg -fflags +igndts`.
4. `python3 kaista.py "NATIIVI v3e · aloitusrata f7333a8f · marssi A" <v3e>/kaista.png`, sitten
   `aloituslento-kooste.sh <v3e-kansio> <F> 1.0 17.8`. Kansiossa on valmiina marssi-a.mp3 (musa-aloituslento-marssi-a),
   ja se soi videossa lennon 0 s:sta. Simulaattorivideossa ei ole ääntä. Isku 7,3 s = ohitus, crescendo 12,1–15,1 s = nousu.
5. Kuvaparit v3d | v3e: `kuvapari.py <v3d>/aloituslento.mp4 8.72 <v3e>/aloituslento.mp4 <F> <t> "v3d 1636c93a · t s" "v3e
   f7333a8f · t s" <ulos.png> [alarivi A] [alarivi B]`. Hetket: 3,0 s (lähestyminen), 7,2 s (ohitus, alarivit "lähin
   23,2 km" / "lähin 20,1 km"), 9,0 s (pakitus), 12,0 s (nousu), 13,8 s (kosketus ylhäältä) ja 14,3 s (linnut).
6. Korkeuskäyrä on VALMIS: aloituslento-33/v3e/korkeuskayra-v3d-v3e.png (silmän korkeus ja koneen etäisyys v3d | v3e,
   lähimmät etäisyydet merkitty; taulut v3d-taulu.txt ja v3e-taulu.txt, skripti sessio-r/korkeuskayra.py).
7. Fablelle ≤ 8 riviä: video, kuvaparit ja käyrä. Lisää v3e-osio raporttiin aloituslento-v3-20260928.md.

**Samalla käännöksellä jatkotestit** (sovellus kartalla lennon jälkeen): `sessio-r/varalaatta-kinderdijk.sh <kansio>
<konsoliloki>` (esim. aloituslento-33/v3e/konsoli-lento.txt).
- Varalaattojen vikatesti (kohta 2 luovutuksesta -q): varavika 0,5, kuvat 2 s ja 20 s, tausta ja paluu, `palvelin`-tila.
- Kinderdijk: `symbolit alla jalka|laatikko`, kuvat peli30/peli55/lahi45.
PASS → `juna-merge.sh natiiviseppa/varalaatta-uusinta-2` ja `natiiviseppa/symbolit-erikoismalli`. Sen jälkeen sammuta
FBBD41D7 ja ilmoita Julkaisijalle.

## v3f (jako sovittu Fablen kanssa 09.4x; omistajan lisäykset sanatarkasti Fablen viesteissä)

Sisältö:
- Päivän ja yön raja sekä Euroopan valomeri. Lento alkaa yöstä ja saapuu Ateenaan aamun valoon.
- Kello ja sen alla "Päivä 1/80" oikeassa yläkulmassa jo aloituskaupungin valinnassa. Kello etenee valinnassa normaalisti
  ja lennossa pehmeästi kiihtyen, ja valonraja liikkuu sen mukana.
- Lentoajat kohdekaupunkien nimien alla ("+6 h", "+12 h").
- Aloitusnäkymä valaistaan samoin (Eurooppa yössä, kaupunkien valot).
- Pehmeä esikääntö: jos pallo on pyöritetty muualle, se kääntyy ensin suunniteltuun näkymään ja zoomiin ennen lentoa.

Lennon kesto pysyy 15,0 s (Pelikoodarille kerrottu).

**Tehty:**
- Haara **natiiviseppa/aloitus-paivayo 3d52d2fa** (worktree wt/proto-natiiviseppa-paivayo). Pohja on juna/b13 25379266
  (RAE/PATINA mukana, sama generaattori) + aloitusrata f7333a8f + natiivi-ui/pelikello b0954f6c. Kartta-testit 353/353
  pohjassa.
- KESKEN-commit: tee_tileset.py saa RadioHamara-syötteen 26 `_aurinko` (xyz auringon suunta maailmassa, w voimakkuus). Yöpuoli
  tummuu porvarillisen hämärän kaistalla (auringon korkeus −6…+2°, n = normalize(pos − _maaKeski)), ja Black Marble
  -yövalot palavat painolla max(radiohämärä, yö). Kaavio on generoitu uudelleen: `python3 Lahde~/tee_tileset.py
  /Users/Shared/Claude/proto-3d/_lahteet/cesium-unity/Source/Runtime/Resources .` Shaders/Cesium-kansiossa. Tunnisteet
  vaihtuvat aina, ja sisältö tarkistettiin samaksi ennen muutosta. EI KÄÄNNETTY.

**Tekemättä (C#):**
1. `Kartta/Paivanvalo.cs`:
   - `Shader.SetGlobalVector("_aurinko", (suunta maailmassa, w))`. Suunta tulee kaavasta `Aurinko.AurinkoEcef(utc)` →
     `georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity` → `transform.TransformDirection`, ja
     utc = kiinteä päivä + Pelikello.AlkuKelloUtc + Tunnit.
   - Päällä valinnassa ja lennossa. Saapumisen jälkeen häivytys (web on malli: pelin muuta karttaa ei muuteta ilman
     Fablen OK:ta).
2. Yövalokerros valinnan ja lennon ajaksi RadioMastot.PaivitaYovalot-mallilla:
   - LisaaRasteri(oma avain, RadioMastot.YovaloUrl, WebMercator, 0, 6, 1f, vaistyva: true), RasterinAlfa(avain, 0) →
     `_radioYovalot` = (paikka, voimakkuus, 1, 0).
   - Tarkista, onko paikka vapaana lennon aikana (KarttaKerrokset.RasteriPaikkaVapaana, "lennon pinta").
   - Offline-yövalot: Siirtosepän offline-kerrokset (junassa, Alueet.KerrosPolut).
3. Nappula (Nappula.LentoV3.cs, lennon silmukka): leikkauksessa Pelikello.Lennossa = true ja Tunnit = lähtö +
   Pelikello.LentoTunnit(…) · K(t / 15) (K ease in-out), perillä Lennossa = false.
4. Esikääntö odotuksessa:
   - Suunniteltu näkymä on UI/Aloitusnakyma.AloitaPallovalinta: 30° N 17° E, ValintanakymanKorkeus(), kallistus 0,
     suunta 0.
   - Jos nykyinen poikkeaa, tehdään pehmeä ease-in-out 0,8–2 s ennen leikkausta, ja radan Alku = suunniteltu näkymä.
   - Marssi alkaa leikkauksesta (Pelikoodarin 8409b0a6), joten se tulee esikäännön jälkeen.
5. Ajoitusehdotus:
   - Pelin kello = GMT/UTC. Lähtö ~22.00, jolloin aamunraja ylittää Ateenan ~t = 11,5 s (lennon kello 6 h smootherstepillä)
     ja saapuminen osuu aamunkoittoon. Lähtö 00.00 → Ateena valossa jo ~t = 8 s.
   - Näytä Fablelle vaihtoehdot kuvina.
   - HUOM Natiivi-UI: Pelikello.Paiva = 1 + floor((AlkuKelloUtc + Tunnit) / 24) vaihtaa päivän keskiyöllä. Webin päivä
     lasketaan tunteina matkan alusta (1 + floor(Tunnit / 24)). Sovi tämä Natiivi-UI:n kanssa.

**Natiivi-UI** tekee kellon UI:n, "Päivä 1/80":n ja lentoajat (natiivi-ui/pelikello b0954f6c: API valmis, Kartta-testit 3/3).

**Selvityksen muistiinpanot:**
- Pallon varjostin: Shaders/Cesium/Lahde~/tee_tileset.py (RadioHamara).
- Yövalot: RadioMastot.cs:62–73 ja 431–486.
- Linssisepän väliaikainen yökuori (Yokuori.cs, linssiseppa/iss-kyyti) on vain ISS-kyydille.

## v3g

Muut aloituskaupungit samalla kaavalla, kun omistaja on hyväksynyt Ateenan. Pitkät reitit (New York, San Francisco,
Buenos Aires, Sydney, Perth…) tarvitsevat oman ratkaisun: 190 km:n sääntö pakottaisi lähestymisen kattamaan 90 % jopa
17 000 km:stä, jolloin kone kiitäisi.

## 1.0.35-juna (juna/b13 25379266)

Tänään junaan mergetty (merge-pyynnöt ja kuvat tarkistettu):
- joet-0928 582d149c
- mallinseppa/era6 9ff18d16 (erät 5+6)
- astro-selain c15d2c04
- natiivi-ui/ihme-kuvana f1714aaf
- natiivi-ui/nimet-laskuri 5d79edd9
- natiiviseppa/offline-kuvat 4d4b41f6 (Siirtoseppä PASS)
- siirtoseppa/offline-kerrokset c260d593 + 31da7b02 (skeema 1.56: siirto/levykoko, laatat.json)
- natiivi-ui/paivityslappu e19b5d97
- pelikoodari/aloituslento-marssi 8409b0a6
- siirtoseppa/paketti-sama-versio dbc9fd7d

Junakäännös eaf48a0e valmistui 10.37. Vahti kääntää myöhemmät merget.

Odottaa:
- varalaatta-uusinta-2 1e65724f ja symbolit-erikoismalli 6cecf733: jatkotestit yllä.
- Linssisepän symbolit-lippu cd4911b1: tulee myöhemmin kuvaparin kanssa.
- aloitusrata: odottaa omistajan OK:ta.

Kulku: juna → Laitetestaaja → BUILD-merkintä masteriin → Julkaisija TF 1.0.35.

## Muut

- Siirtoseppä: kerman 404-laatat offline-tilassa (\_maailma z3–z5: 87 hakua) → tulkitse läpinäkyväksi ilman uusintaa
  (laattapalvelin). Tämä on minun jonossani.
- Pelikoodarin marssi alkaa nyt leikkauksesta (PeliOhjain.Aloitus "Kone lähtee"), ei napautuksesta.
- Jonon kohta 6 (ensikäynnistyksen karttavika fyysisellä iPad Pro 13:lla ja 120 Hz) ennallaan.
