# Pelikoodari: luovutus 12.11.2026 klo 01.00 (konteksti noin 30 %, Raamattu 7.37)

Edellinen: viesti-pelikoodari-luovutus-20261112-0048.md (5526931d9). TÄMÄ KORVAA SEN KOKONAAN.

## 1. TYÖN ALLA: KAMERALAITE PALA 2, SYYN SELVITYS (KK 00.47): toistokokeen osuus tehty, odotetaan JU:n Mac-ajoa ja KK:n päätöksiä
Raportti (lue KOKONAAN): /Users/Shared/Claude/proto-3d/_tyo/pelikoodari/kameralaite/TULOS-syy-pala2.md, ja KK:lle lähetetty klo 00.5x.
KK:n tehtävänanto sanatarkasti on edellisessä luovutuksessa (git show 5526931d9:docs/raportit/viesti-pelikoodari-luovutus-20261112-0048.md, kohta 1).
- Koodi: natiivi-backup kameralaite/pala-2 @ f1c47100d (wt /Users/Shared/Claude/wt/proto-pelikoodari-kameralaite) = 2ec17d3fb + ruutuloki
  (`ui juoksupeli kameraloki 1`: rivit "MATKAKIRJA kameraruutu" joka ruutu T ja L erikseen; "MATKAKIRJA kamerapeitto" peittoruudut ±2 m
  kierroksen lopussa, muoto "x z huippu ala;" 1 m:n ruutujen keskipisteet). Unity-tarkistus 0 virhettä, Seuranta 16/16, Kameralaite 14/14.
- TOISTOKOE (tärkein löydös): pelin juoksu toistuu ilman peliä tarkasti (siemen 1942463309, oikea JuoksuKulku.bytes, tason 1 lähtö 116,4/820,1
  Länsi, TyohuoneVapaaM, avaus AskelKerroin 1/60 s:n ruuduin ilman bottia, sitten botti + Askel 1/120). Paikat ≤ 0,1 m pelilokista.
  Lähde ja ajo: _tyo/pelikoodari/kameralaite/Toisto.cs + kaanna.sh (`sh kaanna.sh <wt> 1942463309 ulos.tsv <JuoksuKulku.bytes> [kartta x0 x1 z0 z1 t0 t1]`,
  tai `sh kaanna.sh <wt> kaannokset 20 <bytes>`). Kääntää Peli/ + Linssit/Ydin yhdessä (toimii ilman ristiriitoja).
  Mittari t = toiston t + 121,7 s.
- Löydökset: 128–132 s: T ja L kulkevat jäljellä (B ei selitä), z118 → 1,4 m:n kuja, umpikuja z121 ja ympärikäännös → hiusneula: TAVOITE kulkee
  pelaajan kohdan ohi, laite 0,16 m pelaajasta 2,4 m:n korkeudella (pystykuva). Kartalla ei ole seinän korkeutta eikä salin kattoa (vapaa 25).
  139–141 s: laite ylittää ulkokaarteelle 0,75 m kartan ei-kuljettavaan ruutuun, ja työntö tulee myöhässä. Kapeita käännöksiä 39 paikkaa (vasen 15, oikea 8, ympäri 16).
- ODOTTAA: (1) JU:n Mac-ajo (tilattu 00.5x): skenaario _tyo/pelikoodari/kameralaite/sk-kameralaite-pala2-siemen.txt, tulos
  proto-3d/lokit/pelikoodari-kameralaite-pala2-siemen-f1c47100d. Kun se tulee: tarkista kameraruutu-rivien S/P vs toisto.tsv (pitäisi täsmätä),
  lue T:n ja L:n massa ikkunoissa 128–132 ja 139–141 (huom. kellot eroavat ajoittain; kohdista S:llä), peittävä kappale (katto/seinä), ja tee
  hyväksymistesti: toisto + kamerapeitto-ruudut (Massassa = huippu > y+0,3 ja ala < y−0,3; sali/ovi-poikkeukset näkyvät ruutulokissa) → massassa 0,
  seinästä ≥ 0,3 m. Testin paikka: uusi testi, joka kääntää Peli/ + Linssit/Ydin (kuten Toisto.cs); peittoruudut testidataksi repoon.
  Arkit + kuusi kohtaa KK:lle siitä ajosta (KK katsoo).
  (2) KK:n päätökset (a) ympärikäännöksen jälki, (b) kapean avokujan korkeus (rajapinta: seinän huippu), (c) kulmaylitys (mittaa ensin toistolla).
  Korjaus vasta päätösten jälkeen, linjan sisällä: ei paikan asettamista eikä hakuja.

## 2. KUVAJONO: VALMIS, JUNAEHDOKAS PT:llä (ennallaan)
KK 00.30: 6e47d988f (haara pelikoodari/kuvajono, natiivi-backup, juna-224 dfd9388a5:n päällä) JUNAAN sellaisenaan; PT:lle lähetetty noin 00.35.
Seuraavaan Kuvat.cs-muutokseen (KK): "ui kuva hidas" -riville vuoro ja paikka myös ruutuina (Time.frameCount). Ei omaa ajoa.
Wt /Users/Shared/Claude/wt/proto-pelikoodari-kuvajono: poista (git worktree remove), kun 6e47d988f on junassa.

## 3. MUUT (ennallaan)
- v133c 漱芳斋-ovi: PT:n pt-ok → MR (PT pyytää). Haara pelikoodari/tausta-v133 904715425 pushattu.
- B1 bcf32314c (pelikoodari/seinat-taso1): JUNASANA KK:LTA (PT 01.1x, Raamattu 7.24): kun LAV:n aja-a2.zsh-ajon (JU) vertailu m1-varmistus-kuviin
  on valmis, tulos + bcf32314c suoraan KK:lle; pt-ok sitten PT:ltä. Työlistan rivi "Juoksupeli: puuttuvat seinät ja rakenteet" = tämä.
- tyokalut/tarkista.sh päivittää tyylikirjan → palauta git checkoutilla, älä committaa.
Ei agentteja käynnissä. Ei uusia lupia.

## LISÄYS 01.0x
- UUSI TYÖ PT:ltä 01.00 (KK 00.59), aloita tästä, kun kamera odottaa: ESIKATSELUN MITTAKAAVA. Pikselimittaiset 3D-merkit (nappula, kone, varjo)
  näkyvät esikatselukuvissa eri suhteessa käyttöliittymään kuin laitteella (pistekerroin nyt 0,465 vs. 2752 px:n kuva). Tavoite: sama suhde kuin
  isolla iPadilla. Yksityiskohdat NUI:lta (local_4b84cd90-123f-46c5-bc07-75760ed4c80b). Tulos + kuvapari suoraan KK:lle; junaan vasta KK:n sanalla.
- NUI tiedoksi (ei toimia): Puhe.cs 27d162d64 (natiivi-backup natiivi-ui/pariisi-tekstit) esikatselusääntö LataaJaSoitaTiedosto-silmukkaan;
  älä tee päällekkäistä Puhe.cs-muutosta.

## LISÄYS 01.1x: KK:N PÄÄTÖS 01.09 (a)(b)(c) — TÄMÄ ON ENSIMMÄINEN TYÖ (ennen esikatselun mittakaavaa)
Koko teksti: /Users/Shared/Claude/Matkakirja-fable/scratchpad/keskustelukanava/suunnitelmat/20261111-kameralaite-pala2-tehtavananto.md,
osio "KK:n päätökset PK:n syyraporttiin" — LUE KOKONAAN ennen koodia. Tiivistelmä (KK:n viesti):
(a) U-KÄÄNNÖS = ODOTUS + LEIKKAUS (ei nollausta ilman leikkausta). Tunnistus ohjaajassa: säännön kulkusuunta kääntyy askeleessa > 120°. Odotus: s_kam
    pysähtyy heti, katse pelaajaan ilman ennakkoja, uusi jälki kerätään käännöspisteestä. Leikkaus, kun uusi jälki ≥ D_min + 0,5 m: D := D_min,
    v̂ := mitattu vauhti, Leikkaa. Testi T14 (kaksi rataa + pelin siemenen toisto t 9,3–10,7), ehdot tiedostossa.
(b) EI seinien yli. Massan korjaus vasta ruutulokin faktoista.
(c) Ei työnnön viritystä ensin. c1: ikkunan alaraja a ≥ 1,0 pois, toistotaulukko ennen | jälkeen. c2: PaikkaS 0,45 / 0,35 / 0,25 toistolla +
    NÄKYVYYSMITTARI (jana laitteesta pelaajaan leikkaa ei-kuljettavan ruudun) → KK valitsee.
KK:n havainnot, TARKISTA: (1) massaruudut (kamerarivit 67–68: 15 + 37) EIVÄT ole U-käännöksessä eivätkä kujassa: ne päättyvät toiston t ≈ 9,05,
    jolloin laite on porttitunnelissa (t 7,2–7,7) ja sen jälkeen 2,5 m:n käytävässä (x 121 → 114, H 2,4, vapaa 25). → Edellinen raporttini
    (TULOS-syy-pala2.md kohta 2: "arvio: jo tavoite massassa kujassa") voi olla väärin kohdistettu; ruutulokista jokaiselle massaruudulle toiston t,
    laitteen x/y/z, peittoruudun ala/huippu ja kappale. (2) Toistossa tavoite on ei-kuljettavalla 63 riviä, joista 53 alarajalla a = 1,0;
    a on alarajalla 54 % ajasta, koska SeinaEt on 0,5 m:n portain.
JÄRJESTYS (KK): (a) ja c1 heti koodiin ja testeihin (kameralaite/pala-2 @ f1c47100d päälle), c2 rinnalla; Mac-ajo f1c47100d pysyy tilattuna.
Kysymykset KK:lle yhtenä viestinä. Toistokoe: _tyo/pelikoodari/kameralaite/Toisto.cs + kaanna.sh (testiksi T14:ään).

## LISÄYS 01.3x: JU:n Mac-ajo f1c47100d VALMIS, faktat lähetetty KK:lle (jonossa)
Ajo: /Users/Shared/Claude/proto-3d/lokit/pelikoodari-kameralaite-pala2-siemen-f1c47100d (videoaika = kameraruutu t − 441,71). Massarivit:
_tyo/pelikoodari/kameralaite/massarivit-f1c47100d.txt. KK:n havainto (1) OIKEIN: massa S 108–120 (porttitunneli + 2,5 m:n käytävä, 95 ruutua), S 135–137 (3),
S 167–173 (35); EI U-käännöksessä. TAVOITE massassa ensin (käytävän keskilinja, oikaisu 0), laite samoissa ruuduissa 2,6 m myöhemmin; peittoruutu
huippu 3,87–4,35 ala 0,00 → arvio: matala pystypinta (porras/kynnys/pylvään jalka) + katto → Massassa väärä hälytys? Tarkista arkit samoilta hetkiltä.
VIKA RUUTULOKISSA: kamerapeitto 0 riviä (vienti kutsutaan vain, kun peliKamera && KameraMittari lakkaa; ei lauennut) ja kameraruutu alkoi vasta t 481
(1035 riviä) → korjaa vienti (esim. kirjoita ruudut heti kun kertynyt ≥ 200, tai Kierros-kutsun kohdalla) ennen hyväksymistestiä.
KK:lta kysytty: jatketaanko (a)+c1 ja tutkitaanko massan väärä hälytys erikseen ennen massakorjausta → odota vastaus.
